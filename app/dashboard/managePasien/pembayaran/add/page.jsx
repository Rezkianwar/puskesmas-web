"use client";
import { message } from "antd";
import { addPembayaran } from "@/app/lib/actions/actionPembayaran";
import { useRouter } from "next/navigation";
import styles from "../../../../ui/dashboard/managePasien/addManagePasien/addManagePasien.module.css";

const AddPembayaranPasien = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      nomorbpjs: formData.get("nomorbpjs"),
      metodePembayaran: formData.get("metodePembayaran"),
      statusPembayaran: formData.get("statusPembayaran"),
      nominal: formData.get("nominal"),
      keterangan: formData.get("keterangan"),
    };

    try {
      const result = await addPembayaran(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(
          () => router.push("/dashboard/managePasien/pembayaran"),
          2000
        ); // Redirect setelah 2 detik
      } else {
        message.error(
          result.message || "Gagal menambahkan data. Silakan coba lagi."
        );
      }
    } catch (error) {
      message.error("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Nama Lengkap" name="name" required />
        <input type="text" placeholder="Phone Number" name="phone" required />
        <input type="text" placeholder="NomorBPJS" name="nomorbpjs" required />
        <select name="metodePembayaran" id="metodePembayaran">
          <option value="" disabled>
            -- Pilih Jenis Pembayaran --
          </option>
          <option value="Cash">Cash</option>
          <option value="bpjs">BPJS</option>
        </select>
        <select name="statusPembayaran" id="statusPembayaran">
          <option value="belumdibayar">Belum Dibayar</option>
        </select>
        <select name="keterangan" id="keterangan">
          <option value="" disabled>
            -- Keterangan Pembayaran --
          </option>
          <option value="obat">Obat</option>
          <option value="Konsul">Konsul</option>
          <option value="pemeriksaan">Pemeriksaan</option>
        </select>
        <input type="number" placeholder="Nominal" name="nominal" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPembayaranPasien;
