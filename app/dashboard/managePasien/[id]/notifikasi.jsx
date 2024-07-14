"use client";

import { UpdateManagePasien } from "../../../lib/actions/actionManagePasien";
import styles from "../../../ui/dashboard/managePasien/singleManagePasien/singleManagePasien.module.css";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useState } from "react";

const UpdateManagePasienForm = ({ managepasien, onUpdate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: managepasien._id,
    name: managepasien.name,
    address: managepasien.address,
    nomorbpjs: managepasien.nomorbpjs,
    nik: managepasien.nik,
    checkOut: managepasien.checkOut
      ? new Date(managepasien.checkOut).toISOString().slice(0, 16)
      : "",
    pembayaran: managepasien.pembayaran,
    desc: managepasien.desc,
    jenis_Kelamin: managepasien.jenis_Kelamin,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await UpdateManagePasien(formData);
      if (result.success) {
        message.success(result.message || "Manage Pasien berhasil di-update!");
        if (typeof onUpdate === "function") {
          onUpdate(formData);
        }
        setTimeout(() => router.push("/dashboard/managePasien"), 1000);
      } else {
        message.error(
          result.message ||
            "Gagal meng-update manage pasien. Silakan coba lagi."
        );
      }
    } catch (error) {
      console.error("Failed to update manage pasien:", error);
      message.error("Gagal meng-update manage pasien. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>{managepasien.name}</div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Jenis Kelamin</label>
          <select
            name="jenis_Kelamin"
            value={formData.jenis_Kelamin}
            onChange={handleChange}
          >
            <option value="" disabled>
              Pilih Jenis Kelamin
            </option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
          </select>
          <label>Nomor BPJS</label>
          <input
            type="number"
            name="nomorbpjs"
            placeholder="No_BPJS"
            value={formData.nomorbpjs}
            onChange={handleChange}
          />
          <label>Check Out</label>
          <input
            type="datetime-local"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Your address"
            value={formData.address}
            onChange={handleChange}
          />
          <label>NIK</label>
          <input
            type="text"
            name="nik"
            placeholder="NIK"
            value={formData.nik}
            onChange={handleChange}
          />
          <label>Pembayaran</label>
          <select
            name="pembayaran"
            value={formData.pembayaran}
            onChange={handleChange}
          >
            <option value="" disabled>
              Pilih Jenis Pembayaran
            </option>
            <option value="cash/tunai">Cash/Tunai</option>
            <option value="bpjs">BPJS</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            rows="5"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateManagePasienForm;
