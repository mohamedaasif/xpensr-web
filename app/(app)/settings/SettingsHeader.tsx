"use client";
import styles from "./Settings.module.css";
import Header from "@/app/_components/Header/Header";
import { useState } from "react";

const SettingsHeader = ({ user, form }: { user: any; form: any }) => {
  const {
    reset,
    formState: { isDirty, isSubmitting },
  } = form;
  const [active, setActive] = useState("Profile");
  const handleEditProfile = () => {
    console.log("Profile edit");
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

  const handleCancelButton = () => {
    if (!user) return;

    reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      dob: user.dob ? new Date(user.dob) : undefined,
    });
  };

  return (
    <div>
      <Header
        title={"Settings"}
        onClickHandler={handleEditProfile}
        isDiscard={isDirty}
        isDisabled={!isDirty}
        handleCancelButton={handleCancelButton}
        buttonText={"Save changes"}
        type={"submit"}
        id={"profile-form"}
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
