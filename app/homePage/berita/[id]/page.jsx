import { fetchCard } from "../../../lib/service/cardService";
import styles from "../../../ui/homePage/berita/singleCardBerita/singleCardBerita.module.css";
import { Image } from "antd";

const singleCardBerita = async ({ params }) => {
  const { id } = params;

  const card = await fetchCard(id);
  console.log("Fetched Card:", card);

  if (!card) {
    return (
      <div className={styles.container}>
        <p>User not found</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src="/berita.png" alt="berita" height={350} width="100%" />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}>{card.title}</h1>
        <Image
          src={card.img || "/noavatar.png"}
          className={styles.image}
          alt="example"
          width={300}
          height={300}
        />
        <p className={styles.description}>{card.description}</p>
      </div>
    </div>
  );
};

export default singleCardBerita;
