"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { RujukanPasien } from "../models/rujukanPasien";
import { Twilio } from "twilio";


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(accountSid, authToken);

export const addRujukanPasien = async (formData) => {
  const { namaPasien, nomorPasien, tempatRujukan } = formData;

  try {
    await connectToDB();

    const newRequest = new RujukanPasien({
      namaPasien,
      nomorPasien,
      tempatRujukan,
      status: 'pending',
    });

    const savedRequest = await newRequest.save();
    console.log('New RujukanPasien saved with id:', savedRequest._id);

    revalidatePath("/dashboard/managePasien/rujukanPasien");

    return { success: true, message: "Data Add Success" };
  } catch (error) {
    console.error("Error adding RujukanPasien:", error);
    if (error.code === 11000) { 
      return { success: false, message: "Failed to add Data" };
    }
    throw new Error("Failed to add Data");
  }
};

export const updateRujukanPasien = async (id, status) => {
  try {
    await connectToDB();

    const rujukanpasien = await RujukanPasien.findById(id);

    if (!rujukanpasien) {
      throw new Error('Data not found');
    }

    rujukanpasien.status = status;
    await rujukanpasien.save();

    const message = status === 'surat bisa diambil'
      ? 'Puskesmas Silago : Surat rujukan Anda sudah bisa diambil di puskesmas.'
      : `Status permintaan surat rujukan Anda telah diubah menjadi: ${status}`;

    // Kirim notifikasi ke WhatsApp
    await twilioClient.messages.create({
      body: message,
      from:`${process.env.TWILIO_WHATSAPP_NUMBER}`, 
      to: `${rujukanpasien.nomorPasien}`,
    });

    revalidatePath("/dashboard/managePasien/rujukanPasien");

    return { success: true, message: 'Status updated and notification sent' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to update status!' };
  }
};

export const deleteRujukanPasien = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB(); // Menambahkan await untuk koneksi database
    await RujukanPasien.findByIdAndDelete(id);

  revalidatePath("/dashboard/managePasien/rujukanPasien");

    return { success: true, message: 'Data berhasil dihapus!' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Failed to delete data!' };
  }

};
