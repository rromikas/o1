import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/PersonOutline";
import { useState } from "react";
import UserProfiles from "./userProfiles";

export interface ConfigProps {}

const Config: React.FC<ConfigProps> = () => {
  const menuItems = [{ icon: PersonIcon, title: "User Profiles" }];
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <div className="w-full h-full flex">
      <div className="w-265px border-r border-gray-300 flex-shrink-0">
        <div className="h-60px flex items-center border-b border-gray-300">
          <div className="w-40px flex justify-center flex-shrink-0">
            <MenuIcon></MenuIcon>
          </div>
          <SearchIcon className="text-gray-500 fill-current mr-1"></SearchIcon>
          <input
            type="text"
            spellCheck={false}
            className="outline-none border-none placeholder-gray-500"
            placeholder="Search"
          ></input>
        </div>
        {menuItems.map((x, i) => (
          <div
            key={`config-menu-item-${i}`}
            className={`flex h-34px items-center ${activePageIndex === i ? "bg-gray-200" : ""}`}
          >
            <div className="w-40px flex justify-center">
              <x.icon></x.icon>
            </div>
            <div className="leading-34px">{x.title}</div>
          </div>
        ))}
      </div>
      <div className="flex-grow flex flex-col">
        <div className="h-60px font-bold p-3 flex items-center text-xl border-b border-gray-300">
          User Profiles
        </div>
        <UserProfiles></UserProfiles>
      </div>
    </div>
  );
};

export default Config;
