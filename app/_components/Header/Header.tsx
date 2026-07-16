"use client";
import { Bell } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  buttonText?: string;
  onClickHandler?: () => void;
}

const Header = ({ title, onClickHandler, buttonText }: HeaderProps) => {
  return (
    <div className={styles["hdr"]}>
      <div className={styles["hdr-row"]}>
        <div className={styles["hdr-title"]}>{title}</div>
        <div className={styles["hdr-acts"]}>
          {/* <button className={styles["btn-s"]}>
            <Bell size={18} />
          </button> */}
          {buttonText && (
            <button className={styles["btn-p"]} onClick={onClickHandler}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
