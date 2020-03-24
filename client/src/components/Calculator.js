import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const cols = 4;
const marginHorizontal = 5;
const marginVertical = 7;
const width = Dimensions.get("window").width / cols - marginHorizontal * cols;

const Calculator = ({
  values,
  handleChange,
  handleSubmit,
  answer,
  setAnswer
}) => {
  let screenWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#000",
        width: screenWidth,
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center"
      }}
    >
      {values.map(val => {
        if (val.value === "=") {
          return (
            <TouchableOpacity
              key={val.value}
              style={styles.button}
              onPress={() => handleSubmit(answer)}
            >
              <Text style={styles.buttonText}>{val.value}</Text>
            </TouchableOpacity>
          );
        } else if (val.value === "AC") {
          return (
            <TouchableOpacity
              key={val.value}
              style={styles.button}
              onPress={() => setAnswer("")}
            >
              <Text style={styles.buttonText}>{val.value}</Text>
            </TouchableOpacity>
          );
        } else if (val.value === "-=") {
          return (
            <TouchableOpacity
              key={val.value}
              style={styles.button}
              onPress={() => handleChange("remove")}
            >
              <Text style={styles.buttonText}>{val.value}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={val.value}
            style={styles.button}
            onPress={() => handleChange(val.value)}
          >
            <Text style={styles.buttonText}>{val.value}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: width,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff704d",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1
  },
  buttonText: {
    color: "white",
    fontSize: 23
  },
  display: {
    fontSize: 30,
    color: "white"
  }
});

export default Calculator;
