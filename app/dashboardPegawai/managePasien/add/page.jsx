"use client";
import { message } from "antd";
import { addManagePasien } from "../../../lib/actions/actionManagePasien";
import { useRouter } from "next/navigation";
import styles from "../../../ui/dashboard/managePasien/addManagePasien/addManagePasien.module.css";

const AddManageProduct = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      nomorbpjs: formData.get("nomorbpjs"),
      phone: formData.get("phone"),
      jenis_Kelamin: formData.get("jenis_Kelamin"),
      pembayaran: formData.get("pembayaran"),
      nik: formData.get("nik"),
      checkOut: formData.get("checkOut"),
      desc: formData.get("desc"),
    };

    try {
      const result = await addManagePasien(data);
      if (result.success) {
        message.success(result.message || "Data berhasil ditambahkan!");
        event.target.reset(); // Reset form setelah sukses
        setTimeout(() => router.push("/dashboardPegawai/managePasien"), 1000); // Redirect setelah 2 detik
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
        <input
          type="text"
          placeholder="Alamat. cth: Jorong Silago"
          name="address"
          required
        />
        <input type="text" placeholder="NomorBPJS" name="nomorbpjs" required />
        <input type="text" placeholder="Phone Number" name="phone" required />
        <input type="text" placeholder="NIK" name="nik" required />
        <select name="pembayaran" id="pembayaran">
          <option value="" disabled>
            -- Pilih Jenis Pembayaran --
          </option>
          <option value="Cash">Cash</option>
          <option value="bpjs">BPJS</option>
        </select>
        <select name="jenis_Kelamin" id="jenis_Kelamin" required>
          <option value="" disabled>
            -- Pilih Jenis Kelamin --
          </option>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>
        <select name="statusPembayaran" id="statusPembayaran">
          <option value="belumdibayar">Belum Dibayar</option>
        </select>
        <input type="datetime-local" id="checkOut" name="checkOut" required />
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddManageProduct;
