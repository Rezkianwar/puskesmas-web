import Search from "../../../ui/dashboard/search/search";
import Link from "next/link";
import { fetchRujukanPasiens } from "../../../lib/service/rujukanPasienService";
import TableRujukanPasien from "../rujukanPasien/table/page";
import Pagination from "../../../ui/dashboard/pagination/pagination";
import styles from "../../../ui/dashboard/managePasien/rujukanPasien/rujukanPasien.module.css";

const RujukanPasien = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchRujukanPasiens(query, page);
  const rujukanpasiens = result.rujukanpasiens;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Pasien..." />
        <Link href="/dashboardPegawai/managePasien/rujukanPasien/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableRujukanPasien rujukanpasiens={rujukanpasiens} />
      <Pagination count={count} />
    </div>
  );
};

export default RujukanPasien;
