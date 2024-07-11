import { fetchManagePasien } from "@/app/lib/service/managePasienService";
import styles from "../../ui/homePage/pendaftaran/pendaftaran.module.css";
import TablePendaftaran from "./tablePendaftaran/page";
import { currentUser } from "@clerk/nextjs/server";
import { SignUp } from "@clerk/nextjs";

export default async function pendaftaranOnline() {
  const user = await currentUser();
  const result = await fetchManagePasien();
  const managepasiens = result.managepasiens;

  if (!user) {
    return (
      <div className={styles.signinBoc}>
        <div className={styles.signintitle}>
          <p>
            Kamu Belum Memiliki Akun⛔
            <br /> Silahkan Login atau Membuat Akun Terlebih Dahulu,
            <br /> Untuk Melakukan Pendaftaran.
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                paddingBottom: "100px",
              },
              formButtonPrimary: {
                backgroundColor: "#5755eb",
              },
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pendaftaran Online</h1>
      <div className={styles.grid}>
        <div></div>
        <div>
          <TablePendaftaran managepasiens={managepasiens} />
        </div>
      </div>
    </div>
  );
}
