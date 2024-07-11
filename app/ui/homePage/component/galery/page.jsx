import { Image } from "antd";
import styles from "./galery.module.css";

const itemGalery = [
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
const GaleryHome = () => {
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.header}>
        <h1>Galery</h1>
      </div>
      <div className={styles.galleryItems}>
        {itemGalery.map((item, index) => (
          <div key={index} className={styles.galleryItem}>
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={200}
                className={styles.image}
                preview={false}
              />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleryHome;
