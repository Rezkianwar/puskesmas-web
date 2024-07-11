"use client";

import { useRouter } from "next/navigation";
import { addObatPasien } from "../../../../lib/actions/actionsObatPasien";
import { message, Select } from "antd";
import styles from "../../../../ui/dashboard/manageObat/obatPasien/addObatPasien/addObatPasein.module.css";
import React, { useState } from "react";

// Daftar nama obat
const options = [
  { label: "Paracetamol", value: "paracetamol" },
  { label: "Ibuprofen", value: "ibuprofen" },
  { label: "Amoxicillin", value: "amoxicillin" },
  { label: "Aspirin", value: "aspirin" },
  { label: "Ciprofloxacin", value: "ciprofloxacin" },
  { label: "Metformin", value: "metformin" },
  { label: "Omeprazole", value: "omeprazole" },
  { label: "Amlodipine", value: "amlodipine" },
  { label: "Simvastatin", value: "simvastatin" },
  { label: "Losartan", value: "losartan" },
  { label: "Levothyroxine", value: "levothyroxine" },
  { label: "Gabapentin", value: "gabapentin" },
  { label: "Furosemide", value: "furosemide" },
  { label: "Atorvastatin", value: "atorvastatin" },
  { label: "Tramadol", value: "tramadol" },
  { label: "Cetirizine", value: "cetirizine" },
  { label: "Citalopram", value: "citalopram" },
  { label: "Lisinopril", value: "lisinopril" },
  { label: "Metoprolol", value: "metoprolol" },
  { label: "Alprazolam", value: "alprazolam" },
];

const AddRujukanPasien = () => {
  const router = useRouter();
  const [selectedObat, setSelectedObat] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      nama_Obat: selectedObat.join(","), // Convert array to comma-separated string
      nama_Pasien: formData.get("nama_Pasien"),
      no_Hp: formData.get("no_Hp"),
      resep_Obat: formData.get("resep_Obat"),
    };

    try {
      const result = await addObatPasien(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setSelectedObat([]);
        setTimeout(() => router.push("/dashboard/manageObat/obatPasien"), 2000);
      } else {
        message.error(result.message || "Gagal menambahkan data.");
      }
    } catch (error) {
      message.error("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Data Obat Pasien</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formgroup}>
          <div className={styles.formleft}>
            <label>Nama Obat:</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Obat"
              value={selectedObat}
              onChange={setSelectedObat}
              options={options}
              optionLabelProp="label"
              className={styles.select}
              variant="borderless"
            />
            <input
              type="hidden"
              name="nama_Obat"
              value={selectedObat.join(",")}
            />
            <label>Nama Pasien:</label>
            <input type="text" name="nama_Pasien" required />
          </div>
          <div className={styles.formright}>
            <label>Nomor Telepon Pasien:</label>
            <input
              type="tel"
              name="no_Hp"
              required
              pattern="^\+62[0-9]{9,12}$"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Nomor harus mulai dengan +62. Contoh: (081234567890) => (+6281234567890)"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <label>Resep Obat:</label>
            <textarea name="resep_Obat" rows="5" required />
          </div>
        </div>
        <button type="submit">Add Data Obat Pasien</button>
      </form>
    </div>
  );
};

export default AddRujukanPasien;
