"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdMedicalServices,
  MdLogout,
  MdLocalHospital,
  MdMedicalInformation,
  MdCurrencyExchange,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const createMenuItems = () => [
  {
    key: "pages",
    label: "Pages",
    type: "group",
    children: [
      {
        key: "/dashboardPegawai",
        label: "Dashboard Pegawai",
        icon: <MdDashboard />,
      },
      {
        key: "managePasien",
        label: "Manage Pasien",
        icon: <MdMedicalServices />,
        children: [
          {
            key: "/dashboardPegawai/managePasien",
            label: "Manage Pasien",
            icon: <MdMedicalServices />,
          },
          {
            key: "/dashboardPegawai/managePasien/rujukanPasien",
            label: "Rujukan Pasien",
            icon: <MdMedicalServices />,
          },
          {
            key: "/dashboardPegawai/managePasien/pembayaran",
            label: "Pembayaran",
            icon: <MdCurrencyExchange />,
          },
        ],
      },
      {
        key: "manageObat",
        label: "Manage Obat",
        icon: <MdLocalHospital />,
        children: [
          {
            key: "/dashboardPegawai/manageObat",
            label: "Manage Obat",
            icon: <MdLocalHospital />,
          },
          {
            key: "/dashboardPegawai/manageObat/obatPasien",
            label: "Obat Pasien",
            icon: <MdLocalHospital />,
          },
        ],
      },
      {
        key: "/dashboardPegawai/rekamMedis",
        label: "Rekam Medis",
        icon: <MdMedicalInformation />,
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/loginDashboard");
  };

  const handleMenuClick = (e) => {
    router.push(e.key);
  };

  return (
    <>
      <Sider className={styles.container}>
        <div className={styles.user}>
          <Image
            className={styles.userImage}
            src="/noavatar.png"
            alt="user"
            width="50"
            height="50"
          />
          <div className={styles.userDetail}>
            <span className={styles.username}>{session?.user?.username}</span>
            <span className={styles.userTitle}>Pegawai</span>
          </div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[]}
          className={styles.menu}
          theme="dark"
          onClick={handleMenuClick}
          items={createMenuItems()}
        />
        <button className={styles.logout} onClick={handleLogout}>
          <MdLogout />
          Logout
        </button>
      </Sider>
    </>
  );
};

export default Sidebar;
