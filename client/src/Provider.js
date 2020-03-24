import React from "react";

import AuthProvider from "./context/AuthContext";
import Routes from "./Routes";

const Provider = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Provider;
