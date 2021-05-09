import { useState } from "react";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import SortSearchHeader from "components/SortSearchHeader";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

type settingsNode = {
  label: string;
  visualizationLevel: string;
  id: number;
  items: settingsNode[];
};

const RecursiveNode = ({
  node,
  depth,
  path,
  setVisualizationLevel,
  search,
}: {
  node: settingsNode;
  depth: number;
  path: string;
  setVisualizationLevel: Function;
  search: { [index: string]: string };
}) => {
  const [expand, setExpand] = useState(true);
  const visualizationLevels = [
    "Structure Unit",
    "Organization",
    "Line of Business",
    "Application",
    "Full detail",
  ];

  const showNode =
    node.label.toLowerCase().includes(search["organization"].toLowerCase()) &&
    node.visualizationLevel.toLowerCase().includes(search["visualizationLevel"].toLowerCase());

  return (
    <>
      {showNode ? (
        <div
          className="flex justify-between h-40px items-center border-b-2 border-gray-300 hover:bg-gray-100"
          style={{ paddingLeft: depth * 20 }}
        >
          <div className="flex items-center" onClick={() => setExpand((prev) => !prev)}>
            <ArrowDown
              className="transition"
              style={{ transform: !expand ? "rotate(-90deg)" : "rotate(0)" }}
            ></ArrowDown>
            <div className=" max-w-xs truncate">{node.label}</div>
          </div>
          <div className="w-56">
            <Select
              fullWidth
              value={node.visualizationLevel}
              onChange={(event) => setVisualizationLevel(event.target.value, path)}
            >
              {visualizationLevels.map((level, i) => (
                <MenuItem key={`viz-lvl-${i}`} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      ) : null}

      <Collapse in={expand}>
        {node.items.map((n: settingsNode, i: number) => (
          <RecursiveNode
            key={`${depth}-node-${i}`}
            depth={depth + 1}
            node={n}
            path={path + "/items/" + n.id}
            setVisualizationLevel={setVisualizationLevel}
            search={search}
          ></RecursiveNode>
        ))}
      </Collapse>
    </>
  );
};

export interface SettingsProps {
  settings: settingsNode[];
  setVisualizationLevel: Function;
}

const Settings: React.FC<SettingsProps> = ({ settings, setVisualizationLevel }) => {
  const [sort, setSort] = useState({ key: "", order: "none" } as { key: string; order: string });
  const [search, setSearch] = useState({ organization: "", visualizationLevel: "" } as {
    [index: string]: string;
  });

  return (
    <div className="min-w-748px">
      <div className="flex justify-between border-b-2 border-gray-300 pb-3">
        <SortSearchHeader
          label="Organization Name"
          disableSort
          setSearch={(s: string) => setSearch((prev) => ({ ...prev, organization: s }))}
          search={search["organization"] || ""}
        ></SortSearchHeader>
        <div className="w-56">
          <SortSearchHeader
            label="Visualization Level"
            disableSort
            setSearch={(s: string) => setSearch((prev) => ({ ...prev, visualizationLevel: s }))}
            search={search["visualizationLevel"] || ""}
          ></SortSearchHeader>
        </div>
      </div>
      {settings.map((n: settingsNode, i: number) => (
        <RecursiveNode
          key={`0-node-${i}`}
          depth={0}
          node={n}
          path={n.id.toString()}
          setVisualizationLevel={setVisualizationLevel}
          search={search}
        ></RecursiveNode>
      ))}
    </div>
  );
};

export default Settings;
