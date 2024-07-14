"use client";

import { message } from "antd";
import { deleteManagePasien } from "../../../lib/actions/actionManagePasien";
import styles from "../../../ui/dashboard/managePasien/table/table.module.css";
import Image from "next/image";
import Link from "next/link";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteManagePasien(formData);
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
const TableManagePasien = ({ managepasiens }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>NIK</td>
          <td>No.BPJS</td>
          <td>Phone</td>
          <td>Jenis Kelamin</td>
          <td>Address</td>
          <td>Pembayaran</td>
          <td>Created At</td>
          <td>Check Out</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(managepasiens) && managepasiens.length > 0 ? (
          managepasiens.map((managepasien) => (
            <tr key={managepasien._id}>
              <td>
                <div className={styles.managePasien}>
                  <Image
                    src={managepasien.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.managePasienImage}
                  />
                  {managepasien.name}
                </div>
              </td>
              <td>{managepasien.nik}</td>
              <td>{managepasien.nomorbpjs}</td>
              <td>{managepasien.phone}</td>
              <td>{managepasien.jenis_Kelamin}</td>
              <td>{managepasien.address}</td>
              <td>{managepasien.pembayaran}</td>
              <td>{managepasien.createdAt?.toString().slice(4, 16)}</td>
              <td>{managepasien.checkOut?.toString().slice(4, 16)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link
                    href={`/dashboardPegawai/managePasien/${managepasien._id}`}
                  >
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteManagePasien}>
                    <input type="hidden" name="id" value={managepasien._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(managepasien._id)}
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
            <td colSpan="11">Not Pasiens found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableManagePasien;
