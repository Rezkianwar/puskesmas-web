import Footer from "../ui/homePage/footer/footer";
import AboutUS from "../ui/homePage/aboutUs/aboutUs";
import styles from "../ui/homePage/homePage.module.css";
import NavbarHome from "../ui/homePage/navbarHome/navbarHome";

const layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <NavbarHome />
      <div className={styles.content}>{children}</div>
      <AboutUS />
      <Footer />
    </div>
  );
};

export default layout;
