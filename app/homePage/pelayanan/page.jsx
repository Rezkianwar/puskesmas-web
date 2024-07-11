"use client";

import Link from "next/link";
import styles from "../../ui/homePage/pelayanan/pelayanan.module.css";
import { Card, Image } from "antd";
const { Meta } = Card;

const ItemLayanan = [
  {
    title: "Jadwal Pelayanan",
    link: "homePage/pelayanan/jadwalPelayanan",
    img: "https://img.freepik.com/free-vector/appointment-booking-with-calendar_23-2148564506.jpg?uid=P153912075&ga=GA1.1.2486464.1719328406&semt=ais_user",
  },
  {
    title: "Pendaftaran Online",
    link: "homePage/pendaftaran",
    img: "https://img.freepik.com/free-vector/online-registration-concept_23-2148564506.jpg?uid=P153912075&ga=GA1.1.2486464.1719328406&semt=ais_user",
  },
];

const Pelayanan = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Pelayanan Puskemas Silago</h1>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {ItemLayanan.map((item, index) => (
          <Link key={index} href={item.link}>
            <Card
              hoverable
              style={{
                width: 340,
                margin: "20px",
              }}
              cover={<Image alt={item.title} src={item.img} preview={false} />}
            >
              <Meta
                title={item.title}
                description={`Lihat informasi lebih lanjut tentang ${item.title}`}
              />
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pelayanan;
