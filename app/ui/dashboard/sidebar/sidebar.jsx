"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdMedicalServices,
  MdLogout,
  MdLocalHospital,
  MdMedicalInformation,
  MdAddCard,
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
        key: "/dashboard",
        label: "Dashboard Admin",
        icon: <MdDashboard />,
      },
      {
        key: "/dashboard/users",
        label: "Users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        key: "managePasien",
        label: "Manage Pasien",
        icon: <MdMedicalServices />,
        children: [
          {
            key: "/dashboard/managePasien",
            label: "Manage Pasien",
            icon: <MdMedicalServices />,
          },
          {
            key: "/dashboard/managePasien/rujukanPasien",
            label: "Rujukan Pasien",
            icon: <MdMedicalServices />,
          },
        ],
      },
      {
        key: "manageObat",
        label: "Manage Obat",
        icon: <MdLocalHospital />,
        children: [
          {
            key: "/dashboard/manageObat",
            label: "Manage Obat",
            icon: <MdLocalHospital />,
          },
          {
            key: "/dashboard/manageObat/obatPasien",
            label: "Obat Pasien",
            icon: <MdLocalHospital />,
          },
        ],
      },
      {
        key: "/dashboard/rekamMedis",
        label: "Rekam Medis",
        icon: <MdMedicalInformation />,
      },
      {
        key: "/dashboard/cards",
        label: "Card Berita",
        icon: <MdAddCard />,
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
            <span className={styles.userTitle}>Admin</span>
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
