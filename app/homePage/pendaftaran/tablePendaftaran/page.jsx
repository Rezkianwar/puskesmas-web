"use client";

import React from "react";
import { useState } from "react";
import { Modal, message, Result, Button } from "antd";
import styles from "../../../ui/homePage/pendaftaran/tablePendaftaran/tablePendaftaran.module.css";
import { useRouter } from "next/navigation";
import { addManagePasien } from "../../../lib/actions/actionManagePasien";

const TablePendaftaran = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [queueNumber, setQueueNumber] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleShowModal = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = {
      name: form.name.value,
      address: form.address.value,
      nomorbpjs: form.nomorbpjs.value,
      phone: form.phone.value,
      jenis_Kelamin: form.jenis_Kelamin.value,
      pembayaran: form.pembayaran.value,
      nik: form.nik.value,
      desc: form.desc.value,
    };
    setFormData(data);
    setIsModalVisible(true);
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    try {
      const result = await addManagePasien(formData);
      if (result.success) {
        setQueueNumber(result.queueNumber);
        setIsSubmitted(true);
        message.success(result.message || <h2>Pendaftaran berhasil </h2>);
      } else {
        message.error(
          result.message ||
            "Gagal melakukan pendaftaran. Silakan coba lagi. pastikan datamu benar"
        );
      }
    } catch (error) {
      message.error(
        "Gagal melakukan pendaftaran. Silakan coba lagi. pastikan datamu benar"
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.containerResult}>
        <Result
          className={styles.result}
          status="success"
          title="Pendaftaran Berhasil"
          subTitle={
            <p>
              Nomor Antrian Anda: <b>{queueNumber}</b> <br /> Silakan Foto dan
              Tunjukan Pada Petugas Puskesmas <br /> Terima Kasih{" "}
            </p>
          }
          extra={[
            <Button type="primary" key="home" onClick={() => router.push("/")}>
              Kembali ke Beranda
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleShowModal} className={styles.form}>
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
        <select name="pembayaran" id="pembayaran" required>
          <option value="" disabled selected>
            Pilih Jenis Pembayaran
          </option>
          <option value="Cash">Cash/Tunai</option>
          <option value="bpjs">BPJS</option>
        </select>
        <select name="jenis_Kelamin" id="jenis_Kelamin" required>
          <option value="" disabled selected>
            Pilih Jenis Kelamin
          </option>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          placeholder="Descriptionkan Keluhan yang DiRasakan. contoh: Sakit kepala, Sakit dada, dll"
        ></textarea>
        <button type="submit" onClick={showLoading}>
          Daftar
        </button>
      </form>

      <Modal
        title="Konfirmasi Data"
        visible={isModalVisible}
        loading={loading}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>Nama: {formData.name}</p>
        <p>Alamat: {formData.address}</p>
        <p>Nomor BPJS: {formData.nomorbpjs}</p>
        <p>Phone: {formData.phone}</p>
        <p>NIK: {formData.nik}</p>
        <p>Jenis Kelamin: {formData.jenis_Kelamin}</p>
        <p>Pembayaran: {formData.pembayaran}</p>
        <p>Deskripsi: {formData.desc}</p>
      </Modal>
    </div>
  );
};

export default TablePendaftaran;
