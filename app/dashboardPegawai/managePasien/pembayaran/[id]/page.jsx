import UpdatePembayaranPasien from "./notifikasi";
import { fetchPembayarans } from "../../../../lib/service/pembayaranSevice";
import styles from "../../../../ui/dashboard/managePasien/managePasien.module.css";

const SinglePembayaranPasien = async ({ params }) => {
  const { id } = params;

  const pembayaran = await fetchPembayarans(id);

  if (!pembayaran) {
    return (
      <div className={styles.container}>
        <p>User not found</p>
      </div>
    );
  }

  return <UpdatePembayaranPasien pembayaran={pembayaran} />;
};

export default SinglePembayaranPasien;
