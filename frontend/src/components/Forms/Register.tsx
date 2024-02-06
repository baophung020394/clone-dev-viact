import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../apis/auth"; // Hàm API để đăng ký
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup"; // Resolver của yup
import * as yup from "yup"; // Thư viện yup để validation
import {
  styledContainer,
  styledHeading,
  styledInput,
  styledPaper,
} from "../../constants/common";

// Schema cho yup để validation
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    if (data) {
      const res = await signUp(data);
      console.log("res", res);
      if (res?.code === 200) history.push("/login");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={styledContainer}
      >
        <Grid item xs={12} style={styledHeading}>
          <Typography component="h4" variant="h4">
            Register Page
          </Typography>
        </Grid>
        <Paper elevation={12} style={styledPaper}>
          <Grid item xs={12} width="100%">
            <TextField
              {...register("username")}
              label="Username"
              fullWidth
              variant="standard"
              placeholder="Username"
              error={errors.username ? true : false}
              helperText={errors.username?.message}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12} width="100%">
            <TextField
              {...register("email")}
              label="Email"
              fullWidth
              variant="standard"
              placeholder="Email"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12} width="100%">
            <TextField
              {...register("password")}
              label="Password"
              fullWidth
              variant="standard"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12} width="100%">
            <TextField
              {...register("confirmPassword")}
              label="Confirm Password"
              fullWidth
              variant="standard"
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12} width="100%">
            <TextField
              {...register("role")}
              label="Role"
              fullWidth
              variant="standard"
              placeholder="Role"
              error={errors.role ? true : false}
              helperText={errors.role?.message}
              style={styledInput}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={Object.keys(errors).length > 0}
            >
              Register
            </Button>
            <Link to="/login">
              <Typography color="blue" style={{ textDecoration: "underline" }}>
                Login
              </Typography>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default Register;
