import Profile from "./Profile";
import SettingsHeader from "./SettingsHeader";

const SettingsClient = ({ user }: { user: any }) => {
  return (
    <div>
      <SettingsHeader />
      <div className="p-5">
        <Profile user={user} />
      </div>
    </div>
  );
};

export default SettingsClient;
