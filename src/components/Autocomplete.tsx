import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export interface SelectProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  error: boolean | undefined;
  helperText: any;
  value: string;
  setValue: Function;
  required: boolean | undefined;
  fixedOptions: boolean | undefined;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  error = false,
  helperText = null,
  value,
  setValue,
  required = false,
  fixedOptions = false,
}) => {
  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      blurOnSelect
      options={options ? options.map((x) => x.value) : []}
      value={value}
      onChange={(e, value) => {
        if (typeof value === "string") {
          const match = value.match(/add "(.*)"/i);
          if (match && match[1]) {
            setValue(match[1]);
          } else {
            setValue(value);
          }
        }
      }}
      filterOptions={(options, params) => {
        const filtered = options.filter((x) =>
          x.toLowerCase().includes(params.inputValue.toLowerCase())
        );

        if (!fixedOptions) {
          if (!filtered.length && params.inputValue !== "") {
            filtered.push(`Add "${params.inputValue}"`);
          }
        }

        return filtered;
      }}
      getOptionLabel={(opt) => options.find((x) => x.value === opt)?.label || ""}
      renderInput={(params) => (
        <TextField
          name={name}
          required={required}
          error={error}
          helperText={helperText}
          {...params}
          label={label}
        />
      )}
    />
  );
};

export default Select;
