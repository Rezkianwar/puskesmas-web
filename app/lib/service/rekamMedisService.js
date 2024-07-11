import { RekamsMedis } from "../models/rekamMedis";
import { connectToDB } from "../utils";

export const fetchRekamsMedis = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();

    const count = await RekamsMedis.find({ nama: { $regex: regex } }).countDocuments();
    const rekammediss = await RekamsMedis.find({ nama: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

      rekammediss.forEach(rekammedis => {
        rekammedis._id = rekammedis._id.toString();
        rekammedis.createdAt = rekammedis.createdAt.toISOString();
        rekammedis.updatedAt = rekammedis.updatedAt.toISOString();
      });

    return { count, rekammediss };
  } catch (err) {
    console.error("Error fetching Rekam Medis:", err);
    throw new Error("failed to fetch Rekam Medis from db");
  }
};

export const fetchRekamMedis = async (id) => {
  try {
    await connectToDB();
    const rekamMedis = await RekamsMedis.findById(id).lean();

    if (!rekamMedis) {
      console.error("Rekam Medis not found");
      return null;
    }
    const simpleRekamMedis = {
      ...rekamMedis,
      _id: rekamMedis._id.toString(),
      createdAt: rekamMedis.createdAt.toISOString(),
      updatedAt: rekamMedis.updatedAt.toISOString(),
    };

    return simpleRekamMedis;
  } catch (error) {
    console.error("Error fetching Rekam Medis:", error);
    throw new Error("failed to fetch Rekam Medis from db");
  }
};
