import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

import axios from "axios";
import { AsyncStorage } from "react-native";

import myApi from "../api/axios";
export const AuthContext = createContext();

const AuthProvider = props => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    message: ""
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log("signing in");
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        try {
          const res = await myApi.post("/api/auth/login", data, config);
          console.log("logging in");

          await AsyncStorage.setItem("token", res.data.token);
          dispatch({ type: "SIGN_IN", token: res.data.token });
        } catch (error) {
          console.log(error);
          return "error";
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        try {
          const res = await myApi.post("/api/users/signup", data, config);
          console.log("signing up");

          console.log(res.data);

          dispatch({ type: "SIGN_UP" });

          setTimeout(() => {
            dispatch({ type: "CLEAR_NOTIFICATION" });
          }, 10000);
        } catch (error) {
          console.log(error);
          return "error";
        }
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
