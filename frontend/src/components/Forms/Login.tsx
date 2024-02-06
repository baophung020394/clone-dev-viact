import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../apis/auth'
import { useUser } from '../../context/AuthContext'
import { Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { yupResolver } from '@hookform/resolvers/yup'
import { styledContainer, styledHeading, styledInput, styledPaper } from '../../constants/common'
import * as yup from 'yup'

interface LoginForm {
  username: string
  password: string
}

// Schema validation sử dụng yup
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(schema) })
  const { setUserContext } = useUser()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: LoginForm) => {
    if (data) {
      const res = await signIn(data.username, data.password)
      console.log({ res })
      setUserContext(res?.data)
      if (res?.data) history.push('/list')
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        style={styledContainer}
      >
        <Grid item xs={12} style={styledHeading}>
          <Typography component='h4' variant='h4'>
            Login Page
          </Typography>
        </Grid>
        <Paper elevation={12} style={styledPaper}>
          <Grid item xs={12} width='100%'>
            <TextField
              {...register('username')}
              label='Username'
              fullWidth
              variant='standard'
              placeholder='Username'
              error={!!errors.username}
              helperText={errors.username?.message}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12} width='100%'>
            <TextField
              {...register('password')}
              label='Password'
              fullWidth
              variant='standard'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              style={styledInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </form>
  )
}

export default Login
