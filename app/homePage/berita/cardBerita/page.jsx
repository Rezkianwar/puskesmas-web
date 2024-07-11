"use client";

import { Card, Avatar, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../ui/homePage/berita/cardBerita/cardBerita.module.css";

const { Meta } = Card;

const Berita = ({ cards }) => {
  return (
    <div className={styles.container}>
      {Array.isArray(cards) && cards.length > 0 ? (
        cards.map((card) => (
          <Card
            key={card._id}
            className={styles.card}
            cover={
              <Image
                className={styles.image}
                alt="example"
                src={card.img || "/noavatar.png"}
                width={500}
                height={250}
              />
            }
          >
            <p>{card.createdAt?.toString().slice(4, 16)}</p>
            <Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${card.id}`}
                />
              }
              title={card.title}
              description={
                <div className={styles["card-content"]}>
                  {card.description.length > 150
                    ? `${card.description.substring(0, 150)}...`
                    : card.description}
                </div>
              }
            />
            <div className={styles.footer}>
              <div className={styles.link}>
                <Link href={`homePage/berita/${card._id}`}>
                  <Button type="primary">Read More</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default Berita;
