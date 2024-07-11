import { Image } from "antd";
import styles from "../../../ui/homePage/profile/organisasi/organisasi.module.css";

const StrukturOrganisasi = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          Struktur Organisasi <br /> Puskesmas Silago{" "}
        </h1>
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/organisasi.png"
            alt="logo puskesmas"
            width={1028}
            height={600}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasi;
