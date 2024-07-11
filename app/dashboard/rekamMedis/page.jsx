import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/rekamMedis/rekamMedis.module.css";
import Link from "next/link";
import TableRekamMedis from "./tabel/page";
import { fetchRekamsMedis } from "../../lib/service/rekamMedisService";
import Pagination from "../../ui/dashboard/pagination/pagination";

const RekamMedisPasien = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchRekamsMedis(query, page);
  const rekammediss = result.rekammediss;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Pasien..." />
        <Link href="/dashboard/rekamMedis/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableRekamMedis rekammediss={rekammediss} />
      <Pagination count={count} />
    </div>
  );
};

export default RekamMedisPasien;
