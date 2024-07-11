import Search from "../../../ui/dashboard/search/search";
import Link from "next/link";
import styles from "../../../ui/dashboard/manageObat/obatPasien/obatPasien.module.css";
import { fetchObatPasiens } from "../../../lib/service/obatPasienService";
import TableObatPasien from "./tableObat/page";
import Pagination from "../../../ui/dashboard/pagination/pagination";

const ObatPasien = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchObatPasiens(query, page);
  const obatpasiens = result.obatpasiens;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search..." />
        <Link href="/dashboard/manageObat/obatPasien/addObat">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableObatPasien obatpasiens={obatpasiens} />
      <Pagination count={count} />
    </div>
  );
};

export default ObatPasien;
