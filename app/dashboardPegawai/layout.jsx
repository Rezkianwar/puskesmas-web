import Navbar from "../ui/dashboardPegawai/navbar/navbar";
import Sidebar from "../ui/dashboardPegawai/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import Footer from "../ui/dashboardPegawai/footer/footer";

const layout = ({ children }) => {
  return (
    <div className={styles.container} style={{ backgroundColor: "var(--bg)" }}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default layout;
