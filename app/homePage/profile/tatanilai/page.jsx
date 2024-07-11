import Image from "next/image";
import styles from "../../../ui/homePage/profile/tatanilai/tatanilai.module.css";

const visiMisiData = [
  {
    title: "S ",
    content: <h2>Salam</h2>,
  },
  {
    title: "I ",
    content: <h2>Integrasi</h2>,
    desc: <p>(Melayani Pasien Dengan Sepenuh Hati)</p>,
  },
  {
    title: "L ",
    content: <h2>Loyal</h2>,
    desc: <p>(Berdedikasi Terhadap Tanggung Jawab)</p>,
  },
  {
    title: "A ",
    content: <h2>Akuntabel</h2>,
    desc: <p>(Pleayanan Kesehatan Sesuai Prosedur)</p>,
  },
  {
    title: "G ",
    content: <h2>Giat</h2>,
    desc: <p>(Seluruh Pegawai Harus Terlibat Setiap Kegiatan Puskesmas )</p>,
  },
  {
    title: "O ",
    content: <h2>Optimal</h2>,
    desc: <p>(Melayani Pasien Semaksimal Mungkin )</p>,
  },
];

const TataNilai = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Tata Nilai</h1>
        <h2>UPT PUSKESMAS SILAGO</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/puskesmas.png"
            alt="logo puskesmas"
            width={100}
            height={70}
          />
          <Image
            src="/dharmasraya.png"
            alt="logo kab dharmasraya"
            width={120}
            height={70}
          />
        </div>
        {visiMisiData.map((item, index) => (
          <div key={index}>
            <div className={styles.subtitle}>
              <h1>{item.title}</h1>
            </div>
            <div className={styles.desc}>
              <h2>{item.content}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TataNilai;
