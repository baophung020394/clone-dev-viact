import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface CustomTextFieldProps
  extends Omit<TextFieldProps, "name" | "defaultValue"> {
  name: string;
  control: any;
  errors?: DeepMap<FieldValues, FieldError>;
  register?: UseFormRegister<any>;
  borderColor?: string;
  isAutofocus?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  control,
  errors,
  borderColor,
  isAutofocus,
  ...props
}) => {
  return (
    <Controller
      defaultValue=""
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          autoFocus={isAutofocus}
          error={!!errors?.[name]}
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "12px",
            },
            "& .MuiInputBase-root": {
              height: 53,
              "& fieldset": {
                border: `1px solid ${borderColor || "#4B4C4C"}`,
              },
            },
          }}
        />
      )}
    />
  );
};

export default CustomTextField;
