import Image from "next/image";
import styles from "../../../ui/homePage/profile/janjilayanan/janjilayanan.module.css";

const visiMisiData = [
  {
    title: "1.",
    content: <p>Menerima NIK/KTP/KIS Digital untuk pendaftaran pelayanan</p>,
  },
  {
    title: "2.",
    content: (
      <p>
        Tidak meminta dokumen fotokopi kepada Peserta <br /> sebagai syarat
        pendaftaran pelayanan
      </p>
    ),
  },
  {
    title: "3.",
    content: <p>Memberikan pelayanan tanpa biaya tambahan di luar ketentuan</p>,
  },
  {
    title: "4.",
    content: (
      <p>
        Tidak melakukan pembatasan hari rawat Pasien (sesuai indikasi medis)
        <br />
      </p>
    ),
  },
  {
    title: "5.",
    content: (
      <p>
        Memberikan pelayanan obat yang dibutuhkan dan tidak membebankan Peserta{" "}
        <br />
        untuk mencari obat jika terdapat kekosongan obat
      </p>
    ),
  },
  {
    title: "6.",
    content: (
      <p>
        Melayani Peserta dengan ramah tanpa diskriminasi Silago, 27 April 2023{" "}
        <br />
        Kepala UPTI Puskesmas Silago
      </p>
    ),
  },
];
const JanjiLayanan = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>JANJI LAYANAN JAMINAN KESEHATAN NASIONAL (JKN) </h1>
        <h4>
          UPT Puskesmas Silago beserta Jajaran mendukung <br /> Transformasi
          Mutu Layanan yang Mudah, Cepat, <br /> dan Setara kepada Peserta JKN
          dengan:
        </h4>
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
            src="/bpjs.png"
            alt="logo kab dharmasraya"
            width={120}
            height={70}
          />
        </div>
        {visiMisiData.map((item, index) => (
          <div key={index}>
            <div className={styles.subtitle}>
              <p>
                {item.title}
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JanjiLayanan;
