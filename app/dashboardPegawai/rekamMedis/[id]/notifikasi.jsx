"use client";

import { UpdateRekamMedis } from "../../../lib/actions/actionRekamMedis";
import styles from "../../../ui/dashboard/rekamMedis/singleRekamMedis/singleRekamMedis.module.css";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useState } from "react";

const UpdateRekamMedisForm = ({ rekamMedis, onUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: rekamMedis._id,
    nama: rekamMedis.nama,
    tanggal: rekamMedis.tanggal
      ? new Date(rekamMedis.tanggal).toISOString().slice(0, 16)
      : "",
    keluhan: rekamMedis.keluhan,
    diagnosa: rekamMedis.diagnosa,
    tindakan: rekamMedis.tindakan,
    resepObat: rekamMedis.resepObat,
    dokter: rekamMedis.dokter,
    catatanTambahan: rekamMedis.catatanTambahan,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await UpdateRekamMedis(new FormData(event.target));
      if (result.success) {
        message.success(result.message || "Rekam Medis berhasil di-update!");
        if (typeof onUpdate === "function") {
          onUpdate(formData);
        }
        setTimeout(() => router.push("/dashboardPegawai/rekamMedis"), 1000);
      } else {
        message.error(
          result.message || "Gagal meng-update rekam medis. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Failed to update rekam medis:", error);
      message.error("Gagal meng-update rekam medis. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{formData.nama}</div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />
          <label>Nama</label>
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
          />
          <label>Tanggal</label>
          <input
            type="datetime-local"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
          />
          <label>Diagnosa</label>
          <input
            type="text"
            name="diagnosa"
            placeholder="Diagnosa Dokter"
            value={formData.diagnosa}
            onChange={handleChange}
          />
          <label>Tindakan</label>
          <input
            type="text"
            name="tindakan"
            placeholder="Tindakan Dokter"
            value={formData.tindakan}
            onChange={handleChange}
          />
          <label>Resep Obat</label>
          <input
            type="text"
            name="resepObat"
            placeholder="Resep Obat"
            value={formData.resepObat}
            onChange={handleChange}
          />
          <label>Dokter</label>
          <select
            name="dokter"
            id="dokter"
            value={formData.dokter}
            onChange={handleChange}
          >
            <option value="" disabled>
              Pilih Dokter
            </option>
            <option value="budi">Budi</option>
            <option value="mawar">Mawar</option>
          </select>
          <label>Catatan Tambahan</label>
          <textarea
            name="catatanTambahan"
            id="catatanTambahan"
            rows="5"
            placeholder="Catatan Tambahan"
            value={formData.catatanTambahan}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRekamMedisForm;
