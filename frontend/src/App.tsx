import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import stylesGlobal from "./global.module.css";
import AppRoutes from "./router/routes";

function App() {
  const bgAuth = "/assets/images/auth/background-auth.png";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={stylesGlobal["app"]}
        style={{ background: `url(${bgAuth}), #0b454f` }}
      >
        <BrowserRouter basename="/">
          <React.Fragment>
            <AppRoutes />
          </React.Fragment>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
