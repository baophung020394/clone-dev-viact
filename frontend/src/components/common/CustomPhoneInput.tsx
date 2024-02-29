import { Box, Typography } from "@mui/material";
import React from "react";
import { Controller, DeepMap, FieldError, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomPhoneInputProps {
  name: string;
  control?: any;
  errors?: DeepMap<FieldValues, FieldError>;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  name,
  control,
  errors,
  ...props
}) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: "4px",
        position: "relative",
        padding: "16px",
        maxHeight: "53px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        "& .react-tel-input .flag-dropdown": {
          border: "none",
        },
        "& .search-custom": {
          "& .search-emoji": {
            display: "none",
          },
          "& .search-box": {
            width: "95%",
            height: "40px",
            marginLeft: 0,
          },
        },
      }}
    >
      <Typography
        fontSize={11}
        color={"#898989"}
        component={"span"}
        sx={{
          position: "absolute",
          top: "-8px",
          left: "8px",
          zIndex: 1,
          backgroundColor: "#fff",
          padding: "0 8px",
        }}
      >
        Phone
      </Typography>
      <Controller
        defaultValue=""
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            {...props}
            country={"vn"}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            inputStyle={{
              border: "none",
            }}
            enableSearch
            searchClass="search-custom"
            onBlur={field.onBlur}

            // error={!!errors?.[name]}
          />
        )}
      />
    </Box>
  );
};

export default CustomPhoneInput;
