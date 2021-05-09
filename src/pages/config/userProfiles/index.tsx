import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import Users from "./Users";
import HierarchyLabels from "./HierarchyLabels";
import Languages from "./Languages";
import Settings from "./Settings";
import { users, hierarchyLabels, languages, accounts as accData, settings } from "data";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export interface UserProfilesProps {}

const UserProfiles: React.FC<UserProfilesProps> = () => {
  const [accounts, setAccounts] = useState(
    accData.map((x) => ({
      ...x,
      languages: JSON.parse(JSON.stringify(languages)),
      hierarchyLabels: JSON.parse(JSON.stringify(hierarchyLabels)),
      users: JSON.parse(JSON.stringify(users)),
      settings: JSON.parse(JSON.stringify(settings)),
    }))
  );

  const [search, setSearch] = useState("");

  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const menuItems = ["Settings", "Users", "Hierarchy Labels", "Languages"];
  const [activePageIndex, setActivePageIndex] = useState(0);
  const pages = [Settings, Users, HierarchyLabels, Languages];
  const Page = pages[activePageIndex];

  const setLanguages = (newLang: any) => {
    setAccounts((prev) => {
      let arr = [...prev];
      arr[selectedAccountIndex].languages = newLang;
      return arr;
    });
  };

  const setUsers = (
    newUsers: {
      username: string;
      name: string;
      status: string;
      organization: string;
      lastSignedIn: string;
    }[]
  ) => {
    setAccounts((prev) => {
      let arr = [...prev];
      arr[selectedAccountIndex].users = newUsers;
      return arr;
    });
  };

  const setLabel = (
    newLabel: { default: string; display: string; checked: boolean },
    index: number
  ) => {
    setAccounts((prev) => {
      let arr = [...prev];
      arr[selectedAccountIndex].hierarchyLabels[index] = newLabel;
      return arr;
    });
  };

  const setVisualizationLevel = (value: string, path: string) => {
    const paths = path.split("/");

    let obj = JSON.parse(JSON.stringify(accounts[selectedAccountIndex].settings));
    let clone = obj;
    for (let i = 0; i < paths.length - 1; i++) {
      obj = obj[paths[i]];
    }

    const lastPath = paths[paths.length - 1];
    obj[lastPath].visualizationLevel = value;

    setAccounts((prev) => {
      let arr = [...prev];
      arr[selectedAccountIndex].settings = clone;
      return arr;
    });
  };

  return (
    <div className="flex w-full flex-grow">
      <div className="w-265px border-r border-gray-300 flex-shrink-0 flex flex-col">
        <div className="h-48px flex items-center border-b border-gray-300 px-2">
          <SearchIcon className="text-gray-500 fill-current mr-1"></SearchIcon>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            spellCheck={false}
            className="outline-none border-none placeholder-gray-500"
            placeholder="Search"
          ></input>
        </div>
        <div className="flex-grow overflow-auto h-0">
          {accounts
            .filter((x) => {
              const reg = new RegExp(search, "i");
              return x.title.match(reg) || x.description.match(reg);
            })
            .map((acc, i) => (
              <div
                onClick={() => setSelectedAccountIndex(i)}
                key={`acc-${i}`}
                className={`p-3 cursor-default hover:bg-gray-200 ${
                  selectedAccountIndex === i ? "bg-gray-200" : ""
                }`}
              >
                <div className="text-lg font-medium">{acc.title}</div>
                <div className="text-xs line-clamp-1">{acc.description}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex-grow flex flex-col w-0">
        <div className="h-48px border-b border-gray-300 flex justify-between">
          <div className="flex items-center pl-1 xl:hidden">
            <FormControl size="small" variant="outlined">
              <Select
                classes={{ select: "pl-3" }}
                fullWidth
                variant="outlined"
                value={activePageIndex}
                onChange={(event) => setActivePageIndex(event.target.value as number)}
              >
                {menuItems.map((x, i) => (
                  <MenuItem key={`viz-lvl-${i}`} value={i}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="xl:flex hidden">
            {menuItems.map((x, i) => (
              <div
                key={`userProfiles-menu-item-${i}`}
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
          <div id="table-toolbar" className="flex items-center px-3"></div>
        </div>
        <div className="flex-grow overflow-auto h-0 p-4">
          <Page
            setVisualizationLevel={setVisualizationLevel}
            settings={accounts[selectedAccountIndex].settings}
            setLanguages={setLanguages}
            languages={accounts[selectedAccountIndex].languages}
            setLabel={setLabel}
            labels={accounts[selectedAccountIndex].hierarchyLabels}
            users={accounts[selectedAccountIndex].users}
            setUsers={setUsers}
          ></Page>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
