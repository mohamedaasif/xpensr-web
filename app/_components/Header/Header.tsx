"use client";
import { Bell } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  isDiscard?: boolean;
  buttonText?: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  onClickHandler?: () => void;
  handleCancelButton?: () => void;
}

const Header = ({
  title,
  onClickHandler,
  isDiscard,
  type = "button",
  id,
  buttonText,
  handleCancelButton,
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
            <button className="btn-secondary" onClick={handleCancelButton}>
              Discard
            </button>
          )}
          {buttonText && (
            <button
              type={type}
              form={id}
              className={
                !isDiscard ? "!py-[6px] !px-[13px] btn-disabled" : "btn-primary"
              }
              disabled={!isDiscard}
              {...(type !== "submit" && { onClick: onClickHandler })}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
