"use client";

import { NavLinks } from "@/app/_utils/constants";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { usePathname } from "next/navigation";
import styles from "./Sidemenu.module.css";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

interface User {
  firstName?: string;
  lastName?: string;
  emailId?: string;
}

const Sidemenu = () => {
  const path = usePathname();

  const [user, setUser] = useState<User>({});

  useEffect(() => {
    let userData: any = localStorage?.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex flex-col justify-between bg-(--color-sb) w-65">
      <div>
        <Image
          src={logo}
          alt="xpensr logo"
          width={150}
          className="px-4 pt-4 pb-2"
        />
        <div className={styles["sb-divider"] + " my-1"} />
        {NavLinks.map((section, index) => (
          <div key={section.title + index}>
            <div className={styles["sb-nav-title"]}>{section.title}</div>

            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
            ${
              path === item.href || path.startsWith(item.href)
                ? styles[`sb-nav-item`] + " " + styles["active"]
                : styles[`sb-nav-item`]
            }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            {index !== NavLinks?.length - 1 && (
              <div className={styles["sb-divider"] + " my-1 mx-2"} />
            )}
          </div>
        ))}
      </div>

      <div>
        <div className={styles["sb-divider"] + " my-1"} />
        <div className="flex gap-2 items-center py-4 pl-4">
          <div className="flex gap-2">
            <div className={styles["sb-av"]}>
              {(user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")}
            </div>
            <div>
              <p className={styles["sb-uname"]}>
                {[user.firstName, user.lastName].filter(Boolean).join(" ")}
              </p>
              <p className={styles["sb-uemail"]}>{user?.emailId}</p>
            </div>
          </div>
          <LogOut className={styles["logout-btn"]} />
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
