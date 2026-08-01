"use client";

import { logoutAPI } from "@/app/_feature/auth/authService";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { LogOut } from "lucide-react";
import styles from "./Sidemenu.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/_feature/hooks";
import { logoutUser } from "@/app/_feature/auth/authThunk";

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());

    router.replace("/login");
    router.refresh();
  };
  return (
    <ConfirmDialog
      trigger={<LogOut className={styles["logout-btn"]} />}
      title="Log out of xpensr?"
      description="You'll need to sign back in to access your account data."
      confirmText="Log out"
      onConfirm={handleLogout}
      icon={<LogOut />}
      isDanger={true}
    />
  );
};

export default Logout;
