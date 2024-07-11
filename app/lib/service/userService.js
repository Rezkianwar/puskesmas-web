import { Users } from "../models/user";
import { connectToDB } from "../utils";

export const fetchUsers = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();

    const count = await Users.find({ username: { $regex: regex } }).countDocuments();
    const users = await Users.find({ username: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1))
      .lean();

      users.forEach(user => {
        user._id = user._id.toString();
        user.createdAt = user.createdAt.toISOString();
      });

    return { count, users };
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("failed to fetch users from db");
  }
};

export const fetchUser = async (id) => {
  try {
    await connectToDB();
    const user = await Users.findById(id).lean();

    if (!user) {
      console.error("User not found");
      return null;
    }
    const simpleUser = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
    };

    return simpleUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("failed to fetch users from db");
  }
};
