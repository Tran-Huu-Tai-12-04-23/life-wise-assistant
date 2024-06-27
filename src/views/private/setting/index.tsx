import { useState } from "react";
import { BsFillBellFill, BsPersonFill } from "react-icons/bs";
import {
  MdOutlinePrivacyTip,
  MdOutlineSecurity,
  MdSunny,
} from "react-icons/md";
import Account from "./account/index";
import Privacy from "./privacy";
import Theme from "./theme";
import Security from "./security";
import Notification from "./notification";

enum TABS {
  ACCOUNT = "account",
  SECURITY = "security",
  NOTIFICATION = "notification",
  PRIVACY = "privacy",
  THEME = "theme",
}
const tabs = [
  {
    name: "Account",
    value: TABS.ACCOUNT,
    icon: <BsPersonFill />,
  },
  {
    name: "Security",
    value: TABS.SECURITY,
    icon: <MdOutlineSecurity />,
  },
  {
    name: "Notification",
    value: TABS.NOTIFICATION,
    icon: <BsFillBellFill />,
  },
  {
    name: "Privacy",
    value: TABS.PRIVACY,
    icon: <MdOutlinePrivacyTip />,
  },
  {
    name: "Theme",
    value: TABS.THEME,
    icon: <MdSunny />,
  },
];
function Setting() {
  const [activeTab, setActiveTab] = useState(TABS.ACCOUNT);
  return (
    <div className=" w-full flex flex-col ">
      <div className="w-full flex justify-start items-center border-b">
        {tabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex  p-4 pl-6 pr-6  justify-center hover:text-primary items-center gap-2 cursor-pointer ${
              activeTab === tab.value ? "text-primary" : "text-primary/10"
            } ${activeTab === tab.value ? "border-b-2 border-primary" : ""}`}
          >
            {tab.icon}
            <h5>{tab.name}</h5>
          </div>
        ))}
      </div>

      {activeTab === TABS.ACCOUNT && <Account />}
      {activeTab === TABS.PRIVACY && <Privacy />}
      {activeTab === TABS.THEME && <Theme />}
      {activeTab === TABS.NOTIFICATION && <Notification />}
      {activeTab === TABS.SECURITY && <Security />}
    </div>
  );
}

export default Setting;
