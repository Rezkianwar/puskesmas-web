"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./menuLinkHome.module.css";

const MenuLinkHome = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${pathname === item.path && styles.active}`}
    >
      {item.title}
    </Link>
  );
};

export default MenuLinkHome;
