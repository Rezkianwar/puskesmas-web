"use client";

import styles from "../../../ui/dashboard/rekamMedis/tableRekamMedis/tableRekamMedis.module.css";
import Link from "next/link";
import { deleteRekamMedis } from "../../../lib/actions/actionRekamMedis";
import { message } from "antd";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteRekamMedis(formData);
    if (result.success) {
      message.success(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error("Gagal menghapus data. Silakan coba lagi.");
  }
};

const TableRekamMedis = ({ rekammediss }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Nama</td>
          <td>Tanggal</td>
          <td>Keluhan</td>
          <td>Diagnosa</td>
          <td>Tindakan</td>
          <td>Resep Obat</td>
          <td>Dokter</td>
          <td>Catatan Tambahan</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rekammediss) && rekammediss.length > 0 ? (
          rekammediss.map((rekammedis) => (
            <tr key={rekammedis._id}>
              <td>
                <div className={styles.rekammedis}>{rekammedis.nama}</div>
              </td>
              <td>{rekammedis.tanggal?.toString().slice(4, 16)}</td>
              <td>{rekammedis.keluhan}</td>
              <td>{rekammedis.diagnosa}</td>
              <td>{rekammedis.tindakan}</td>
              <td>{rekammedis.resepObat}</td>
              <td>{rekammedis.dokter}</td>
              <td>{rekammedis.catatanTambahan}</td>

              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboardPegawai/rekamMedis/${rekammedis._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteRekamMedis}>
                    <input type="hidden" name="id" value={rekammedis._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(rekammedis._id)}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data Rekam Medis found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableRekamMedis;
