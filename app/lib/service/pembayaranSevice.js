import { Pembayaran } from "../models/pembayaran";
import { connectToDB } from "../utils";

export const fetchPembayaran = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();
    const count = await Pembayaran.find({ name: { $regex: regex } }).countDocuments();
    const pembayarans = await Pembayaran.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

      pembayarans.forEach(pembayaran => {
        pembayaran._id = pembayaran._id.toString();
        pembayaran.createdAt = pembayaran.createdAt.toISOString();
      });

    return { count, pembayarans };
  } catch (err) {
    console.error("Error fetching pembayarans from db:", err);
    throw new Error("failed to fetch pembayarans from db");
  }
};

export const fetchPembayarans = async (id) => {
  try {
    await connectToDB();
    const pembayaran = await Pembayaran.findById(id).lean();

    if (!pembayaran) {
      console.error("Pasien not found");
      return null;
    }
    const simpleUser = {
      ...pembayaran,
      _id: pembayaran._id.toString(),
      createdAt: pembayaran.createdAt.toISOString(),
    };

    return simpleUser;
  } catch (error) {
    console.error("Error fetching pembayaran pasien:", error);
    throw new Error("failed to fetch pembayarans from db");
  }
};
