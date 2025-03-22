import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

interface CustomDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void; // Accept a string directly
  options: { value: string | number; label: string }[];
  onClear: () => void;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  style?: any;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  onClear,
  error,
  helperText,
  // fullWidth = false,
  style, // Accept the style prop
}) => {
  return (
    <FormControl
      variant="outlined"
      margin="dense"
      error={error}
      // fullWidth={fullWidth}
      sx={{
        mr: 2,
        width: "263px",
        marginRight: "0px",
        height: "48px", // Set height for the FormControl
        ...style, // Apply the style prop
        "& .MuiInputLabel-root": {
          transform: "translate(14px, 14px) scale(1)", // Adjust the label's initial position
        },
        "& .MuiInputLabel-shrink": {
          transform: "translate(14px, -8px) scale(0.75)", // Adjust the label when it shrinks
        },
        "& .MuiOutlinedInput-root": {
          height: "48px", // Set height for the Select input
          padding: "0 8px", // Adjust padding to fit the height
          display: "flex",
          alignItems: "center", // Center the content vertically
        },
      }}
    >
      {/* <InputLabel id={`${label}-label`}>{label}</InputLabel> */}
      <InputLabel>{label}</InputLabel>
      <Select
        // labelId={`${label}-label`}
        // value={value}
        value={value || ""}
        // onChange={onChange}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        endAdornment={
          value && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent the dropdown from opening
                  onClear();
                }}
                sx={{ padding: "4px" }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          )
        }
      >
        <MenuItem value="">
          <em>Select</em>
        </MenuItem>
        {options.map((option) => (
          // <MenuItem key={option.id} value={option.name}>   it is not used  because the id can come if the data comes from APi. or we can send it in future if needed.
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomDropdown;
