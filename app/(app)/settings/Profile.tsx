import { ArrowUpFromLine, User } from "lucide-react";
import styles from "./Settings.module.css";
import ProfileForm from "./ProfileForm";
const Profile = ({ user }: { user: any }) => {
  return (
    <div className={styles["set-sec"]}>
      <div className={styles["set-sh"]}>
        <div
          className={styles["set-ico"]}
          style={{ background: "var(--color-ind-bg)" }}
        >
          <User />
        </div>
        <div>
          <div className={styles["set-th"]}>Personal information</div>
          <div className={styles["set-ts"]}>
            Your name, email and contact details
          </div>
        </div>
      </div>
      <div className={styles["set-body"]}>
        <div className="flex items-center gap-3 pb-[14px] border-b-[0.5px] border-[color:var(--color-bdr)]">
          <div className={styles["avatar-circle"]}>
            {(user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")}
          </div>
          <div>
            <div className={styles["prof-name"]}>
              {[user.firstName, user.lastName].filter(Boolean).join(" ")}
            </div>
            <div className="font-[var(--font-ui)] text-[12px] text-[var(--color-ink-3)]">
              {user.email}
            </div>
            <div className="flex gap-1 mt-1">
              <button className={styles["btn-s"]}>
                <ArrowUpFromLine size={13} /> Upload photo
              </button>
              <button className="btn-disabled">Remove</button>
            </div>
          </div>
        </div>
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default Profile;
