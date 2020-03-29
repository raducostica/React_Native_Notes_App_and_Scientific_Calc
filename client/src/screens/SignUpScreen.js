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
            <TextInput
              style={styles.inputs}
              name="email"
              placeholder="email"
              value={userState.email}
              onChangeText={text => handleChange(text, "email")}
            />
            <TextInput
              style={styles.inputs}
              name="username"
              maxLength={16}
              placeholder="username"
              value={userState.username}
              onChangeText={text => handleChange(text, "username")}
            />

            <TextInput
              style={styles.inputs}
              name="password"
              maxLength={16}
              placeholder="password"
              value={userState.password}
              secureTextEntry={true}
              onChangeText={text => handleChange(text, "password")}
            />

            <TextInput
              style={styles.inputs}
              name="password2"
              maxLength={16}
              placeholder="password"
              value={userState.password2}
              secureTextEntry={true}
              onChangeText={text => handleChange(text, "password2")}
            />
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.signInBtnText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigateBtn}
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text style={styles.navigateBtnText}>
                Already Have an account? Sign In
              </Text>
            </TouchableOpacity>
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
  inputs: {
    backgroundColor: "#333",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 15,
    width: "70%",
    color: "#fff"
  },
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
