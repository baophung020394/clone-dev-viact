import './App.css'
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/routes'

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <BrowserRouter basename='/'>
          <React.Fragment>
            <AppRoutes />
          </React.Fragment>
        </BrowserRouter>
      </div>
    </Suspense>
  )
}

export default App
