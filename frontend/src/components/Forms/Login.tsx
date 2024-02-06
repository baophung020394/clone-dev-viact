import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signIn } from "../../apis/auth";
import {
  RESPONSE_MESSAGE,
  styledContainer,
  styledHeading,
  styledInput,
  styledPaper,
} from "../../constants/common";
import { useUser } from "../../context/AuthContext";

interface LoginForm {
  username: string;
  password: string;
}

// Schema validation sử dụng yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema) });
  const { setUserContext } = useUser();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarError = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const onSubmit = async (data: LoginForm) => {
    if (data) {
      const res = await signIn(data.username, data.password);
      if (res?.code === 400 && res?.message === RESPONSE_MESSAGE.LOGINGAIL) {
        handleSnackbarError(res?.message);
      }
      setUserContext(res?.data);

      if (res?.data) history.push("/list");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        style={styledContainer}
      >
        <Grid item xs={12} style={styledHeading}>
          <Typography component="h4" variant="h4">
            Login Page
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
              error={!!errors.username}
              helperText={errors.username?.message}
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
              error={!!errors.password}
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
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>

            <Link to="/signup">
              <Typography color="blue" style={{ textDecoration: "underline" }}>
                Sign up
              </Typography>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default Login;
