import mongoose from "mongoose";

const pembayaranSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    phone: {
        type: String,
        required: true,
    },
    nomorbpjs: {
        type: String,
        required: true,
        
    },
    metodePembayaran: {
        type: String,
        
    },
    statusPembayaran: {
        type: String,
    },
    nominal: {
        type: String,
    },
    keterangan: {
        type: String,
    },
    
}, { timestamps: true });

export const Pembayaran = mongoose.models.Pembayaran || mongoose.model("Pembayaran", pembayaranSchema);
