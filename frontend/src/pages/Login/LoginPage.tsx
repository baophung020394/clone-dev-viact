import { Grid } from '@mui/material'
import Login from '../../components/Forms/Login'

const LoginPage = () => {
  return (
    <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Login />
      </Grid>
    </Grid>
  )
}

export default LoginPage
