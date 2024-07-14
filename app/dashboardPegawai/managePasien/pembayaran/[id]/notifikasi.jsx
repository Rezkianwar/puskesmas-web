"use client";

import { UpdatePembayaran } from "@/app/lib/actions/actionPembayaran";
import styles from "../../../..//ui/dashboard/managePasien/singleManagePasien/singleManagePasien.module.css";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useState } from "react";

const UpdatePembayaranPasien = ({ pembayaran, onUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: pembayaran._id,
    name: pembayaran.name,
    phone: pembayaran.phone,
    nomorbpjs: pembayaran.nomorbpjs,
    metodePembayaran: pembayaran.metodePembayaran,
    statusPembayaran: pembayaran.statusPembayaran,
    nominal: pembayaran.nominal,
    keterangan: pembayaran.keterangan,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await UpdatePembayaran(formData);
      if (result.success) {
        message.success(result.message || "Manage Pasien berhasil di-update!");
        if (typeof onUpdate === "function") {
          onUpdate(formData);
        }
        setTimeout(
          () => router.push("/dashboardPegawai/managePasien/pembayaran"),
          1000
        );
      } else {
        message.error(
          result.message ||
            "Gagal meng-update manage pasien. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Failed to update manage pasien:", error);
      message.error("Gagal meng-update manage pasien. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{pembayaran.name}</div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Nomor Handphone</label>
          <input
            type="text"
            name="phone"
            placeholder="masukan Nomor Ponsel..."
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Nomor BPJS</label>
          <input
            type="number"
            name="nomorbpjs"
            placeholder="No_BPJS"
            value={formData.nomorbpjs}
            onChange={handleChange}
          />

          <label>Metode Pembayaran</label>
          <select
            name="metodePembayaran"
            value={formData.metodePembayaran}
            onChange={handleChange}
          >
            <option value="" disabled>
              Pilih Jenis Pembayaran
            </option>
            <option value="cash/tunai">Cash/Tunai</option>
            <option value="bpjs">BPJS</option>
          </select>

          <label>Keterangan Pembayaran </label>
          <select
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
          >
            <option value="" disabled>
              Keterangan Pembayaran
            </option>
            <option value="obat">Obat</option>
            <option value="Konsul">Konsul</option>
            <option value="pemeriksaan">Pemeriksaan</option>
          </select>
          <label>Nominal Pembayaran</label>
          <input
            type="number"
            name="nominal"
            placeholder="Masukkan Nominal Pembayaran..."
            value={formData.nominal}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePembayaranPasien;
