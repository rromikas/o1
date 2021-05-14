import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ReactDOM from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TablePagination from "@material-ui/core/TablePagination";

export interface TableProps<ObjectType> {
  columns: Array<{
    headerName: string;
    id: string;
    valueGetter?: Function;
    minWidth?: number;
  }>;
  onCreate?: Function;
  onEdit?: Function;
  rows: Array<ObjectType>;
  defaultPageSize?: number;
  renderToolbarOutside?: boolean;
  deletableRow?: boolean;
  editableRow?: boolean;
  setRows: Function;
  addIsAdd?: boolean;
  paginationPosition?: "bottom" | "top";
}

const Table = <T extends { [index: string]: string | number | boolean }>({
  columns,
  rows,
  defaultPageSize = 10,
  renderToolbarOutside = false,
  editableRow = true,
  deletableRow = true,
  setRows,
  addIsAdd = true,
  paginationPosition = "bottom",
  onCreate = () => {},
  onEdit = () => {},
}: TableProps<T>) => {
  const [search, setSearch] = useState({} as { [index: string]: string });
  const [sort, setSort] = useState(null as null | { by: string; asc: boolean });
  const [identifiedRows, setIdentifiedRows] = useState([] as Array<T>);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([] as Array<number>);
  const [pageSize, setPageSize] = useState(10);

  let filtered = [...identifiedRows];

  Object.keys(search).forEach((k) => {
    filtered = filtered.filter((x) =>
      x[k] ? x[k].toString().toLowerCase().includes(search[k].toLowerCase()) : false
    );
  });

  if (sort) {
    filtered.sort((a, b) =>
      a[sort.by] > b[sort.by]
        ? sort.asc
          ? 1
          : -1
        : a[sort.by] < b[sort.by]
        ? sort.asc
          ? -1
          : 1
        : 0
    );
  }

  useEffect(() => {
    setPageSize(defaultPageSize);
  }, [defaultPageSize]);

  useEffect(() => {
    setIdentifiedRows(rows.map((x, i) => ({ ...x, id: i })));
  }, [rows]);

  useEffect(() => {
    if (renderToolbarOutside) {
      const handleDelete = () => {
        let newRows = JSON.parse(JSON.stringify(identifiedRows));
        selectedRows.forEach((x) => {
          let index = newRows.findIndex((r: T) => r.id === x);
          newRows.splice(index, 1);
        });

        setRows(newRows);
        setSelectedRows([]);
      };

      const Toolbar = () => {
        return (
          <div className="flex items-center">
            {selectedRows.length ? (
              <div onClick={handleDelete} className="items-center flex mr-3 cursor-pointer">
                <DeleteIcon className="mr-1"></DeleteIcon> Delete
              </div>
            ) : null}
            <div className="items-center flex cursor-pointer" onClick={() => onCreate()}>
              <AddIcon className="mr-1"></AddIcon> {addIsAdd ? "Add" : "Create"}
            </div>
          </div>
        );
      };
      ReactDOM.render(<Toolbar></Toolbar>, document.getElementById("table-toolbar"));

      return () => {
        const node = document.getElementById("table-toolbar");
        if (node) {
          ReactDOM.unmountComponentAtNode(node);
        }
      };
    }
  }, [selectedRows, identifiedRows, setRows]);

  const handleDelete = (id: number) => {
    let newRows = JSON.parse(JSON.stringify(identifiedRows));
    const deleteIndex = newRows.findIndex((x: any) => x.id === id);
    newRows.splice(deleteIndex, 1);
    setRows(newRows);
  };

  return (
    <div className="w-full">
      <style>
        {`td{
          padding: 10px 10px;
        }

         .row-toolbox{
           visibility: hidden;
         }

         .table-row:hover .row-toolbox{
          visibility: visible;
         }

        `}
      </style>
      {paginationPosition === "top" ? (
        <div className="h-60px p-3 flex items-center justify-end  border-b border-gray-300">
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onChangePage={(ev: any, page: number) => setPage(page)}
            rowsPerPage={pageSize}
            onChangeRowsPerPage={(ev: any) => setPageSize(ev.target.value)}
          />
        </div>
      ) : null}
      <table className="w-full">
        <tr className="border-b border-gray-300">
          <td>
            <Checkbox
              color="primary"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRows(identifiedRows.map((x) => x.id as number));
                } else {
                  setSelectedRows([]);
                }
              }}
              value={selectedRows.length > 0 && selectedRows.length === filtered.length}
            ></Checkbox>
          </td>
          {columns.map((c, i) => (
            <td
              key={`table-header-${i}`}
              className="py-3"
              style={{ minWidth: c.minWidth ? c.minWidth : 0 }}
            >
              <div className="flex text-gray-600">
                <div className="mr-2 font-medium text-lg whitespace-nowrap">{c.headerName}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSort((prev) =>
                      prev && !prev.asc
                        ? null
                        : { by: c.id, asc: prev ? (prev.by === c.id ? false : true) : true }
                    );
                  }}
                >
                  <ArrowDropUpIcon
                    className={`-mb-4 block ${
                      sort && sort.by === c.id && !sort.asc ? "text-blue-400 fill-current" : ""
                    }`}
                  ></ArrowDropUpIcon>
                  <ArrowDropDownIcon
                    className={`-mt-4 block ${
                      sort && sort.by === c.id && sort.asc ? "text-blue-400 fill-current" : ""
                    }`}
                  ></ArrowDropDownIcon>
                </div>
              </div>
              <input
                spellCheck={false}
                value={search[c.id] ? search[c.id] : ""}
                onChange={(e) => {
                  e.persist();
                  setSearch((prev) => ({ ...prev, [c.id]: e.target.value }));
                }}
                type="text"
                placeholder="Search"
                className="border border-gray-500 rounded focus:outline-none px-2 py-1"
              ></input>
            </td>
          ))}
          <td className="w-20"></td>
        </tr>
        {filtered.slice(page * pageSize, page * pageSize + pageSize).map((r, ri) => (
          <tr className="h-60px border-b border-gray-300 hover:bg-gray-200 table-row">
            <td>
              <Checkbox
                color="primary"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows((prev) => [...prev, r.id as number]);
                  } else {
                    setSelectedRows((prev) => {
                      let arr = [...prev];
                      let index = arr.findIndex((x) => x === r.id);
                      arr.splice(index, 1);
                      return arr;
                    });
                  }
                }}
                checked={selectedRows.includes(r.id as number)}
              ></Checkbox>
            </td>
            {columns.map((c, ci) => (
              <td key={`row-${ri}-col-${ci}`}>
                {c.valueGetter ? c.valueGetter(r[c.id]) : r[c.id]}
              </td>
            ))}
            <td className="w-20">
              <div className="row-toolbox flex items-center justify-center">
                {editableRow ? (
                  <div
                    onClick={() => onEdit(r.id as number)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-300 mr-3 cursor-pointer"
                  >
                    <EditIcon className="text-gray-600"></EditIcon>
                  </div>
                ) : null}
                {deletableRow ? (
                  <div
                    onClick={() => handleDelete(r.id as number)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-300 cursor-pointer"
                  >
                    <DeleteIcon className="text-gray-600"></DeleteIcon>
                  </div>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </table>
      {paginationPosition === "bottom" ? (
        <div className="h-60px p-3 flex items-center justify-end">
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onChangePage={(ev: any, page: number) => setPage(page)}
            rowsPerPage={pageSize}
            onChangeRowsPerPage={(ev: any) => setPageSize(ev.target.value)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Table;
