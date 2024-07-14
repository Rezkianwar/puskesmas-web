"use server";

import { connectToDB } from "../utils";
import { Pembayaran } from "../models/pembayaran";
import { revalidatePath } from "next/cache";

export const addPembayaran = async (formData) => {
    const { name, phone, nomorbpjs, metodePembayaran, statusPembayaran, nominal, keterangan } = formData;
  
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
  
  
      const newPembayaran = new Pembayaran({
        name,
        phone,
        nomorbpjs,
        metodePembayaran,
        statusPembayaran,
        nominal,
        keterangan
      });
  
      console.log("Pembayaran created successfully:"); 
      await newPembayaran.save();
  
      revalidatePath("/dashboard/managePasien/pembayaran");
  
      return { success: true, message: 'Data berhasil ditambahkan!'};
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        return { success: false, message: "Username already exists. Please choose another one." };
      }
      console.log(error);
      throw new Error("Failed to create data pembayaran!"); // Mengoreksi pesan error
    }
  };
  
  
  export const UpdatePembayaran = async (formData) => {
    const data = typeof formData.entries === 'function' ? Object.fromEntries(formData.entries()) : formData;
  

    const { id, name, phone, nomorbpjs, metodePembayaran, statusPembayaran, nominal, keterangan } = data;
  
    try {
      await connectToDB();
      const updateFields = {
        name, 
        phone, 
        nomorbpjs, 
        metodePembayaran,
        statusPembayaran,
        nominal,
        keterangan
      };
  
      Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await Pembayaran.findByIdAndUpdate(id, updateFields);
  
      revalidatePath("/dashboard/managePasien/pembayaran" || "/dashboardPegawai/managePasien/pembayaran");

      return { success: true, message: 'Manage Pasien berhasil di-update!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Gagal meng-update manage pasien. Silakan coba lagi.' };
    }
  };


  
  export const deletePembayaran = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
      await Pembayaran.findByIdAndDelete(id);
      revalidatePath("/dashboard/managePasien/pembayaran");

      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to delete data Pasien!" };
    }
  
  };

  export const updateStatusPembayaran = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB();
      await Pembayaran.findByIdAndUpdate(id, { statusPembayaran: 'sudah dibayar' });
  
      revalidatePath("/dashboard/managePasien/pembayaran");
  
      return { success: true, message: 'Status pembayaran berhasil di-update!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Gagal meng-update status pembayaran. Silakan coba lagi.' };
    }
  };
  