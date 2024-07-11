import Wellcome from "../ui/dashboard/wellcome/wellcome";
import styles from "../ui/dashboard/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <Wellcome />
        <div className={styles.card}>
          {/* <Card />
          <Card />
          <Card /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
