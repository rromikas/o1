import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export interface SortSearchHeaderProps {
  setSort?: Function;
  setSearch: Function;
  sort?: string;
  search: string;
  label: string;
  disableSort?: boolean;
}

const SortSearchHeader: React.FC<SortSearchHeaderProps> = ({
  label,
  setSort = () => {},
  setSearch,
  sort,
  search,
  disableSort = false,
}) => {
  return (
    <div>
      <div className="flex text-gray-600">
        <div className="mr-2 font-medium text-lg">{label}</div>
        {!disableSort ? (
          <div
            className="cursor-pointer"
            onClick={() => {
              setSort(sort === "none" ? "asc" : sort === "asc" ? "desc" : "none");
            }}
          >
            <ArrowDropUpIcon
              className={`-mb-4 block ${sort === "asc" ? "text-blue-400 fill-current" : ""}`}
            ></ArrowDropUpIcon>
            <ArrowDropDownIcon
              className={`-mt-4 block ${sort === "desc" ? "text-blue-400 fill-current" : ""}`}
            ></ArrowDropDownIcon>
          </div>
        ) : null}
      </div>
      <input
        spellCheck={false}
        value={search}
        onChange={(e) => {
          e.persist();
          setSearch(e.target.value);
        }}
        type="text"
        placeholder="Search"
        className="border border-gray-500 rounded focus:outline-none px-2 py-1"
      ></input>
    </div>
  );
};

export default SortSearchHeader;
