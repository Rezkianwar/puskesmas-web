import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import styles from "../../ui/dashboard/manageObat/manageObat.module.css";
import { fetchManageObats } from "../../lib/service/manageObatService";
import TableManageObat from "./table/page";
import Pagination from "../../ui/dashboard/pagination/pagination";

const ManageObat = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchManageObats(query, page);
  const manageobats = result.manageobats;
  const count = result.count;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Pasien..." />
        <Link href="/dashboardPegawai/manageObat/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableManageObat manageobats={manageobats} />
      <Pagination count={count} />
    </div>
  );
};

export default ManageObat;
