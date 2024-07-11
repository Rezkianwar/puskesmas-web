import mongoose from "mongoose";

const obatPasienSchema = new mongoose.Schema({
    nama_Obat: {
        type: String,
        required: true,
    },
    nama_Pasien: {
        type: String,
        required: true,
    },
    no_Hp: {
        type: String,
        required: true,
    },
    resep_Obat: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending', // initial status
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ObatPasien = mongoose.models.ObatPasien || mongoose.model("ObatPasien", obatPasienSchema);
