import PersonIcon from "@material-ui/icons/PersonOutline";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import Autocomplete from "components/Autocomplete";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/HelpOutline";
import CheckIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/ErrorOutline";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import * as yup from "yup";

const UserInformation = ({ onSubmit, initialData }: { onSubmit: Function; initialData: any }) => {
  const { values, errors, submitCount, setFieldValue, handleChange, submitForm } = useFormik({
    onSubmit: (val) => {
      onSubmit(val);
    },
    enableReinitialize: true,
    initialValues: {
      photo: "",
      name: "",
      surname: "",
      email: "",
      timeZone: "",
      username: "",
      surname1: "",
      apiToken: "",
      password: "",
      confirmPassword: "",
      persona: "",
      profile: "",
      organization: "default org.",
      status: "active",
      lastSignedIn: 1519211809934,
      ...initialData,
    },
    validationSchema: yup.object().shape({
      photo: yup.string(),
      name: yup.string().required("Required"),
      surname: yup.string(),
      email: yup.string().email().required("Required"),
      timeZone: yup.string().required("Required"),
      username: yup.string().required("Required"),
      surname1: yup.string().required("Required"),
      apiToken: yup.string().required("Required"),
      password: yup.string().test("validate-password", "Invalid password", () => {
        return validatePassword().filter((x) => !x.isValid).length === 0;
      }),
      confirmPassword: yup.string().required("Required"),
      persona: yup.string().required("Required"),
      profile: yup.string().required("Required"),
    }),
  });

  const validatePassword = (): Array<any> => {
    return [
      { label: "Min 8 characters", isValid: values.password.length >= 8 },
      { label: "Upper case letter (A-Z)", isValid: new RegExp("[A-Z]").test(values.password) },
      { label: "Lower case letter (a-z)", isValid: new RegExp("[a-z]").test(values.password) },
      { label: "Numbers (0-9)", isValid: new RegExp("[0-9]").test(values.password) },
      {
        label: "Special Characters (e.g., !@#$%)",
        isValid: new RegExp("\\W").test(values.password),
      },
      {
        label: "Passwords matches",
        isValid: values.password === values.confirmPassword,
      },
    ];
  };

  useEffect(() => {
    ReactDOM.render(
      <Button
        onClick={(e) => submitForm()}
        classes={{ containedPrimary: "bg-blue-400" }}
        color="primary"
        variant="contained"
      >
        Next
      </Button>,
      document.getElementById("create-user-form-btn")
    );

    return () => {
      const target = document.getElementById("create-user-form-btn");
      if (target) {
        ReactDOM.render(<div></div>, target);
      }
    };
  }, [submitForm]);

  const uploadRef = useRef(null as any);

  return (
    <form className="w-full">
      <div className="mb-5">
        <div className="font-bold mb-3">Profile Picture</div>
        <div
          style={{ backgroundImage: `url(${values.photo})` }}
          className=" w-20 h-20 flex items-center justify-center mb-3 border rounded-full border-black bg-center bg-cover"
          onClick={() => uploadRef && uploadRef.current && uploadRef.current.click()}
        >
          <input
            ref={uploadRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length) {
                setFieldValue("photo", URL.createObjectURL(files[0]));
              }
            }}
          ></input>
          {!values.photo ? <PersonIcon fontSize="inherit" className="text-4xl"></PersonIcon> : null}
        </div>
      </div>

      <div className="mb-5">
        <div className="font-bold mb-3">Personal Information</div>
        <div className="flex">
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="name"
              type="text"
              required
              label="First name"
              value={values["name"]}
              error={errors["name"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["name"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="surname"
              type="text"
              label="Surname"
              value={values["surname"]}
              error={errors["surname"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["surname"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="email"
              type="email"
              required
              label="Email"
              value={values["email"]}
              error={errors["email"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["email"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3 pr-3">
            <Autocomplete
              options={[
                { label: "GMT + 02:00", value: "GMT + 02:00" },
                { label: "GMT + 03:00", value: "GMT + 03:00" },
                { label: "GMT + 04:00", value: "GMT + 04:00" },
              ]}
              fixedOptions={false}
              name="timeZone"
              required
              label="Timezone"
              value={values["timeZone"]}
              error={errors["timeZone"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["timeZone"] : null}
              setValue={(val: string) => setFieldValue("timeZone", val)}
            ></Autocomplete>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="username"
              type="text"
              required
              label="User name"
              value={values["username"]}
              error={errors["username"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["username"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="surname1"
              type="text"
              required
              label="Surname"
              value={values["surname1"]}
              error={errors["surname1"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["surname1"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3">
            <TextField
              fullWidth
              name="apiToken"
              type="text"
              required
              label="API Token"
              value={values["apiToken"]}
              error={errors["apiToken"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["apiToken"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="password"
              type="password"
              required
              label="Password"
              value={values["password"]}
              error={errors["password"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["password"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3 pr-3">
            <TextField
              fullWidth
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={values["confirmPassword"]}
              error={errors["confirmPassword"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["confirmPassword"] : null}
              onChange={handleChange}
            ></TextField>
          </div>
          <div className="w-1/3 mb-3 pr-3 flex justify-start items-center">
            <Tooltip
              placement="right-start"
              classes={{ tooltip: "bg-white shadow-md text-black text-sm" }}
              className="p-0"
              title={
                <div>
                  {validatePassword().map((x, i) => (
                    <div className="flex items-center">
                      {!x.isValid ? (
                        <WarningIcon className="mr-1 text-yellow-500"></WarningIcon>
                      ) : (
                        <CheckIcon className="mr-1 text-green-400"></CheckIcon>
                      )}
                      <div>{x.label}</div>
                    </div>
                  ))}
                </div>
              }
            >
              <HelpIcon></HelpIcon>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="font-bold mb-3">Persona & Profile</div>
        <div className="flex">
          <div className="w-1/3 mb-3 pr-3">
            <Autocomplete
              options={[
                { label: "Admin", value: "admin" },
                { label: "Executives", value: "executives" },
                { label: "Steward", value: "steward" },
                { label: "Author", value: "author" },
                { label: "User", value: "user" },
              ]}
              fixedOptions={false}
              name="persona"
              required
              label="Persona"
              value={values["persona"]}
              error={errors["persona"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["persona"] : null}
              setValue={(val: string) => setFieldValue("persona", val)}
            ></Autocomplete>
          </div>
          <div className="w-1/3 mb-3 pr-3">
            <Autocomplete
              options={[
                { label: "Default profile", value: "default" },
                { label: "Other profile", value: "other" },
              ]}
              fixedOptions={false}
              name="timeZone"
              required
              label="Profile"
              value={values["profile"]}
              error={errors["profile"] && submitCount > 0 ? true : false}
              helperText={submitCount > 0 ? errors["profile"] : null}
              setValue={(val: string) => setFieldValue("profile", val)}
            ></Autocomplete>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserInformation;
