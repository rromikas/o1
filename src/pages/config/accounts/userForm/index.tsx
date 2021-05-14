import Modal from "@material-ui/core/Modal";
import Stepper from "components/Stepper";
import React, { useState } from "react";
import UserInformation from "./UserInfomation";
import OrganizationalRoles from "./OrganizationalRoles";
import { settings } from "data";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";

export interface UserFormProps {
  onSubmit: Function;
  open: boolean;
  onClose: Function;
  editAccount: any;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, open, onClose, editAccount }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [account, setAccount] = useState<any>({ settings });

  const setLowestRoleId = (value: string, roleId: number, path: string) => {
    const paths = path.split("/");

    let obj = JSON.parse(JSON.stringify(account.settings));
    let clone = obj;
    for (let i = 0; i < paths.length - 1; i++) {
      obj = obj[paths[i]];
    }

    const lastPath = paths[paths.length - 1];
    obj[lastPath].lowestRoleId = !value ? 0 : roleId;

    setAccount((prev: any) => ({ ...prev, settings: clone }));
  };

  useEffect(() => {
    if (editAccount) {
      setAccount((prev: any) => ({ ...prev, ...editAccount }));
    } else {
      setAccount({ settings });
    }
  }, [editAccount]);

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
    }
  }, [open]);

  return (
    <Modal open={open}>
      <div className="w-full h-full bg-black bg-opacity-30 flex overflow-auto p-5">
        <div className="m-auto max-w-1200px w-full bg-white p-7">
          <div className="mb-5 flex justify-between">
            <div>
              <div className="font-bold text-xl mb-1">Create user</div>
              <div>Follow the simple 2 steps to create a user</div>
            </div>
            <div className="cursor-pointer" onClick={() => onClose()}>
              ✕
            </div>
          </div>
          <div className="flex">
            <Stepper
              labelsPosition="left"
              navigable={false}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              steps={[
                {
                  label: "User Information",
                  comment: "Enter the personal, persona & profile details",
                },
                {
                  label: "Organization Roles",
                  comment: "Provide access to LE/LOB/Org",
                },
              ]}
            ></Stepper>
            <div className="flex-grow flex">
              <div className="overflow-auto flex-grow w-0 flex">
                {activeStep === 0 ? (
                  <UserInformation
                    initialData={account}
                    onSubmit={(values: any) => {
                      setAccount((prev: any) => ({ ...prev, ...values }));
                      setActiveStep(1);
                    }}
                  ></UserInformation>
                ) : (
                  <OrganizationalRoles
                    accountSettings={account.settings}
                    setLowestRoleId={setLowestRoleId}
                  ></OrganizationalRoles>
                )}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div id="create-user-form-btn" className="flex justify-end"></div>
            {activeStep === 1 ? (
              <div className="flex justify-end">
                <Button
                  color="primary"
                  variant="outlined"
                  className="mr-3"
                  onClick={() => setActiveStep(0)}
                >
                  Back
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    onSubmit(account);
                    setAccount({ settings });
                  }}
                >
                  Create
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserForm;
