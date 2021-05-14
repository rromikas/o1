import Table from "components/Table";
import moment from "moment";

export interface UsersProps {
  users: Array<{ [index: string]: string | number }>;
  setUsers: Function;
}

const Users: React.FC<UsersProps> = ({ users, setUsers }) => {
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
  return (
    <div>
      <Table
        columns={columns}
        rows={users}
        setRows={setUsers}
        renderToolbarOutside
        editableRow={false}
      ></Table>
    </div>
  );
};

export default Users;
