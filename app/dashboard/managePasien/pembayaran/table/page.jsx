"use client";

import { message } from "antd";
import { deletePembayaran } from "@/app/lib/actions/actionPembayaran";
import { updateStatusPembayaran } from "@/app/lib/actions/actionPembayaran";
import styles from "../../../../ui/dashboard/managePasien/table/table.module.css";
import Link from "next/link";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deletePembayaran(formData);
    if (result.success) {
      setTimeout(() => {
        window.location.reload();
      }, 800);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error("Gagal menghapus data. Silakan coba lagi.");
  }
};

const handleUpdateStatus = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await updateStatusPembayaran(formData);
    if (result.success) {
      setTimeout(() => {
        window.location.reload();
      }, 800);
      message.success(result.message);
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error("Gagal memperbarui status pembayaran. Silakan coba lagi.");
  }
};
const TablePembayaran = ({ pembayarans }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Phone</td>
          <td>No.BPJS</td>
          <td>Metode Pembayaran</td>
          <td>Status Pembayaran</td>
          <td>Nominal</td>
          <td>Keterangan</td>
          <td>Created At</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(pembayarans) && pembayarans.length > 0 ? (
          pembayarans.map((pembayaran) => (
            <tr key={pembayaran._id}>
              <td>
                <div className={styles.managePasien}>{pembayaran.name}</div>
              </td>
              <td>{pembayaran.phone}</td>
              <td>{pembayaran.nomorbpjs}</td>
              <td>{pembayaran.metodePembayaran}</td>
              <td>{pembayaran.statusPembayaran}</td>
              <td>Rp {pembayaran.nominal}</td>
              <td>{pembayaran.keterangan}</td>
              <td>{pembayaran.createdAt?.toString().slice(0, 10)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={`/dashboard/managePasien/pembayaran/${pembayaran._id}`}
                  >
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deletePembayaran}>
                    <input type="hidden" name="id" value={pembayaran._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(pembayaran._id)}
                    >
                      Delete
                    </button>
                  </form>
                  <button
                    className={`${styles.button} ${styles.update}`}
                    onClick={() => handleUpdateStatus(pembayaran._id)}
                  >
                    Update Status
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">Not Pasiens found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TablePembayaran;
