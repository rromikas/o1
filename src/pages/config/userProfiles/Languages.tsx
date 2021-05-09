import Checkbox from "@material-ui/core/Checkbox";
import ArrowDown from "@material-ui/icons/ArrowDownward";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import { useState } from "react";

export interface LanguagesProps {
  languages: { label: string; id: string; checked: boolean }[];
  setLanguages: Function;
}

const Languages: React.FC<LanguagesProps> = ({ languages, setLanguages }) => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState(-1);

  return (
    <div>
      <div className="font-semibold">Languages</div>
      {languages.map((l, i) => (
        <div
          onMouseEnter={() => setHoveredItemIndex(i)}
          onMouseLeave={() => setHoveredItemIndex(-1)}
          key={`lang-${i}`}
          className="flex items-center rounded p-2 hover:bg-gray-200 max-w-xs justify-between"
        >
          <div className="flex items-center">
            <Checkbox
              color="primary"
              checked={l.checked}
              onChange={(e) => {
                let arr = [...languages];
                arr[i].checked = e.target.checked;
                setLanguages(arr);
              }}
            ></Checkbox>
            <div>{l.label}</div>
          </div>
          {hoveredItemIndex === i ? (
            <div className="flex items-center">
              {i < languages.length - 1 ? (
                <div
                  onClick={() => {
                    let arr = [...languages];
                    let nextItem = arr[i + 1];
                    arr[i + 1] = arr[i];
                    arr[i] = nextItem;
                    setLanguages(arr);
                  }}
                  className="flex w-40px h-40px rounded justify-center items-center hover:bg-gray-300 cursor-pointer"
                >
                  <ArrowDown className="text-gray-500 fill-current"></ArrowDown>
                </div>
              ) : null}
              {i > 0 ? (
                <div
                  onClick={() => {
                    let arr = [...languages];
                    let prevItem = arr[i - 1];
                    arr[i - 1] = arr[i];
                    arr[i] = prevItem;
                    setLanguages(arr);
                  }}
                  className="flex w-40px h-40px rounded justify-center items-center hover:bg-gray-300 cursor-pointer"
                >
                  <ArrowUp className="text-gray-500 fill-current"></ArrowUp>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Languages;
