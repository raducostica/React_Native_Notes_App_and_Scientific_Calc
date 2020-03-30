import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

import AuthComponent from "../components/AuthComponent";
import { AuthContext } from "../context/AuthContext";

import Input from "../components/CustomInput";
import AuthButtons from '../components/AuthButtons'

const SignUpScreen = ({ navigation }) => {
  const { authContext, state } = useContext(AuthContext);

  const { signUp } = authContext;

  const { message } = state;

  const [userState, setUserState] = useState({
    email: "",
    username: "",
    password: "",
    password2: ""
  });

  const handleChange = (text, name) => {
    setUserState({
      ...userState,
      [name]: text
    });
  };

  const handleSubmit = async () => {
    if (userState.password !== userState.password2) {
      return;
    }
    let formData = {
      email: userState.email,
      username: userState.username,
      password: userState.password,
      password2: userState.password2
    };

    try {
      signUp(formData);

      setTimeout(() => {
        setUserState({
          email: "",
          username: "",
          password: "",
          password2: ""
        });
      }, 15000);
    } catch (error) {
      setUserState({
        email: "",
        username: "",
        password: "",
        password2: ""
      });
    }
  };
  const signUpInputs = () => {
    return (
      <>
        {message === "" ? (
          <>
            <Input
              iconName="envelope"
              inputName="email"
              val={userState.email}
              fn={handleChange}
            />

            <Input
              iconName="user"
              inputName="username"
              val={userState.username}
              fn={handleChange}
            />

            <Input
              iconName="lock"
              inputName="password"
              val={userState.password}
              fn={handleChange}
            />

            <Input
              iconName="lock"
              inputName="password2"
              val={userState.password2}
              fn={handleChange}
            />

            <AuthButtons func={handleSubmit} loginText="Create Account" navigateText="Sign In" navigateButtonText="Already Have an account? Sign In" navigation={navigation} />
          </>
        ) : (
          <>
            <Text>{message}</Text>
            <TouchableOpacity
              style={styles.navigateBtn}
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text style={styles.navigateBtnText}>Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  };
  return <AuthComponent component={signUpInputs} />;
};

const styles = StyleSheet.create({
  navigateBtn: {
    marginVertical: 10
  },
  navigateBtnText: {
    color: "#fff",
    fontSize: 16
  },
  signInBtn: {
    backgroundColor: "#ff5c33",
    paddingVertical: 10,
    width: "60%",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10
  },
  signInBtnText: {
    color: "#fff",
    fontSize: 18
  }
});

export default SignUpScreen;
