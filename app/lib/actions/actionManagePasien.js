"use server";

import { connectToDB } from "../utils";
import { ManagePasien} from "../models/managePasien";
import { Queue } from "../models/queue";
import { revalidatePath } from "next/cache";

export const addManagePasien = async (formData) => {
    const { name, phone , address, jenis_Kelamin , nomorbpjs, nik, pembayaran, statusPembayaran, desc, checkOut } = formData;
  
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
  
      let queue = await Queue.findOne();
      if (!queue) {
        queue = new Queue();
      }
      queue.currentNumber += 1;
      await queue.save();
  
      const newManagePasien = new ManagePasien({
        name, 
        address,
        phone,
        jenis_Kelamin, 
        nomorbpjs, 
        nik, 
        pembayaran,
        statusPembayaran,
        desc,
        checkOut,
        queueNumber: queue.currentNumber.toString(),
   
      });
  
      console.log("ManagePasien created successfully:", newManagePasien); // Mengoreksi log
      await newManagePasien.save();
  
      revalidatePath("/dashboard/managePasien");
  
      return { success: true, message: 'Data berhasil ditambahkan!',  queueNumber: queue.currentNumber };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        return { success: false, message: "Username already exists. Please choose another one." };
      }
      console.log(error);
      throw new Error("Failed to create manage pasien!"); // Mengoreksi pesan error
    }
  };
  
  
  export const UpdateManagePasien = async (formData) => {
    const data = typeof formData.entries === 'function' ? Object.fromEntries(formData.entries()) : formData;
  

    const { id, name, address, nomorbpjs, nik, checkOut, desc, pembayaran, statusPembayaran, jenis_Kelamin } = data;
  
    try {
      await connectToDB();
      const updateFields = {
        name, 
        address, 
        nomorbpjs, 
        nik, 
        checkOut,
        pembayaran,
        statusPembayaran,
        desc,
        jenis_Kelamin
      };
  
      Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await ManagePasien.findByIdAndUpdate(id, updateFields);
  
      revalidatePath("/dashboard/managePasien" || "/dashboardPegawai/managePasien");

      return { success: true, message: 'Manage Pasien berhasil di-update!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Gagal meng-update manage pasien. Silakan coba lagi.' };
    }
  };


  
  export const deleteManagePasien = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
      await ManagePasien.findByIdAndDelete(id);
      revalidatePath("/dashboard/managePasien");

      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to delete data Pasien!" };
    }
  
    
  };
  