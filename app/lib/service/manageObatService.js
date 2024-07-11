import { ManageObat } from "../models/manageObat";
import { connectToDB } from "../utils";

export const fetchManageObats = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();
    const count = await ManageObat.find({ namaObat: { $regex: regex } }).countDocuments();
    const manageobats = await ManageObat.find({ namaObat: { $regex: regex } })
    .sort({ namaObat: 1 }) 
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

      manageobats.forEach(manageobat => {
        manageobat._id = manageobat._id.toString();
        manageobat.createdAt = manageobat.createdAt.toISOString();
        manageobat.updatedAt = manageobat.updatedAt.toISOString();
      });

    return { count, manageobats };
  } catch (err) {
    console.error("Error fetching manage obats from db:", err);
    throw new Error("failed to fetch manage obats from db");
  }
};

export const fetchManageObat = async (id) => {
  try {
    await connectToDB();
    const manageobat = await ManageObat.findById(id).lean();

    if (!manageobat) {
      console.error("Obat not found");
      return null;
    }
    const simpleManageObat = {
      ...manageobat,
      _id: manageobat._id.toString(),
      createdAt: manageobat.createdAt.toISOString(),
      updatedAt: manageobat.updatedAt.toISOString(),
      expObat: manageobat.expObat ? manageobat.expObat.toISOString() : null, // Pastikan expObat juga diubah jika ada
    };

    return simpleManageObat;
  } catch (error) {
    console.error("Error fetching manage obat:", error);
    throw new Error("failed to fetch manage obat from db");
  }
};
