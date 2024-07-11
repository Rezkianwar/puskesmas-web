import styles from "../ui/dashboardPegawai/dashboardPegawai.module.css";
import Wellcome from "../ui/dashboardPegawai/wellcome/wellcome";

const DashboardPegawai = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Wellcome />
      </div>
    </div>
  );
};

export default DashboardPegawai;
