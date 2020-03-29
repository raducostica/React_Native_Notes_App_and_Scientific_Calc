import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import AuthComponent from "../components/AuthComponent";

const SignInScreen = ({ navigation }) => {
  const { authContext } = useContext(AuthContext);
  const { signIn } = authContext;

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = (text, name) => {
    setState({
      ...state,
      [name]: text
    });
  };

  const handleSubmit = async () => {
    console.log(state.username, state.password);
    let formData = {
      username: state.username,
      password: state.password
    };
    try {
      signIn(formData);
    } catch (error) {
      console.log(error);
      setState({
        username: "",
        password: ""
      });
    }
  };

  const signInInputs = () => {
    return (
      <>
        <TextInput
          style={styles.inputs}
          name="username"
          maxLength={16}
          placeholder="username"
          value={state.username}
          onChangeText={text => handleChange(text, "username")}
        />

        <TextInput
          style={styles.inputs}
          name="password"
          maxLength={16}
          placeholder="password"
          value={state.password}
          secureTextEntry={true}
          onChangeText={text => handleChange(text, "password")}
        />
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.signInBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigateBtn}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.navigateBtnText}>
            Don't have an account? Create
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return <AuthComponent component={signInInputs} />;
};

const styles = StyleSheet.create({
  inputs: {
    backgroundColor: "#333",
    marginVertical: 18,
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
    marginVertical: 15
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
    marginVertical: 20
  },
  signInBtnText: {
    color: "#fff",
    fontSize: 18
  }
});

export default SignInScreen;
