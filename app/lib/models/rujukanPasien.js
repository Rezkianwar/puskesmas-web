import mongoose from "mongoose";

const rujukanPasienSchema = new mongoose.Schema({
    namaPasien: {
        type: String,
        required: true,
    },
    nomorPasien: {
        type: String,
        required: true,
    },
    tempatRujukan: {
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

export const RujukanPasien = mongoose.models.RujukanPasien || mongoose.model("RujukanPasien", rujukanPasienSchema);
