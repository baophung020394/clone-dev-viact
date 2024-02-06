import React, { lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { UserProvider } from '../context/AuthContext'
import PrivateRoute from './PrivateRouter'

const LazyLoginPage = lazy(() => import('../pages/Login/LoginPage'))
const LazyRegisterPage = lazy(() => import('../pages/Register/RegisterPage'))
const LazyListUserPage = lazy(() => import('../pages/ListUser'))

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <UserProvider>
        <Route exact path='/login' component={LazyLoginPage} />
        <Route exact path='/signup' component={LazyRegisterPage} />
        <PrivateRoute path='/list'>
          <LazyListUserPage />
        </PrivateRoute>
      </UserProvider>
    </Switch>
  )
}

export default AppRoutes
