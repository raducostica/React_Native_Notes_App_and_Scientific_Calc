import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

import { AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const { authContext } = useContext(AuthContext);

  const [fontLoaded, setFontLoaded] = useState(false);
  const { signIn } = authContext;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "monoton-regular": require("../../assets/fonts/Monoton-Regular.ttf")
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

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

  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        {fontLoaded ? <Text style={styles.logoText}>R</Text> : null}
      </View>
      <View style={styles.signInStyles}>
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
          onChangeText={text => handleChange(text, "password")}
        />

        <TouchableOpacity onPress={() => handleSubmit()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "red"
  },
  logo: {
    flex: 0.3,
    backgroundColor: "blue",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    fontFamily: "monoton-regular",
    fontSize: 100
  },
  signInStyles: {
    flex: 0.7,
    backgroundColor: "green",
    alignItems: "center",
    paddingTop: 15
  },
  inputs: {
    backgroundColor: "red",
    marginVertical: 15
  }
});

export default SignInScreen;
