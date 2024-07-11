import { fetchRekamMedis } from "../../../lib/service/rekamMedisService";
import UpdateRekamMedisForm from "./notifikasi";
import styles from "../../../ui/dashboard/rekamMedis/singleRekamMedis/singleRekamMedis.module.css";

const SingleRekamMedisPage = async ({ params }) => {
  const { id } = params;
  const rekamMedis = await fetchRekamMedis(id);

  if (!rekamMedis) {
    return (
      <div className={styles.container}>
        <p>Data not found</p>
      </div>
    );
  }
  return <UpdateRekamMedisForm rekamMedis={rekamMedis} />;
};

export default SingleRekamMedisPage;
