"use client";

import { useRouter } from "next/navigation";
import { addRujukanPasien } from "../../../../lib/actions/actionRujukanPasien";
import { message } from "antd";
import styles from "../../../../ui/dashboard/managePasien/rujukanPasien/addRujukanPasien/addRujukanPasien.module.css";

const AddRujukanPasien = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      namaPasien: formData.get("namaPasien"),
      nomorPasien: formData.get("nomorPasien"),
      tempatRujukan: formData.get("tempatRujukan"),
    };

    try {
      const result = await addRujukanPasien(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(
          () => router.push("/dashboardPegawai/managePasien/rujukanPasien"),
          2000
        ); // Redirect setelah 2 detik
      } else {
        message.error();
      }
    } catch (error) {
      message.error("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Data Rujukan Pasien</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Nama Pasien:</label>
          <input type="text" name="namaPasien" required />
        </div>
        <div>
          <label>Nomor Telepon Pasien:</label>
          <input
            type="tel"
            name="nomorPasien"
            required
            pattern="^\+62[0-9]{9,12}$"
            onInvalid={(e) =>
              e.target.setCustomValidity(
                "Nomor harus mulai dengan +62. Contoh: (081234567890) => (+6281234567890)"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <label>Tempat Rujukan:</label>
          <select name="tempatRujukan" id="tempatRujukan" required>
            <option value="" disabled>
              -- Pilih Tempat Rujukan --
            </option>
            <option value="poliklinik_rsud_dharmasraya">
              Poliklinik - RSUD Dharmasraya
            </option>
            <option value="igd_rsud_dharmasraya">IGD - RSUD Dharmasraya</option>
            <option value="poliklinik_rsud_sungaidareh">
              Poliklinik - RSUD Sungai Dareh{" "}
            </option>
            <option value="igd_rsud_sungaidareh">
              IGD - RSUD Sungai Dareh
            </option>
          </select>
        </div>
        <button type="submit">Add Rujukan</button>
      </form>
    </div>
  );
};

export default AddRujukanPasien;
