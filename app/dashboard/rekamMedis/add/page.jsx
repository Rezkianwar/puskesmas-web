"use client";

import { message } from "antd";
import { addRekamMedis } from "../../../lib/actions/actionRekamMedis";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/rekamMedis/addRekamMedis/addRekamMedis.module.css";

const AddRekamMedis = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      nama: formData.get("nama"),
      tanggal: formData.get("tanggal"),
      tanggalLahir: formData.get("tanggalLahir"),
      keluhan: formData.get("keluhan"),
      diagnosa: formData.get("diagnosa"),
      tindakan: formData.get("tindakan"),
      resepObat: formData.get("resepObat"),
      dokter: formData.get("dokter"),
      catatanTambahan: formData.get("catatanTambahan"),
    };

    try {
      const result = await addRekamMedis(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(() => router.push("/dashboard/rekamMedis"), 1000); // Redirect setelah 2 detik
      } else {
        message.error(
          result.message || "Gagal menambahkan data. Silakan coba lagi."
        );
      }
    } catch (error) {
      message.error("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Nama Lengkap" name="nama" required />
        <input type="datetime-local" id="tanggal" name="tanggal" required />
        <input
          type="datetime-local"
          id="tanggalLahir"
          name="tanggalLahir"
          required
        />
        <input
          type="keluhan"
          placeholder="Alamat. cth: Jorong Silago"
          name="keluhan"
          required
        />
        <input type="text" placeholder="diagnosa" name="diagnosa" required />
        <input
          type="text"
          placeholder="Tindakan yang dilakukan"
          name="tindakan"
          required
        />
        <input
          type="text"
          placeholder="Resep Obat yang diberikan"
          name="resepObat"
          required
        />
        <select name="dokter" id="dokter">
          <option value="" disabled>
            Pilih Dokter
          </option>
          <option value="budi">Budi</option>
          <option value="mawar">Mawar</option>
        </select>
        <textarea
          name="catatanTambahan"
          id="catatanTambahan"
          cols="30"
          rows="10"
          placeholder="Tambahkan catatan..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddRekamMedis;
