"use client";

import { Avatar, Button, Card } from "antd";
import styles from "../../../ui/dashboard/cards/card/card.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteCards } from "@/app/lib/actions/actionCards";

const { Meta } = Card;

const CardBerita = ({ cards }) => {
  return (
    <div className={styles.container}>
      {Array.isArray(cards) && cards.length > 0 ? (
        cards.map((card) => (
          <Card
            key={card._id}
            className={styles.card}
            cover={
              <Image
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
                <Link href={`/berita/${card._id}`}>
                  <Button type="primary">Read More</Button>
                </Link>
              </div>

              <div className={styles.buttons}>
                <form action={deleteCards}>
                  <input type="hidden" name="id" value={card._id} />
                  <button>Delete</button>
                </form>
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

export default CardBerita;
