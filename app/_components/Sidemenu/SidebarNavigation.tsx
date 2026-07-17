"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/app/_utils/constants";
import styles from "./Sidemenu.module.css";

export default function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <>
      {NavLinks.map((section, index) => (
        <div key={section.title + index}>
          <div className={styles["sb-nav-title"]}>{section.title}</div>

          {section.items.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles["sb-nav-item"]} ${
                  active ? styles.active : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}
