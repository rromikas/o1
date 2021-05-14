import Table from "components/Table";
import { users } from "data";
import { useState } from "react";
import moment from "moment";
import UserForm from "./userForm";

export interface AccountsProps {}

const Accounts: React.FC<AccountsProps> = () => {
  const [accounts, setAccounts] = useState(users);
  const [editAccountIndex, setEditAccountIndex] = useState(-1);
  const columns = [
    { headerName: "Username", id: "username" },
    { headerName: "Name", id: "name" },
    {
      headerName: "Status",
      id: "status",
      valueGetter: (val: string) => (
        <div
          className={`${
            val === "active" ? "bg-green-500" : "bg-blue-400"
          } text-white capitalize text-xs px-3 py-1 rounded text-center max-w-60px`}
        >
          {val}
        </div>
      ),
    },
    { headerName: "Organization", id: "organization" },
    {
      headerName: "Last Signed In",
      id: "lastSignedIn",
      valueGetter: (val: string) => moment.unix(+val / 1000).fromNow(),
      minWidth: 200,
    },
  ];

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="flex-grow flex flex-col w-0">
      <div className="h-60px p-3 flex items-center justify-between  border-b border-gray-300 flex-shrink-0">
        <div className="text-xl font-bold">Accounts</div>
        <div id="table-toolbar" className="flex items-center"></div>
      </div>
      <UserForm
        editAccount={editAccountIndex >= 0 ? accounts[editAccountIndex] : null}
        onClose={() => {
          setOpenForm(false);
          setEditAccountIndex(-1);
        }}
        open={openForm}
        onSubmit={(newAcc: any) => {
          if (newAcc.id) {
            setAccounts((prev) => {
              let arr = [...prev];
              arr[newAcc.id] = newAcc;
              return arr;
            });
          } else {
            setAccounts((prev) => [newAcc, ...prev]);
          }

          setOpenForm(false);
        }}
      ></UserForm>
      <div className="flex w-full overflow-auto">
        <Table
          onEdit={(id: number) => {
            setEditAccountIndex(id);
            setOpenForm(true);
          }}
          onCreate={() => setOpenForm(true)}
          paginationPosition="top"
          columns={columns}
          rows={accounts}
          setRows={setAccounts}
          renderToolbarOutside
          addIsAdd={false}
        ></Table>
      </div>
    </div>
  );
};

export default Accounts;
