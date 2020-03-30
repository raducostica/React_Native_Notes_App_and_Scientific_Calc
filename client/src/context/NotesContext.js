import React from "react";
import myApi from "../api/axios";
import { AuthContext } from "./AuthContext";
import NotesReducer from "./NotesReducer";

export const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  const { state } = React.useContext(AuthContext);

  const initialState = {
    notes: []
  };

  const [noteState, dispatch] = React.useReducer(NotesReducer, initialState);

  const getNotes = async () => {
    console.log("getting notes");
    try {
      if (state.userToken != null) {
        const res = await myApi.get("/api/notes", {
          headers: { Authorization: `Bearer ${state.userToken}` }
        });
        dispatch({ type: "GET_NOTES", payload: res.data });
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NotesContext.Provider value={{ getNotes, noteState }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
