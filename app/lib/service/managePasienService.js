import { ManagePasien } from "../models/managePasien";
import { connectToDB } from "../utils";

export const fetchManagePasien = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();
    const count = await ManagePasien.find({ name: { $regex: regex } }).countDocuments();
    const managepasiens = await ManagePasien.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

      managepasiens.forEach(managepasien => {
        managepasien._id = managepasien._id.toString();
        managepasien.createdAt = managepasien.createdAt.toISOString();
      });

    return { count, managepasiens };
  } catch (err) {
    console.error("Error fetching manage pasiens from db:", err);
    throw new Error("failed to fetch manage pasiens from db");
  }
};

export const fetchManagePasiens = async (id) => {
  try {
    await connectToDB();
    const managepasien = await ManagePasien.findById(id).lean();

    if (!managepasien) {
      console.error("Pasien not found");
      return null;
    }
    const simpleUser = {
      ...managepasien,
      _id: managepasien._id.toString(),
      createdAt: managepasien.createdAt.toISOString(),
    };

    return simpleUser;
  } catch (error) {
    console.error("Error fetching manage pasien:", error);
    throw new Error("failed to fetch manage pasiens from db");
  }
};
