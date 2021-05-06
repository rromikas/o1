import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

export interface UserProfilesProps {}

const UserProfiles: React.FC<UserProfilesProps> = () => {
  const [accounts, setAccounts] = useState([{}]);
  const menuItems = ["Settings", "Users", "Hierarchy Labels", "Languages"];
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <div className="flex w-full flex-grow">
      <div className="w-265px border-r border-gray-300">
        <div className="h-48px flex items-center border-b border-gray-300 px-2">
          <SearchIcon className="text-gray-500 fill-current mr-1"></SearchIcon>
          <input
            type="text"
            spellCheck={false}
            className="outline-none border-none placeholder-gray-500"
            placeholder="Search"
          ></input>
        </div>
      </div>
      <div className="flex-grow">
        <div className="h-48px border-b border-gray-300 flex">
          {menuItems.map((x, i) => (
            <div
              onClick={() => setActivePageIndex(i)}
              className={`${
                activePageIndex === i
                  ? "border-blue-400 text-blue-400"
                  : " text-gray-400 border-transparent"
              } border-b-2 p-t-4 px-4 leading-48px font-semibold cursor-pointer select-none`}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
