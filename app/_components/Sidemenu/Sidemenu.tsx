import Image from "next/image";
import logo from "../../../public/logo.png";
import styles from "./Sidemenu.module.css";
import { LogOut } from "lucide-react";
import SidebarNavigation from "./SidebarNavigation";
import { getProfile } from "@/app/_lib/services/profile.service";
import { redirect } from "next/navigation";

const Sidemenu = async () => {
  try {
    const user = await getProfile();

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
          <SidebarNavigation />
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
                <p className={styles["sb-uemail"]}>{user?.email}</p>
              </div>
            </div>
            <LogOut className={styles["logout-btn"]} />
          </div>
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
};

export default Sidemenu;
