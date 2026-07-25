"use client";
import styles from "./Settings.module.css";
import Header from "@/app/_components/Header/Header";
import { useState } from "react";

const SettingsHeader = () => {
  const [isEditView, setIsEditView] = useState(false);
  const [active, setActive] = useState("Profile");
  const handleEditProfile = () => {
    console.log("Profile edit");
    setIsEditView(!isEditView);
  };
  const settingsNavigation = [
    "Profile",
    // "Preferences",
    // "Security",
    // "Danger Zone", // !TODO: add other tabs
  ];
  const navHandler = (item: string) => {
    setActive(item);
  };
  return (
    <div>
      <Header
        title={"Settings"}
        onClickHandler={handleEditProfile}
        buttonText={isEditView ? "Save changes" : "Edit"}
      />
      <div className={styles["hdr-tabs"]}>
        {settingsNavigation?.map((item: string, idx: number) => (
          <button
            key={idx}
            onClick={() => navHandler(item)}
            className={
              styles["hdr-tab"] + " " + (active === item ? styles["on"] : "")
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsHeader;
