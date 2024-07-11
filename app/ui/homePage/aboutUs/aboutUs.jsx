import { MdEmail } from "react-icons/md";
import Styles from "./aboutUs.module.css";
import Link from "next/link";
import {
  FacebookFilled,
  InstagramFilled,
  PhoneFilled,
} from "@ant-design/icons";

const menuItems = [
  {
    list: [
      {
        title: "Layanan Yang Disediakan :",
        describe: [
          "Pelayanan pemeriksaan umum",
          "Layanan kesehatan gigi dan mulut",
          "Pelayanan Konseling Gizi, Sanitasi, PKPR, Lansia",
          "Pelayanan KB/KIA",
          "Pelayanan Laboratorium",
          "Layanan Kefarmasian",
          "Pelayanan IVA",
          "Pelayanan Gawat Darurat",
          "Pelayanan Rawat Inap",
          "Pelayanan Persalinan",
        ],
      },
      {
        title: "Tentang Kami :",
        describe: (
          <p>
            Jorong Silago, Kenagarian Silago , Kecamatan Sembilan Koto,
            <br />
            Kabupaten Dharmasraya, Sumatera Barat 27681. <br /> Melayani Dengan
            Hati, Kesehatan Anda Kepuasan Kami😊. <br /> Type Puskesmas :
            Puskesmas Rawatan. <br />
            Puskesmas Kawasan Terpencil.
          </p>
        ),
      },
    ],
  },
];

const AboutAs = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.items}>
        {menuItems[0].list.map((item, index) => (
          <div key={index} className={Styles.item}>
            <h3 className={Styles.title}>{item.title}</h3>
            <div className={Styles.describe}>
              {Array.isArray(item.describe)
                ? item.describe.map((desc, subIndex) => (
                    <p key={subIndex}>{desc}</p>
                  ))
                : item.describe}
            </div>
          </div>
        ))}
      </div>
      <div className={Styles.icons}>
        <Link href="mailto:puskesmassilago@gmail.com" className={Styles.link}>
          puskesmassilago@gmail.com
          <MdEmail className={Styles.icon} />
        </Link>
        <Link href="https://www.facebook.com/Hcsilago/" className={Styles.link}>
          Puskesmas Silago
          <FacebookFilled className={Styles.icon} />
        </Link>
        <Link href="tel:082249576341" className={Styles.link}>
          0822 4957 6341
          <PhoneFilled className={Styles.icon} />
        </Link>
        <Link
          href="https://www.instagram.com/explore/locations/1028680472/puskesmas-silago-kabupaten-dharmasraya/"
          className={Styles.link}
        >
          puskesmassilago
          <InstagramFilled className={Styles.icon} />
        </Link>
      </div>
    </div>
  );
};

export default AboutAs;
