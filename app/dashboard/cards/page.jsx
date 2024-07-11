import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/cards/cards.module.css";
import Link from "next/link";
import CardBerita from "./card/page";
import { fetchCards } from "../../lib/service/cardService";
import Pagination from "../../ui/dashboard/pagination/pagination";
import { Button } from "antd";

const CardsPage = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const result = await fetchCards(query, page);
  const cards = result.cards;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/cards/add">
          <Button
            type="primary"
            style={{ padding: "20px 10px", margin: "20px 0px" }}
          >
            Add New
          </Button>
        </Link>
      </div>
      <CardBerita cards={cards} />
      <Pagination count={count} />
    </div>
  );
};

export default CardsPage;
