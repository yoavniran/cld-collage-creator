import { alpha } from "@mui/material";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const MenuSelect = ({ label, value, onChange, children }) => {
	return (
		<FormControl sx={{ width: "100%" }}>
			<InputLabel>{label}</InputLabel>
			<Select
				sx={{ minWidth: "200px" }}
				label={label}
				value={value}
				onChange={(e) => onChange?.(e.target.value, e)}
				MenuProps={{
					sx: {
						".MuiMenu-paper": ({ palette }) => ({
							background: alpha(palette.background.paper, 0.95),
						}),
					},
				}}
			>
				{children}
			</Select>
		</FormControl>
	);
};

export default MenuSelect


