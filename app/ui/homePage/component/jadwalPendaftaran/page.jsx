"use client";

import { FieldTimeOutlined, FileTextOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useRef, useState } from "react";
import styles from "./jadwalPendaftaran.module.css";

const JadwalPendaftaran = () => {
  const jadwalRef = useRef(null);
  const pendaftaranRef = useRef(null);

  const [visibleSection, setVisibleSection] = useState(null);

  const handleSectionClick = (section) => {
    // Jika bagian yang diklik saat ini terlihat, sembunyikan bagian tersebut
    if (visibleSection === section) {
      setVisibleSection(null);
    } else {
      setVisibleSection(section);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.titlepelayanan}>
          <div
            className={styles.titlejadwal}
            onClick={() => handleSectionClick("jadwal")}
          >
            <h1>
              <FieldTimeOutlined />
              Jadwal pelayanan Loket
            </h1>
          </div>
          <div
            className={styles.titlependaftaran}
            onClick={() => handleSectionClick("pendaftaran")}
          >
            <h1>
              <FileTextOutlined />
              Cara Pendaftaran
            </h1>
          </div>
        </div>
        <div className={styles.pelayanan}>
          {visibleSection === "jadwal" && (
            <div ref={jadwalRef} className={styles.jadwal}>
              <h2>
                JADWAL PELAYANAN LOKET PENDAFTARAN & PELAYANAN DALAM GEDUNG
              </h2>
              <div className={styles.contentjadwal}>
                <Image
                  src="/jadwalhome.png"
                  alt="jadwal"
                  width={300}
                  height={200}
                />
                <ul className={styles.jadwalList}>
                  <li>
                    <span className={styles.left}>Senin s/d Sabtu</span>
                    <span className={styles.right}>08.00 – 12.00</span>
                  </li>
                  <li>
                    <span className={styles.left}>Pelayanan Gawat Darurat</span>
                    <span className={styles.right}>24 jam</span>
                  </li>
                  <li>
                    <span className={styles.left}>Pelayanan Rawat Inap</span>
                    <span className={styles.right}>24 jam</span>
                  </li>
                  <li>
                    <span className={styles.left}>
                      Pelayanan Gawat Darurat Obstetri dan Neonatal
                    </span>
                    <span className={styles.right}>24 jam</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {visibleSection === "pendaftaran" && (
            <div ref={pendaftaranRef} className={styles.pendaftaran}>
              <h1>Cara Pendaftaran</h1>
              <div className={styles.contentpendaftaran}>
                <Image
                  src="/pendaftaranhome.png"
                  alt="pendaftaran"
                  width={300}
                  height={200}
                />
                <div className={styles.cardpendaftaran}>
                  <div className={styles.pendaftaranlangsung}>
                    <h2>Pendaftaran Langsung</h2>
                    <h3>Wajib Membawa</h3>
                    <ul>
                      <li>Kartu Kontrol</li>
                      <li>KTP / Fotocopy KTP</li>
                      <li>Kartu BPJS</li>
                    </ul>
                  </div>
                  <div className={styles.pendaftaranOnline}>
                    <h2>Pendaftaran Online</h2>
                    <ul>
                      <li>Silahkan mengakses website Puskemas silago</li>
                      <li>
                        Silahkan Registrasi terlebih dahulu <br /> dengan
                        menggunakan email yang dimiliki.
                      </li>
                      <li>
                        Setelah login, Silahkan ke form Pendaftaran online
                      </li>
                      <li>Isi form sesuai dengan data diri</li>
                      <li>
                        Setelah di isi screnshot hasil pendaftaran <br /> dan
                        tunjukan pada pihak puskesmas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JadwalPendaftaran;
