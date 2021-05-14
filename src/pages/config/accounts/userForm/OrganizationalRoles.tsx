import { useState } from "react";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import SortSearchHeader from "components/SortSearchHeader";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

type organizationalRoleNode = {
  label: string;
  lowestRoleId: number;
  id: number;
  items: organizationalRoleNode[];
};

const RecursiveNode = ({
  node,
  depth,
  path,
  setLowestRoleId,
  search,
  roles,
}: {
  node: organizationalRoleNode;
  depth: number;
  path: string;
  setLowestRoleId: Function;
  search: string;
  roles: Array<{ id: number; label: string }>;
}) => {
  const [expand, setExpand] = useState(true);

  const showNode = node.label.toLowerCase().includes(search.toLowerCase());
  return (
    <>
      {showNode ? (
        <div className="flex h-40px items-center border-b-2 border-gray-300 hover:bg-gray-100">
          <div
            className="flex items-center flex-shrink-0 w-500px"
            style={{ paddingLeft: depth * 20 }}
            onClick={() => setExpand((prev) => !prev)}
          >
            <ArrowDown
              className="transition"
              style={{ transform: !expand ? "rotate(-90deg)" : "rotate(0)" }}
            ></ArrowDown>
            <div className="flex-grow w-0 truncate">{node.label}</div>
          </div>
          <div className="flex-grow flex justify-end">
            {roles.map((x, i) => (
              <div className="w-32" key={`${path}-role-${i}`}>
                <Switch
                  color="primary"
                  checked={node.lowestRoleId ? node.lowestRoleId <= x.id : false}
                  onChange={(e) => {
                    setLowestRoleId(e.target.checked, x.id, path);
                  }}
                ></Switch>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Collapse in={expand} classes={{ wrapperInner: "w-auto" }}>
        {node.items.map((n: organizationalRoleNode, i: number) => (
          <RecursiveNode
            roles={roles}
            key={`${depth}-node-${i}`}
            depth={depth + 1}
            node={n}
            path={path + "/items/" + n.id}
            setLowestRoleId={setLowestRoleId}
            search={search}
          ></RecursiveNode>
        ))}
      </Collapse>
    </>
  );
};
export interface OrganizationalRolesProps {
  accountSettings: organizationalRoleNode[];
  setLowestRoleId: Function;
}

const OrganizationalRoles: React.FC<OrganizationalRolesProps> = ({
  setLowestRoleId,
  accountSettings,
}) => {
  const [search, setSearch] = useState("" as string);
  const roles = [
    { id: 1, label: "User" },
    { id: 2, label: "Author" },
    { id: 3, label: "Steward" },
    { id: 4, label: "Executives" },
    { id: 5, label: "Admin" },
  ];

  return (
    <div>
      <div className="flex">
        <div className="w-500px flex-shrink-0 flex">
          <SortSearchHeader
            label="Organization Name"
            disableSort
            setSearch={setSearch}
            search={search}
          ></SortSearchHeader>
        </div>
        <div className="flex-grow flex justify-end items-center">
          {roles.map((r, i) => (
            <div key={`role-header-${i}`} className="w-32 px-3 text-lg font-medium">
              {r.label}
            </div>
          ))}
        </div>
      </div>
      {accountSettings.map((n: organizationalRoleNode, i: number) => (
        <RecursiveNode
          key={`0-node-${i}`}
          roles={roles}
          depth={0}
          node={n}
          path={n.id.toString()}
          setLowestRoleId={setLowestRoleId}
          search={search}
        ></RecursiveNode>
      ))}
    </div>
  );
};

export default OrganizationalRoles;
