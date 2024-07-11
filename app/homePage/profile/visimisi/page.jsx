import Image from "next/image";
import styles from "../../../ui/homePage/profile/visimisi/visimisi.module.css";

const visiMisiData = [
  {
    title: "Visi",
    content: (
      <p>
        Terwujudnya Kabupaten Dharmasraya <br /> Maju dan Mandiri dan Berbudaya
      </p>
    ),
  },
  {
    title: "Misi",
    content: (
      <p>
        Meningkatkan Kualitas Sumber Daya <br /> Manusia
      </p>
    ),
  },
  {
    title: "Motto",
    content: (
      <p>
        Melayani Dengan Hati,
        <br /> Kesehatan Anda Kepuasan Kami
      </p>
    ),
  },
];

const VisiMisi = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Visi dan Misi Puskesmas Silago</h1>
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
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisiMisi;
