import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

interface CustomButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  image?: string;
  position?: "left" | "right";
  onClick?: () => void;
  className: string | "custom-button";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  icon,
  image,
  position = "left",
  onClick,
  className,
  disabled,
}) => {
  return (
    <Box className={className}>
      <Button
        style={{ background: disabled ? "rgb(213, 215, 220)" : "" }}
        type="submit"
        onClick={onClick}
        variant="contained"
        fullWidth
        // disabled={disabled}
      >
        {position === "left" && icon && <IconButton>{icon}</IconButton>}
        {position === "left" && image && <img src={image} alt="Icon" />}
        {children}
        {position === "right" && icon && <IconButton>{icon}</IconButton>}
        {position === "right" && image && <img src={image} alt="Icon" />}
      </Button>
    </Box>
  );
};

export default CustomButton;
