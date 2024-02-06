import React, { ReactNode } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useUser } from '../context/AuthContext'

interface PrivateRouteProps extends RouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const { user } = useUser()

  // Kiểm tra xem user đã đăng nhập hay chưa
  const isAuthenticated = !!user || !!localStorage.getItem('userInfo')

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
