import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export interface CustomSelectProps {
  value: string | number;
  items: Array<string> | Array<number>;
  onChange: Function;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, items, onChange }) => {
  return (
    <FormControl size="small" variant="outlined">
      <Select
        classes={{ select: "pl-3" }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e: any) => onChange(e)}
      >
        {items.map((x: string | number, i: number) => (
          <MenuItem key={`viz-lvl-${i}`} value={i}>
            {x}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
