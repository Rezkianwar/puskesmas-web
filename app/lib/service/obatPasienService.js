import mongoose from "mongoose";
import { ObatPasien } from "../models/obatPasien";
import { connectToDB } from "../utils";

export const fetchObatPasiens = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();
    const count = await ObatPasien.find({ nama_Pasien: { $regex: regex } }).countDocuments();
    const obatpasiens = await ObatPasien.find({ nama_Pasien: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    obatpasiens.forEach(obatpasien => {
      obatpasien._id = obatpasien._id.toString();
    });

    return { count, obatpasiens };
  } catch (err) {
    console.error("Error fetching obatpasien from db:", err);
    throw new Error("failed to fetch obatpasien from db");
  }
};

export const fetchObatPasien = async (pasienId) => {
  try {
    await connectToDB();

    if (!mongoose.Types.ObjectId.isValid(pasienId)) {
      throw new Error('Invalid ObjectId');
    }

    const obatPasien = await ObatPasien.findById(pasienId).lean();

    if (!obatPasien) {
      console.error("Rujukan Pasien not found");
      return null;
    }

    return obatPasien;
  } catch (error) {
    console.error("Error fetching rujukan pasien:", error);
    throw new Error("failed to fetch rujukan pasien from db");
  }
};
