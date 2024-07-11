"use client";

import { message } from "antd";
import { addManageObat } from "../../../lib/actions/actionManageObat";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/manageObat/addManageObat/addManageObat.module.css";

const AddManageObat = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      namaObat: formData.get("namaObat"),
      stok: formData.get("stok"),
      expObat: formData.get("expObat"),
      bentukSediaan: formData.get("bentukSediaan"),
      golongan: formData.get("golongan"),
      dosis: formData.get("dosis"),
      manfaat: formData.get("manfaat"),
    };

    try {
      const result = await addManageObat(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(() => router.push("/dashboard/manageObat"), 1000); // Redirect setelah 2 detik
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
        <input type="text" placeholder="Nama Obat" name="namaObat" required />
        <input type="number" placeholder="Stok Obat" name="stok" required />
        <select name="bentukSediaan" id="bentukSediaan" required>
          <option value="" disabled>
            -- Pilih Bentuk Kesediaan --
          </option>
          <option value="bedak">Bedak</option>
          <option value="injeksi">Injeksi</option>
          <option value="kapsul">Kapsul</option>
          <option value="kapsullunak">Kapsul Lunak</option>
          <option value="kasa">Kasa</option>
          <option value="krim">Krim</option>
          <option value="salep">Salep</option>
          <option value="serbuk">Serbuk</option>
          <option value="sirup">Sirup</option>
          <option value="sirupkering">Sirup Kering</option>
          <option value="suspensi">Suspensi</option>
          <option value="tablet">Tablet</option>
          <option value="tabletsalentrik">Tablet Sal Entrik</option>
          <option value="tabletkunyah">Tablet Kunyah</option>
        </select>
        <select name="golongan" id="golongan" required>
          <option value="" disabled>
            -- Pilih Jenis Golongan Obat --
          </option>
          <option value="obatbebas">Obat Bebas</option>
          <option value="obatbebasterbatas">Obat Bebas Terbatas</option>
          <option value="obatkeras">Obat Keras</option>
          <option value="obatgolongannarkotika">Obat Golongan Narkotika</option>
        </select>
        <input type="text" placeholder="Dosis..." name="dosis" />
        <input type="text" placeholder="Manfaat..." name="manfaat" />
        <input type="datetime-local" id="expObat" name="expObat" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddManageObat;
