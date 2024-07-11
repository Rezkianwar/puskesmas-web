"use server";

import { connectToDB } from "../utils";
import { Users } from "../models/user";
import { revalidatePath } from "next/cache";

import bcrypt from "bcrypt";

export const addUsers = async (data) => {
    const { username, email, password, phone, address, isAdmin, isActive } = data;
  
    try {
      await connectToDB();
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
        phone,
        address,
        isAdmin,
        isActive,
      });
  
      await newUser.save();
      console.log("User created successfully:", newUser);
  
      revalidatePath("/dashboard/users");
  
      return { success: true, message: "User berhasil ditambahkan!" };
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        return { success: false, message: "Username already exists. Please choose another one." };
      }
      console.log(error);
      return { success: false, message: "Failed to create user!" };
    }
  };
  
  
  export const UpdateUsers = async (formData) => {
    const data = typeof formData.entries === 'function' ? Object.fromEntries(formData.entries()) : formData;
  
    const { id, username, email, password, phone, address, isAdmin, isActive } = data;
  
    try {
      await connectToDB();
      const updateFields = {
        username,
        email,
        phone,
        address,
        isAdmin: isAdmin === "true",
        isActive: isActive === "true",
      };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateFields.password = await bcrypt.hash(password, salt);
      }
  
      Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await Users.findByIdAndUpdate(id, updateFields);
  
      revalidatePath("/dashboard/users");
      return { success: true, message: 'User berhasil di-update!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Gagal meng-update user. Silakan coba lagi.' };
    }
  };

  
  
  export const deleteUsers = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDB(); // Menambahkan await untuk koneksi database
      await Users.findByIdAndDelete(id);

      revalidatePath("/dashboard/users");

      return { success: true, message: 'Data berhasil dihapus!' };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to delete data users!" };
    }
  
    
  };