"use client";

import Image from "next/image";
import Link from "next/link";
import MenuLinkHome from "../menuLinkHome/menuLinkHome";
import styles from "./navbarHome.module.css";
import { UserButton } from "@clerk/nextjs";
import { Dropdown, Space } from "antd";
import { DownOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useState } from "react";

const items = [
  {
    key: "1",
    label: <Link href="/homePage/profile/visimisi">Visi dan Misi</Link>,
  },
  {
    key: "2",
    label: <Link href="/homePage/profile/tatanilai">Tata Nilai</Link>,
  },
  {
    key: "3",
    label: <Link href="/homePage/profile/janjilayanan">Janji Layanan</Link>,
  },
  {
    key: "4",
    label: <Link href="/homePage/profile/organisasi">Organisasi</Link>,
  },
];

const menuItemHome = [
  {
    title: "Pendaftaran Online",
    path: "/pendaftaran",
  },
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
    dropdown: true,
  },
  {
    title: "Pelayanan",
    path: "/pelayanan",
  },
  {
    title: "Berita",
    path: "/berita",
  },
  {
    title: "Galery",
    path: "/galery",
  },
];

const NavbarHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className={styles.header}>
        <Image
          src="/dharmasraya.png"
          alt="logo kabupaten dharmasraya"
          width="200"
          height="100"
          priority
        />
        <div className={styles.title}>
          <h1>Puskesmas Silago</h1>
          <p>Kami Siap Melayani Dengan Hati, Ramah, dan Profesional</p>
        </div>
        <Image
          src="/puskesmas.png"
          alt="logo puskesmas"
          width="150"
          height="100"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <div className={styles.profile}>
              <UserButton fallbackRedirectUrl="/" showName />
            </div>
            <MenuLinkHome item={menuItemHome[0]} />
          </div>
          <div className={styles.right}>
            <div className={styles.mobileMenuToggle} onClick={toggleMenu}>
              <MenuFoldOutlined className={styles.iconbar} />
            </div>
            <div
              className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
            >
              {menuItemHome.slice(1).map((item) => (
                <div key={item.title} className={styles.item}>
                  {item.dropdown ? (
                    <Dropdown
                      menu={{ items }}
                      placement="bottom"
                      arrow={{
                        pointAtCenter: true,
                      }}
                      trigger={["click"]}
                      className={styles.dropdown}
                    >
                      <a
                        onClick={(e) => e.preventDefault()}
                        className={styles.dropdownLink}
                      >
                        <Space>
                          <div className={styles.dropdownTitle}>
                            {item.title}
                          </div>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  ) : (
                    <MenuLinkHome item={item} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarHome;
