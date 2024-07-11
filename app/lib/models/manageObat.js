import mongoose from "mongoose";

const manageObatSchema = new mongoose.Schema({
    namaObat: {
        type: String,
        required: true,
    },
    stok: {
        type: String,
        required: true,
    },
    bentukSediaan: {
        type: String,
        required: true,
    },
    golongan: {
        type: String,
        required: true,
    },
    dosis: {
        type: String,
        required: true,
    },
    manfaat: {
        type: String,
        required: true,
    },
    expObat: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

export const ManageObat = mongoose.models.ManageObat || mongoose.model("ManageObat", manageObatSchema);
