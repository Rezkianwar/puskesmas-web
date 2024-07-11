import UpdateManagePasienForm from "./notifikasi";
import { fetchManagePasiens } from "../../../lib/service/managePasienService";
import styles from "../../../ui/dashboard/managePasien/singleManagePasien/singleManagePasien.module.css";

const SingleManagePasienPage = async ({ params }) => {
  const { id } = params;

  const managepasien = await fetchManagePasiens(id);

  if (!managepasien) {
    return (
      <div className={styles.container}>
        <p>User not found</p>
      </div>
    );
  }

  return <UpdateManagePasienForm managepasien={managepasien} />;
};

export default SingleManagePasienPage;
