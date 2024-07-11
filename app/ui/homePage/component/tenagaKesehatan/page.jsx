import { Image } from "antd";
import styles from "./tenagaKesehatan.module.css";

const itemTenagaKesehatan = [
  {
    title: "Kepala Puskesmas",
    jumlah: "1 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Tata Usaha",
    jumlah: "1 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Dokter",
    jumlah: "2 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Paramedis (Perawat, Bidan, dan Bidan Desa",
    jumlah: "35 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Staff Admin ",
    jumlah: "2 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Staff Pendaftaran ",
    jumlah: "1 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "K3",
    jumlah: "2 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Farmasi",
    jumlah: "5 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Staff Laboratorium ",
    jumlah: "3 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Gizi",
    jumlah: "2 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Satpam",
    jumlah: "1 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Supir",
    jumlah: "2 Orang",
    img: "/galeryhome.svg",
  },
  {
    title: "Staff Lainnya",
    jumlah: "7 Orang",
    img: "/galeryhome.svg",
  },
];
const TenagaKesehatan = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tenaga Kesehatan</h1>
      </div>
      <div className={styles.Itemskes}>
        {itemTenagaKesehatan.map((item, index) => (
          <div key={index} className={styles.Itemkes}>
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={150}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>
                <h3>{item.jumlah}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenagaKesehatan;
