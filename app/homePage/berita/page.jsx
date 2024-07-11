import styles from "../../ui/homePage/berita/berita.module.css";
import CardBerita from "./cardBerita/page";
import { fetchCards } from "../../lib/service/cardService";

const Berita = async () => {
  const result = await fetchCards("");
  const cards = result.cards;
  return (
    <div className={styles.container}>
      <h1>Berita</h1>
      <div className={styles.grid}>
        <CardBerita cards={cards} />
      </div>
    </div>
  );
};

export default Berita;
