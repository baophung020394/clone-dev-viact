import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface InputPhoneProps {
  countryCode?: string;
  phoneNumber?: string;
  onChangeCountryCode?: (event: SelectChangeEvent<string>) => void;
  onChangePhoneNumber?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const countries = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+81", name: "Japan" },
  { code: "+84", name: "Viet Nam" },
];

const InputPhone: React.FC<InputPhoneProps> = ({
  countryCode,
  phoneNumber,
  onChangeCountryCode,
  onChangePhoneNumber,
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="country-code-label">Country Code</InputLabel>
        <Select
          labelId="country-code-label"
          id="country-code-select"
          value={countryCode || ""}
          onChange={onChangeCountryCode}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {`${country.name} (${country.code})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={onChangePhoneNumber}
        style={{ marginTop: "16px" }}
      />
    </div>
  );
};

export default InputPhone;
