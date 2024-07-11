import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    img: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Cards = mongoose.models.Cards || mongoose.model("Cards", cardSchema);
