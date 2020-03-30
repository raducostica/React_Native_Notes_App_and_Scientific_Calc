import React from "react";

import AuthProvider from "./context/AuthContext";
import NotesProvider from "./context/NotesContext";
import Routes from "./Routes";

const Provider = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes />
      </NotesProvider>
    </AuthProvider>
  );
};

export default Provider;
