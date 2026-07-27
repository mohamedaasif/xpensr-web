"use client";
import { Bell } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  isDiscard?: boolean;
  buttonText?: string;
  onClickHandler?: () => void;
}

const Header = ({
  title,
  onClickHandler,
  isDiscard,
  buttonText,
}: HeaderProps) => {
  return (
    <div className={styles["hdr"]}>
      <div className={styles["hdr-row"]}>
        <div className={styles["hdr-title"]}>{title}</div>
        <div className={styles["hdr-acts"]}>
          {/* <button className={styles["btn-s"]}>
            <Bell size={18} />
          </button> */}
          {isDiscard && (
            <button className="btn-secondary" onClick={onClickHandler}>
              Discard
            </button>
          )}
          {buttonText && (
            <button className="btn-primary" onClick={onClickHandler}>
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
