import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import styles from "../../ui/dashboard/managePasien/managePasien.module.css";
import { fetchManagePasien } from "../../lib/service/managePasienService";
import TableManagePasien from "./table/page";
import Pagination from "../../ui/dashboard/pagination/pagination";

const ManagePasien = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchManagePasien(query, page);
  const managepasiens = result.managepasiens;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Pasien..." />
        <Link href="/dashboardPegawai/managePasien/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableManagePasien managepasiens={managepasiens} />
      <Pagination count={count} />
    </div>
  );
};

export default ManagePasien;
