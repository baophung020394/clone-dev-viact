import { Grid } from "@mui/material";
import Register from "../../components/Forms/Register";

const RegisterPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12}>
        <Register />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
