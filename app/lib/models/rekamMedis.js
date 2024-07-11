import mongoose from "mongoose";

const rekamMedisSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    tanggal: {
        type: Date,
        required: true,
    },
    keluhan: {
        type: String,
        required: true,
    },
    diagnosa: {
        type: String,
        required: true,
    },
    tindakan: {
        type: String,
        required: true,
    },
    resepObat: {
        type: String,
        required: true
    },
    dokter: {
        type: String,
    },
    catatanTambahan: {
        type: String,
    },
}, { timestamps: true });

export const RekamsMedis = mongoose.models.RekamsMedis || mongoose.model("RekamsMedis", rekamMedisSchema);
