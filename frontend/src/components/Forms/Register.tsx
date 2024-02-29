import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { signUp } from "../../apis/auth";
import stylesGlobal from "../../global.module.css";
import { RegisterForm } from "../../models/UserModel";
import CustomButton from "../common/CustomButton";
import CustomTextField from "../common/CustomField";
import CustomPhoneInput from "../common/CustomPhoneInput";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = Object.keys(errors).length > 0;

  const logo = "/assets/images/logo/logo-viact.png";

  const onSubmit = async (data: RegisterForm) => {
    if (data) {
      const res = await signUp(data);
      if (res?.code === 200) history.push("/");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={stylesGlobal["register-form"]}
    >
      <Grid container>
        <Grid item xs={12} md={6} className={stylesGlobal["heading-logo"]}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={stylesGlobal["login-box__heading"]}
          >
            <Grid item xs={8} md={8}>
              <img src={logo} alt="logo" className={stylesGlobal["logo"]} />
            </Grid>
            <Grid
              item
              xs={4}
              md={4}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                variant="h5"
                className={stylesGlobal["heading-small"]}
              >
                Automate <br />
                Construction <br />
                Monitoring
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography
              component={"p"}
              fontSize={16}
              textTransform={"uppercase"}
              fontWeight={400}
              letterSpacing={"0.00938em"}
              lineHeight={1.5}
            >
              CREATE NEW ACCOUNT
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography
              component={"p"}
              fontSize={20}
              fontWeight={700}
              letterSpacing={"0.00938em"}
              lineHeight={1.5}
              color={"rgb(235, 87, 87)"}
            >
              Build smart risk free
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul className={stylesGlobal["note"]}>
              <li>
                Understand why Viact is being used on millions of customers
                everyday
              </li>
              <li>Find out if Viact is the right fit for your business</li>
              <li>Get all your questions answered (personally)</li>
              <li>
                Completely risk-free with 14-day free trial and a 30-day money
                back guarantee!
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          padding={"20px"}
          borderLeft={"1px solid #EBEBEB"}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                name="firstName"
                label={
                  <>
                    First Name{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={"text"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="lastName"
                label={
                  <>
                    Last Name{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={"text"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="username"
                label={
                  <>
                    Username{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={"text"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label={
                  <>
                    Email{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={"text"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomPhoneInput name="phone" control={control} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="password"
                label={
                  <>
                    Password{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                name="confirmPassword"
                label={
                  <>
                    Confirm Password{" "}
                    <Typography component={"span"} color={"red"}>
                      *
                    </Typography>
                  </>
                }
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                control={control}
                errors={errors}
                borderColor="rgba(0, 0, 0, 0.23)"
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
          </Grid>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <CustomButton
                className="custom-button login"
                // disabled={isDisabled}
              >
                Sign up
              </CustomButton>
            </Grid>

            <Grid item xs={12}>
              <Typography
                component={"p"}
                textAlign={"center"}
                fontSize={13}
                fontWeight={400}
                mt={1}
                maxWidth={350}
                m={"auto"}
              >
                By clicking Sign up or Continue with Google, you agree to
                viAct’s{" "}
                <Typography
                  component={"span"}
                  fontSize={16}
                  fontWeight={700}
                  color={"rgb(235, 87, 87)"}
                  sx={{
                    "& a": {
                      textDecoration: "none",
                      color: "rgb(235, 87, 87)",
                      fontSize: "12px",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    },
                  }}
                >
                  <Link to={"#"}>Terms and Conditions for Free Trial.</Link>
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                component={"p"}
                textAlign={"center"}
                fontSize={13}
                fontWeight={400}
                mt={1}
              >
                Already have an account?{" "}
                <Typography
                  component={"span"}
                  fontSize={16}
                  fontWeight={700}
                  color={"rgb(235, 87, 87)"}
                  sx={{
                    "& a": {
                      textDecoration: "none",
                      color: "rgb(235, 87, 87)",
                      fontSize: "12px",
                      "&:hover": {
                        textDecoration: "none",
                      },
                    },
                  }}
                >
                  <Link to={"/"}>Login</Link>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
