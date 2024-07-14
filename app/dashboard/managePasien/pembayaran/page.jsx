import Search from "../../../ui/dashboard/search/search";
import Link from "next/link";
import styles from "../../../ui/dashboard/managePasien/managePasien.module.css";
import { fetchPembayaran } from "@/app/lib/service/pembayaranSevice";
import TablePembayaran from "./table/page";
import Pagination from "../../../ui/dashboard/pagination/pagination";

const ManagePasien = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  const result = await fetchPembayaran(query, page);
  const pembayarans = result.pembayarans;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Pasien..." />
        <Link href="/dashboard/managePasien/pembayaran/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TablePembayaran pembayarans={pembayarans} />
      <Pagination count={count} />
    </div>
  );
};

export default ManagePasien;
