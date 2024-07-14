"use client";

import { useRouter } from "next/navigation";
import { message } from "antd";
import {
  deleteObatPasien,
  updateObatPasien,
} from "../../../../lib/actions/actionsObatPasien";
import styles from "../../../../ui/dashboard/manageObat/obatPasien/tableObatPasien/tableObatPasien.module.css";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteObatPasien(formData);
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

const TableObatPasien = ({ obatpasiens }) => {
  const router = useRouter();

  const handleStatusChange = async (id, status) => {
    try {
      const result = await updateObatPasien(id, status);
      if (result.success) {
        message.success(result.message || "Status berhasil diperbarui!");

        setTimeout(() => router.refresh(), 800);
      } else {
        message.error(
          result.message || "Gagal memperbarui status. Silakan coba lagi."
        );
      }
    } catch (error) {
      message.error("Gagal memperbarui status. Silakan coba lagi.");
      console.error("Error updating status:", error); // Optional: Log the error for debugging
    }
  };
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nama Obat</td>
            <td>Nama Pasien</td>
            <td>No.Hp Pasien</td>
            <td>Resep Obat</td>
            <td>Status</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(obatpasiens) && obatpasiens.length > 0 ? (
            obatpasiens.map((obatpasien) => (
              <tr key={obatpasien._id}>
                <td>{obatpasien.nama_Obat}</td>
                <td>{obatpasien.nama_Pasien}</td>
                <td>{obatpasien.no_Hp}</td>
                <td>{obatpasien.resep_Obat}</td>
                <td>{obatpasien.status}</td>
                <td>{obatpasien.createdAt?.toString().slice(4, 16)}</td>

                <td>
                  <div className={styles.buttons}>
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            obatpasien._id,
                            "Obat bisa diambil"
                          )
                        }
                      >
                        Obat Bisa Diambil
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(obatpasien._id, "pending")
                        }
                      >
                        Obat Pending
                      </button>
                    </div>
                  </div>
                  <form action={deleteObatPasien}>
                    <input type="hidden" name="id" value={obatpasien._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(obatpasien._id)}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No referral requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableObatPasien;
