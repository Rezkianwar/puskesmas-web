import Layout from "./layout";
import WhatsappChat from "../lib/whatsappChat";
import { Image } from "antd";
import styles from "../ui/homePage/homePage.module.css";
import Link from "next/link";
import JadwalPendaftaran from "../ui/homePage/component/jadwalPendaftaran/page";
import TenagaKesehatan from "../ui/homePage/component/tenagaKesehatan/page";
const homePage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            src="/selamatDatang.png"
            alt="selamat datang"
            height={350}
            width="100%"
          />
        </div>
        <div className={styles.linkimg}>
          <Link href="/homePage/pendaftaran">
            <Image
              src="/pendaftaran-online.png"
              alt="pendaftaran online"
              width={300}
              height={200}
              preview={false}
              className={styles.image}
            />
          </Link>
          <Link href="https://www.lapor.go.id/">
            <Image
              src="/lapor.jpg"
              alt="lapor"
              width={300}
              height={200}
              preview={false}
              className={styles.image}
            />
          </Link>
        </div>
        <div>
          <JadwalPendaftaran />
          <TenagaKesehatan />
          <WhatsappChat />
        </div>
      </div>
    </Layout>
  );
};

export default homePage;
