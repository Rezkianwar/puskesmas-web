import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    currentNumber: { type: Number, default: 0 },
});

export const Queue = mongoose.models.Queue || mongoose.model("Queue", queueSchema);
