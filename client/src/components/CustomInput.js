import React from "react";
import { View, TextInput } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

const Input = ({ iconName, inputName, val, fn }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#333",
        marginVertical: 12,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 1,
        fontSize: 18,
        paddingLeft: 15,
        width: "70%",
        color: "#fff",
        alignItems: "center",
      }}
    >
      <Icon name={iconName} size={20} color="#f7f7f7" />
      {inputName === "password" || inputName === "password2" ? (
        <TextInput
          secureTextEntry={true}
          style={{ paddingLeft: 15, fontSize: 18, color: "#f7f7f7", flex: 1 }}
          name={inputName}
          placeholder={inputName}
          value={val}
          onChangeText={(text) => fn(text, inputName)}
        />
      ) : (
        <TextInput
          style={{ paddingLeft: 15, fontSize: 18, color: "#f7f7f7", flex: 1 }}
          name={inputName}
          placeholder={inputName}
          value={val}
          onChangeText={(text) => fn(text, inputName)}
        />
      )}
    </View>
  );
};

export default Input;
