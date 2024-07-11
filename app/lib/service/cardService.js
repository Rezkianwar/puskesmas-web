import { Cards } from "../models/card";
import { connectToDB } from "../utils";

export const fetchCards = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 8;

  try {
    await connectToDB();

    const count = await Cards.find({ title: { $regex: regex } }).countDocuments();
    const cards = await Cards.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

    cards.forEach(card => {
      card._id = card._id.toString();
    });

    return { count, cards };
  } catch (err) {
    console.error("Error fetching cards:", err);
    throw new Error("failed to fetch cards from db");
  }
};

export const fetchCard = async (id) => {
  try {
    await connectToDB();
    const card = await Cards.findById(id).lean();

    if (!card) {
      console.error("User not found");
      return null;
    }

    return card;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("failed to fetch users from db");
  }
};
