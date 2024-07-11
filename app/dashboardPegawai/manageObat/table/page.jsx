"use client";

import styles from "../../../ui/dashboard/manageObat/table/table.module.css";
import Link from "next/link";
import { deleteManageObat } from "../../../lib/actions/actionManageObat";
import { message } from "antd";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteManageObat(formData);
    if (result.success) {
      message.success(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error("Gagal menghapus data. Silakan coba lagi.");
  }
};
const TableManageObat = ({ manageobats }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Nama Obat</td>
          <td>Stok Obat</td>
          <td>Bentuk Sediaan</td>
          <td>Golongan Obat</td>
          <td>Dosis</td>
          <td>Manfaat</td>
          <td>Created At</td>
          <td>Exp.Obat</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(manageobats) && manageobats.length > 0 ? (
          manageobats.map((manageobat) => (
            <tr key={manageobat._id}>
              <td>
                <div className={styles.rekammedis}>{manageobat.namaObat}</div>
              </td>
              <td>{manageobat.stok}</td>
              <td>{manageobat.bentukSediaan}</td>
              <td>{manageobat.golongan}</td>
              <td>{manageobat.dosis}</td>
              <td>{manageobat.manfaat}</td>
              <td>{manageobat.createdAt?.toString().slice(2, 10)}</td>
              <td>{manageobat.expObat?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboardPegawai/manageObat/${manageobat._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <Link
                    href={`/dashboardPegawai/manageObat/updateStok/${manageobat._id}`}
                  >
                    <button className={`${styles.button} ${styles.update}`}>
                      Update Stok
                    </button>
                  </Link>
                  <form action={deleteManageObat}>
                    <input type="hidden" name="id" value={manageobat._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(manageobat._id)}
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

export default TableManageObat;
