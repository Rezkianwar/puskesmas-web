"use client";

import { UpdateManageObat } from "../../../lib/actions/actionManageObat";
import styles from "../../../ui/dashboard/manageObat/singleManageObat/singleManageObat.module.css";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useState } from "react";

const UpdateManageObatForm = ({ manageObat, onUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: manageObat._id,
    namaObat: manageObat.namaObat,
    stok: manageObat.stok,
    bentukSediaan: manageObat.bentukSediaan,
    golongan: manageObat.golongan,
    dosis: manageObat.dosis,
    manfaat: manageObat.manfaat,
    expObat: manageObat.expObat
      ? new Date(manageObat.expObat).toISOString().slice(0, 16)
      : "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await UpdateManageObat(new FormData(event.target));
      if (result.success) {
        message.success(result.message || "Manage Obat berhasil di-update!");
        if (typeof onUpdate === "function") {
          onUpdate(formData);
        }
        setTimeout(() => router.push("/dashboardPegawai/manageObat"), 1000);
      } else {
        message.error(
          result.message || "Gagal meng-update manage obat. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Failed to update manage obat:", error);
      message.error("Gagal meng-update manage obat. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{formData.namaObat}</div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />
          <label>Nama Obat</label>
          <input
            type="text"
            name="namaObat"
            placeholder="Nama Obat"
            value={formData.namaObat}
            onChange={handleChange}
          />
          <label>Stok Obat</label>
          <input
            type="number"
            name="stok"
            placeholder="Stok Obat"
            value={formData.stok}
            onChange={handleChange}
          />
          <label>Bentuk Sediaan</label>
          <select
            name="bentukSediaan"
            value={formData.bentukSediaan}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Pilih Bentuk Sediaan --
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
          <label>Golongan Obat</label>
          <select
            name="golongan"
            value={formData.golongan}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Pilih Jenis Golongan Obat --
            </option>
            <option value="obatbebas">Obat Bebas</option>
            <option value="obatbebasterbatas">Obat Bebas Terbatas</option>
            <option value="obatkeras">Obat Keras</option>
            <option value="obatgolongannarkotika">
              Obat Golongan Narkotika
            </option>
          </select>
          <label>Dosis</label>
          <input
            type="text"
            name="dosis"
            placeholder="Dosis"
            value={formData.dosis}
            onChange={handleChange}
          />
          <label>Manfaat</label>
          <input
            type="text"
            name="manfaat"
            placeholder="Manfaat"
            value={formData.manfaat}
            onChange={handleChange}
          />
          <label>Tanggal Exp. Obat</label>
          <input
            type="datetime-local"
            name="expObat"
            value={formData.expObat}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateManageObatForm;
