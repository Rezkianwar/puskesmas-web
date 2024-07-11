"use server";

import { connectToDB } from "../utils";
import { ObatPasien } from "../models/obatPasien";
import { revalidatePath } from "next/cache";
import { Twilio } from "twilio";



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);


export const addObatPasien = async (formData) => {
    const { nama_Obat, nama_Pasien, no_Hp ,resep_Obat  } = formData;
  
    try {
      await connectToDB();
  
      const newRequest = new ObatPasien({
        nama_Obat,
        nama_Pasien,
        no_Hp,
        resep_Obat,
        status: 'pending',
      });
  
      const savedRequest = await newRequest.save();
      console.log('New RujukanPasien saved with id:', savedRequest._id);
  
  
      revalidatePath("/dashboard/manageObat/obatPasien");
  
      return { success: true, message: "Data Add Success" };
    } catch (error) {
      console.error("Error adding Obat Pasien:", error);
      if (error.code === 11000) { 
        return { success: false, message: "Failed to add Data" };
      }
      throw new Error("Failed to add Data");
    }
  };


  export const updateObatPasien = async (id, status) => {
    try {
      await connectToDB();
  
      const obatpasien = await ObatPasien.findById(id);
  
      if (!obatpasien) {
        throw new Error('Data not found');
      }
  
      obatpasien.status = status;
      await obatpasien.save();
  
      const message = status === 'surat bisa diambil'
        ? 'Obat Anda sudah bisa diambil di puskesmas.'
        : `Status permintaan Obat Anda telah diubah menjadi: ${status}`;
  
      // Kirim notifikasi ke WhatsApp
      await twilioClient.messages.create({
        body: message,
        from:`${process.env.TWILIO_WHATSAPP_NUMBER}`, 
        to: `${obatpasien.no_Hp}`,
      });
  
      revalidatePath("/dashboard/manageObat/obatPasien");
  
      return { success: true, message: 'Status updated and notification sent' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to update status!' };
    }
  };



  export const deleteObatPasien = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
      await ObatPasien.findByIdAndDelete(id);

      revalidatePath("/dashboard/manageObat/obatPasien");

      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Failed to delete data!' };
    }
  
  
  };
  