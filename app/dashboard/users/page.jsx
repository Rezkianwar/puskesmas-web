import Search from "../../ui/dashboard/search/search";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from "next/link";
import TableUsers from "./table/page";
import { fetchUsers } from "../../lib/service/userService";
import Pagination from "../../ui/dashboard/pagination/pagination";

const UsersPage = async ({ searchParams }) => {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const result = await fetchUsers(query, page);
  const users = result.users;
  const count = result.count;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <TableUsers users={users} />
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
