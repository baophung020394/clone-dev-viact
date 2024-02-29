import { yupResolver } from "@hookform/resolvers/yup";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signIn } from "../../apis/auth";
import { RESPONSE_MESSAGE } from "../../constants/common";
import { useUser } from "../../context/AuthContext";
import stylesGlobal from "../../global.module.css";
import CustomButton from "../common/CustomButton";
import CustomTextField from "../common/CustomField";
import { LoginForm } from "../../models/UserModel";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(schema) });
  const { setUserContext } = useUser();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const logo = "/assets/images/logo/logo-viact.png";
  const logoGG = "/assets/images/logo/icon-gg.svg";

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

      if (res?.data) history.push("/thanks");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  // const [countryCode, setCountryCode] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string>("");

  // const handleCountryCodeChange = (event: SelectChangeEvent<string>) => {
  //   setCountryCode(event.target.value as string);
  // };

  // const handlePhoneNumberChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setPhoneNumber(event.target.value);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={stylesGlobal["login-form"]}
    >
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
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        className={stylesGlobal["login-box"]}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={stylesGlobal["login-box__heading"]}
        >
          <Grid item xs={9} md={9}>
            <img src={logo} alt="logo" className={stylesGlobal["logo"]} />
          </Grid>
          <Grid
            item
            xs={3}
            md={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h5" className={stylesGlobal["heading-small"]}>
              Automate <br />
              Construction <br />
              Monitoring
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"p"}
            fontSize={16}
            textTransform={"uppercase"}
            fontWeight={400}
            letterSpacing={"0.00938em"}
            lineHeight={1.5}
          >
            LOGIN
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"p"}
            fontSize={20}
            fontWeight={700}
            letterSpacing={"0.00938em"}
            lineHeight={1.5}
            color={"rgb(235, 87, 87)"}
          >
            Welcome Back
          </Typography>
        </Grid>
        <Grid container padding={"30px"}>
          <Grid container columnSpacing={1}>
            <Grid item xs={12} mb={2}>
              <CustomTextField
                name="username"
                label="Email or Username"
                fullWidth
                variant="outlined"
                placeholder="Email or Username"
                type={"text"}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                control={control}
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            className={stylesGlobal["options"]}
          >
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  onChange={handleTogglePasswordVisibility}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#EB5757",
                    },
                  }}
                />
              }
              className={stylesGlobal["MuiFormControlLabel-root"]}
              label="Show password"
            />

            <Typography component={"p"} fontWeight={700} fontSize={12}>
              <Link to={"/"} color={"rgb(235, 87, 87)"}>
                Forgot password?
              </Link>
            </Typography>
          </Grid>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <CustomButton className="custom-button login">Login</CustomButton>
            </Grid>
            <Grid item xs={12}>
              <Typography component={"p"} textAlign={"center"} fontSize={12}>
                OR
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomButton className="custom-button login-gg" image={logoGG}>
                Login with Google
              </CustomButton>
            </Grid>
            <Grid item xs={12}>
              <Typography
                component={"p"}
                textAlign={"center"}
                fontSize={13}
                fontWeight={400}
                mt={1}
              >
                Not on Viact yet?{" "}
                <Typography
                  component={"span"}
                  fontSize={16}
                  fontWeight={700}
                  color={"rgb(235, 87, 87)"}
                  sx={{
                    "& a": {
                      textDecoration: "none",
                      color: "rgb(235, 87, 87)",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    },
                  }}
                >
                  <Link to={"/signup"}>Signup</Link>
                </Typography>{" "}
                now
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
