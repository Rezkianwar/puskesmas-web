"use client";

import { useRouter } from "next/navigation";
import { message } from "antd";
import {
  deleteRujukanPasien,
  updateRujukanPasien,
} from "@/app/lib/actions/actionRujukanPasien";
import styles from "../../../../ui/dashboard/managePasien/rujukanPasien/tabelRujukanPasien/tabelRujukanPasien.module.css";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteRujukanPasien(formData);
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
const TableRujukanPasien = ({ rujukanpasiens }) => {
  const router = useRouter();

  const handleStatusChange = async (id, status) => {
    try {
      const result = await updateRujukanPasien(id, status);
      if (result.success) {
        message.success(result.message || "Status berhasil diperbarui!");
        // Optionally, you could refetch data here to update the UI
        setTimeout(() => router.refresh(), 2000); // Redirect setelah 2 detik router.push();
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
            <td>Nama Pasien</td>
            <td>Nomor Pasien</td>
            <td>Tempat Rujukan</td>
            <td>Status</td>
            <td>Created At</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rujukanpasiens) && rujukanpasiens.length > 0 ? (
            rujukanpasiens.map((rujukanPasien) => (
              <tr key={rujukanPasien._id}>
                <td>{rujukanPasien.namaPasien}</td>
                <td>{rujukanPasien.nomorPasien}</td>
                <td>{rujukanPasien.tempatRujukan}</td>
                <td>{rujukanPasien.status}</td>
                <td>{rujukanPasien.createdAt?.toString().slice(4, 16)}</td>

                <td>
                  <div className={styles.buttons}>
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            rujukanPasien._id,
                            "surat bisa diambil"
                          )
                        }
                      >
                        Surat Bisa Diambil
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(rujukanPasien._id, "pending")
                        }
                      >
                        Surat Pending
                      </button>
                    </div>
                  </div>
                  <form action={deleteRujukanPasien}>
                    <input type="hidden" name="id" value={rujukanPasien._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(rujukanPasien._id)}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No referral requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableRujukanPasien;
