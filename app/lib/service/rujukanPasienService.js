import mongoose from "mongoose";
import { RujukanPasien } from "../models/rujukanPasien";
import { connectToDB } from "../utils";

export const fetchRujukanPasiens = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();
    const count = await RujukanPasien.find({ namaPasien: { $regex: regex } }).countDocuments();
    const rujukanpasiens = await RujukanPasien.find({ namaPasien: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    rujukanpasiens.forEach(rujukanPasien => {
      rujukanPasien._id = rujukanPasien._id.toString();
    });

    return { count, rujukanpasiens };
  } catch (err) {
    console.error("Error fetching rujukanpasiens from db:", err);
    throw new Error("failed to fetch rujukanpasiens from db");
  }
};

export const fetchRujukanPasien = async (id) => {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const rujukanPasien = await RujukanPasien.findById(id).lean();

    if (!rujukanPasien) {
      console.error("Rujukan Pasien not found");
      return null;
    }

    return rujukanPasien;
  } catch (error) {
    console.error("Error fetching rujukan pasien:", error);
    throw new Error("failed to fetch rujukan pasien from db");
  }
};
