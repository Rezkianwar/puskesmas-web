import mongoose from "mongoose";

const managePasienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    jenis_Kelamin: {
        type: String,
        required: true,
    },
    nomorbpjs: {
        type: String,
        required: true,
        
    },
    nik: {
        type: String,
        required: true
    },
    pembayaran: {
        type: String,
    },
    statusPembayaran: {
        type: String,
    },
    checkOut: {
        type: Date,
    },
    desc: {
        type: String,
    },
    queueNumber: {
        type: String,
    },
}, { timestamps: true });

export const ManagePasien = mongoose.models.ManagePasien || mongoose.model("ManagePasien", managePasienSchema);
