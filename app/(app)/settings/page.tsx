import { getProfile } from "@/app/_lib/services/profile.service";
import SettingsClient from "./Settings";

const Settings = async () => {
  const user = await getProfile();

  return (
    <div className="w-full">
      <SettingsClient user={user} />
    </div>
  );
};

export default Settings;
