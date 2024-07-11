"use server";

import { connectToDB } from "../utils";
import { Cards } from "../models/card";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const addCard = async (data) => {
    const { title, description } = data;
  
    try {
      await connectToDB();
      const newCard = new Cards({ title, description });
      await newCard.save();
      console.log("Card created successfully:", newCard);
  
      revalidatePath("/dashboard/cards");
      return { success: true, message: "Card berhasil ditambahkan!" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Failed to create card!" };
    }
  };
  
  
  
  export const updateCard = async (formData) => {
    const { id, title, description } = Object.fromEntries(formData);
  
    try {
      await connectToDB();
      const updateFields = {
        title,
        description
      };
  
       Object.keys(updateFields).forEach(
        (key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
      );
  
      await Cards.findByIdAndDelete(id, updateFields);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update card!");
    }
  
    revalidatePath("/dashboard/cards");
    redirect("/dashboard/cards");
  };
  
  
  
  export const deleteCards = async (data) => {
    const { id } = Object.fromEntries(data);
    try {
      await connectToDB();
      await Cards.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new Error("failed to delete card!");
    }
  
    revalidatePath("/dashboard/cards");
  };
  