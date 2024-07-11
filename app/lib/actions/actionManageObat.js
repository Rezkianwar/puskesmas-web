"use server";

import { connectToDB } from "../utils";
import { ManageObat } from "@/app/lib/models/manageObat";
import { revalidatePath } from "next/cache";




export const addManageObat = async (formData) => {
    const { namaObat, stok , expObat, bentukSediaan, golongan, dosis, manfaat, } = formData;
  
  
    try {
      await connectToDB(); 
  
      const newManageObat = new ManageObat({
        namaObat, 
        stok, 
        expObat,
        bentukSediaan,
        golongan,
        dosis,
        manfaat
      });
  
      console.log("ManageObat created successfully:", newManageObat); 
      await newManageObat.save();
  
      revalidatePath("/dashboard/manageObat");
  
      return { success: true, message: 'Data berhasil ditambahkan!' };
    } catch (error) {
      if (error.code === 11000) { 
        return { success: false, message: "Nama Obat already exists. Please choose another one." };
      }
      throw new Error("Failed to create Data manage Obat!"); 
    }
  };
  
  
  export const UpdateManageObat = async (formData) => {
    const data = Object.fromEntries(formData.entries ? formData.entries() : Object.entries(formData));
  
    const { id, namaObat, stok, expObat, bentukSediaan, golongan, dosis, manfaat } = data;
  
    try {
      await connectToDB();
      const updateFields = {
        namaObat,
        stok,
        expObat,
        bentukSediaan,
        golongan,
        dosis,
        manfaat
      };
  
      // Remove empty or undefined fields
      Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await ManageObat.findByIdAndUpdate(id, updateFields);
  
      // Revalidate and redirect
      revalidatePath("/dashboard/manageObat");
  
      return { success: true, message: 'Manage Obat berhasil di-update!' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Gagal meng-update manage obat. Silakan coba lagi.' };
    }
  };
  
  export const deleteManageObat = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB();
      await ManageObat.findByIdAndDelete(id);
  
      revalidatePath("/dashboard/manageObat");
  
      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to delete data manage obat!" };
    }
  };

  export const updateStokObat = async ({ id, jumlah }) => {
    try {
      await connectToDB();
      const manageObat = await ManageObat.findById(id);
      if (!manageObat) {
        return { success: false, message: "Obat tidak ditemukan" };
      }
  
      jumlah = parseInt(jumlah, 10); // Pastikan jumlah adalah angka
  
      if (manageObat.stok < jumlah) {
        return { success: false, message: "Stok tidak cukup" };
      }
  
      manageObat.stok -= jumlah; // Kurangi stok
      await manageObat.save();
  
      revalidatePath("/dashboard/manageObat");
      return { success: true, message: "Stok berhasil diupdate" };
    } catch (error) {
      throw new Error("Gagal mengupdate stok obat!");
    }
  };