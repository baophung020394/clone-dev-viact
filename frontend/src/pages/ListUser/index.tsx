import { Button, Grid, Typography } from '@mui/material'
import { styledContainer } from '../../constants/common'
import { useUser } from '../../context/AuthContext'

const ListUser = () => {
  const { logout } = useUser()
  return (
    <Grid container justifyContent='center' alignItems='center' style={styledContainer}>
      <Grid item xs={12}>
        <Typography component='h4' variant='h4' fontWeight='bold'>
          Thank you for your visit
        </Typography>
        <Button type='submit' variant='contained' color='primary' onClick={logout}>
          Logout
        </Button>
      </Grid>
    </Grid>
  )
}

export default ListUser
