import React from "react";
import myApi from "../api/axios";
import { AuthContext } from "./AuthContext";
import NotesReducer from "./NotesReducer";

export const NotesContext = React.createContext();

const NotesProvider = ({ children }) => {
  const { state } = React.useContext(AuthContext);

  const initialState = {
    notes: [],
    error: null
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

  const addNote = async data => {
    console.log("making note");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.userToken}`
      }
    };
    try {
      const res = await myApi.post("/api/notes", data, config);

      dispatch({ type: "CREATE_NOTE", payload: data });
    } catch (error) {
      dispatch({ type: "NOTES_ERROR", payload: error.response.msg });
    }
  };

  const deleteNote = async note => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.userToken}`
      }
    };

    try {
      const res = await myApi.delete(`/api/notes/${note._id}`, config);

      dispatch({ type: "DELETE_NOTE", payload: note._id });
    } catch (error) {
      console.log(error);
      dispatch({ type: "NOTES_ERROR", payload: error.response.msg });
    }
  };

  const editNote = async note => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.userToken}`
      }
    };
    try {
      const res = await myApi.put(`/api/notes/${note._id}`, note, config);

      dispatch({ type: "EDIT_NOTE", payload: res.data });
    } catch (error) {
      dispatch({ type: "NOTES_ERROR", payload: error.response.msg });
    }
  };

  return (
    <NotesContext.Provider
      value={{ getNotes, noteState, addNote, editNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
