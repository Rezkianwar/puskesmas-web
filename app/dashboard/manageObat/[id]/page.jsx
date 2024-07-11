import { fetchManageObat } from "../../../lib/service/manageObatService";
import UpdateManageObatForm from "./notifikasi";
import styles from "../../../ui/dashboard/manageObat/singleManageObat/singleManageObat.module.css";

const SingleManageObatPage = async ({ params }) => {
  const { id } = params;

  const manageObat = await fetchManageObat(id);

  if (!manageObat) {
    return (
      <div className={styles.container}>
        <p>Data not found</p>
      </div>
    );
  }

  return <UpdateManageObatForm manageObat={manageObat} />;
};

export default SingleManageObatPage;
