import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/PersonOutline";
import AccountsIcon from "@material-ui/icons/PeopleOutline";
import { useState } from "react";
import UserProfiles from "./userProfiles";
import Accounts from "./accounts";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface ConfigProps {}

const Config: React.FC<ConfigProps> = () => {
  const menuItems = [
    { icon: AccountsIcon, title: "Accounts", page: Accounts },
    { icon: PersonIcon, title: "User Profiles", page: UserProfiles },
  ];
  const [activePageIndex, setActivePageIndex] = useState(0);

  const Page = menuItems[activePageIndex].page;
  const Title = menuItems[activePageIndex].title;

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
          <ButtonBase
            onClick={() => setActivePageIndex(i)}
            key={`config-menu-item-${i}`}
            className={`cursor-pointer outline-none w-full justify-start flex h-34px hover:bg-gray-200 items-center ${
              activePageIndex === i ? "bg-gray-200" : ""
            }`}
          >
            <div className="w-40px flex justify-center">
              <x.icon></x.icon>
            </div>
            <div className="leading-34px">{x.title}</div>
          </ButtonBase>
        ))}
      </div>
      <Page></Page>
    </div>
  );
};

export default Config;
