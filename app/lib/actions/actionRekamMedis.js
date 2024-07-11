"use server";

import { connectToDB } from "../utils";
import { RekamsMedis } from "../models/rekamMedis";
import { revalidatePath } from "next/cache";


export const addRekamMedis = async (data) => {
    const { nama, tanggal, keluhan, diagnosa, tindakan, resepObat, dokter, catatanTambahan } = data;
  
    try {
      await connectToDB();
  
      const newRekamMedis = new RekamsMedis({
        nama,
        tanggal,
        keluhan,
        diagnosa,
        tindakan,
        resepObat,
        dokter,
        catatanTambahan
      });
  
      await newRekamMedis.save();
      console.log("Data created successfully:", newRekamMedis);
  
      revalidatePath("/dashboard/rekamMedis");
  
      return { success: true, message: "data berhasil ditambahkan!" };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        return { success: false, message: "Username already exists. Please choose another one." };
      }
      console.log(error);
      return { success: false, message: "Failed to create data!" };
    }
  };
  
  
  export const UpdateRekamMedis = async (formData) => {
    const data = typeof formData.entries === 'function' ? Object.fromEntries(formData.entries()) : formData;
  
    const { id, nama, tanggal, keluhan, diagnosa, tindakan, resepObat, dokter, catatanTambahan } = data;
  
    try {
      await connectToDB();
      const updateFields = {
        nama,
        tanggal,
        keluhan,
        diagnosa,
        tindakan,
        resepObat,
        dokter,
        catatanTambahan
      };
  
      Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await RekamsMedis.findByIdAndUpdate(id, updateFields);
  
      revalidatePath("/dashboard/rekamMedis");
  
      return { success: true, message: 'Rekam Medis berhasil di-update!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Gagal meng-update rekam medis. Silakan coba lagi.' };
    }
  };
  
  export const deleteRekamMedis = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
      await RekamsMedis.findByIdAndDelete(id);

      revalidatePath("/dashboard/rekamMedis");
      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to delete data rekam medis!" };
    }
  
  
  };