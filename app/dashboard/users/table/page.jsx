"use client";

import styles from "../../../ui/dashboard/users/table/table.module.css";
import Link from "next/link";
import Image from "next/image";
import { deleteUsers } from "../../../lib/actions/actionUsers";
import { message } from "antd";

const handleDelete = async (id) => {
  try {
    const formData = new FormData();
    formData.append("id", id);
    const result = await deleteUsers(formData);
    if (result.success) {
      message.success(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      message.error(result.message);
    }
  } catch (error) {
    message.error("Gagal menghapus data. Silakan coba lagi.");
  }
};
const TableUsers = ({ users }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Address</td>
          <td>Created At</td>
          <td>Role</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.createdAt?.toString().slice(2, 10)}</td>
              <td>{user.isAdmin ? "Admin" : "Pegawai"}</td>
              <td>{user.isActive ? "Active" : "Passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteUsers}>
                    <input type="hidden" name="id" value={user._id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">Not users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableUsers;
