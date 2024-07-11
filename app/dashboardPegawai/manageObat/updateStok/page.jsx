"use client";

import { useState } from "react";
import { updateStokObat } from "../../../lib/actions/actionManageObat";
import styles from "../../../ui/dashboard/manageObat/upadeStokObat/updateUpdateStok.module.css";
import { useRouter } from "next/navigation";
import { message } from "antd";

const UpdateStokObat = ({ obat }) => {
  const [jumlah, setJumlah] = useState(0);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await updateStokObat({
        id: obat._id,
        jumlah: parseInt(jumlah, 10),
      });
      if (result.success) {
        message.success("Stok berhasil diupdate");
        router.push("/dashboardPegawai/manageObat");
      } else {
        message.error(result.message || "Gagal mengupdate stok");
      }
    } catch (error) {
      message.error("Gagal mengupdate stok. Silakan coba lagi.");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Update Stok Obat: {obat.namaObat}</h2>
        <label>Jumlah yang diambil:</label>
        <input
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(parseInt(e.target.value, 10))}
          required
        />
        <button type="submit">Update Stok</button>
      </form>
    </div>
  );
};

export default UpdateStokObat;
