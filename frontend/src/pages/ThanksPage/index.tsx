import { Button, Grid, Typography } from "@mui/material";
import { styledContainer } from "../../constants/common";
import { useUser } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const ThanksPage = () => {
  const { logout } = useUser();
  const history = useHistory();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={styledContainer}
      rowSpacing={2}
    >
      <Grid item xs={12}>
        <Typography
          component="h4"
          variant="h4"
          fontWeight="bold"
          color={"#ffffff"}
        >
          Thank you for your visit
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default ThanksPage;
