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
    userToken: null
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
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
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
