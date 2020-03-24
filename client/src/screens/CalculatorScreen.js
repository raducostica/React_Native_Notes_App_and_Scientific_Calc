import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from "react-native";

import Calculator from "../components/Calculator";

const CalculatorScreen = () => {
  let page2 = [
    { value: "sin" },
    { value: "cos" },
    { value: "tan" },
    { value: "log" },
    { value: "π" },
    { value: "sqr" },
    { value: "!" },
    { value: "√" },
    { value: "exp" }
  ];

  let page1 = [
    { value: "(" },
    { value: ")" },
    { value: "-=" },
    { value: "AC" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "÷" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "x" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "-" },
    { value: "0" },
    { value: "." },
    { value: "=" },
    { value: "+" }
  ];

  function factorialize(num) {
    if (num < 0) return -1;
    else if (num == 0) return 1;
    else {
      return num * factorialize(num - 1);
    }
  }

  const [answer, setAnswer] = useState("");

  let screenWidth = Dimensions.get("window").width;

  const checkNextChar = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(parseInt(arr[i])) && !isNaN(parseInt(arr[i + 1]))) {
        let num = arr[i].concat(arr[i + 1]);
        arr.splice(i, 2, num);
        i--;
      }
    }

    return arr;
  };

  const handleSubmit = str => {
    let string = str.split("");
    string = checkNextChar(string);

    for (let i = 0; i < string.length; i++) {
      let num;
      switch (string[i]) {
        case ".":
          num = string[i - 1].concat(string[i]).concat(string[i + 1]);
          string.splice(i - 1, 3, num);
          i--;
          break;
        case "√":
          if (!isNaN(parseFloat(string[i - 1]))) {
            num = string[i - 1] * Math.sqrt(string[i + 1]);
            string.splice(i - 1, 3, num);
            break;
          }
          num = Math.sqrt(string[i + 1]).toString();
          string.splice(i, 2, num);
          break;
        case string[i - 2] === "s" && string[i - 1] === "i" && "n":
          if (!isNaN(parseFloat(string[i + 1]))) {
            num = Math.sin(string[i + 1]).toString();
            string.splice(i - 2, 4, num);
          } else if (
            string[i + 1] === "-" &&
            !isNaN(parseFloat(string[i + 2]))
          ) {
            num = Math.sin(string[i + 1].concat(string[i + 2])).toString();
            string.splice(i - 2, 5, num);
          }
          break;
        case string[i - 2] === "c" && string[i - 1] === "o" && "s":
          if (!isNaN(parseFloat(string[i + 1]))) {
            num = Math.cos(string[i + 1]).toString();
            string.splice(i - 2, 4, num);
          } else if (
            string[i + 1] === "-" &&
            !isNaN(parseFloat(string[i + 2]))
          ) {
            num = Math.cos(string[i + 1].concat(string[i + 2])).toString();
            string.splice(i - 2, 5, num);
          }
          break;
        case string[i - 2] === "t" && string[i - 1] === "a" && "n":
          if (!isNaN(parseFloat(string[i + 1]))) {
            num = Math.tan(string[i + 1]).toString();
            string.splice(i - 2, 4, num);
          } else if (
            string[i + 1] === "-" &&
            !isNaN(parseFloat(string[i + 2]))
          ) {
            num = Math.tan(string[i + 1].concat(string[i + 2])).toString();
            string.splice(i - 2, 5, num);
          }
          break;
        case string[i - 2] === "s" && string[i - 1] === "q" && "r":
          if (!isNaN(parseFloat(string[i + 1]))) {
            num = Math.pow(string[i - 3], string[i + 1]).toString();
            string.splice(i - 3, 5, num);
          } else if (
            string[i + 1] === "-" &&
            !isNaN(parseFloat(string[i + 2]))
          ) {
            num = Math.pow(
              string[i - 3],
              string[i + 1].concat(string[i + 2])
            ).toString();
            string.splice(i - 3, 6, num);
          }
          break;
        case string[i - 2] === "l" && string[i - 1] === "o" && "g":
          num = Math.log(string[i + 1]).toString();
          string.splice(i - 2, 4, num);
          break;
        case string[i - 2] === "e" && string[i - 1] === "x" && "p":
          if (!isNaN(parseFloat(string[i + 1]))) {
            num = Math.exp(string[i + 1]).toString();
            string.splice(i - 2, 4, num);
          } else if (
            string[i + 1] === "-" &&
            !isNaN(parseFloat(string[i + 2]))
          ) {
            num = Math.exp(string[i + 1].concat(string[i + 2])).toString();
            string.splice(i - 2, 5, num);
          }
          break;
        case "!":
          num = factorialize(parseFloat(string[i - 1]));
          string.splice(i - 1, 2, num);
          break;
        case "π":
          if (!isNaN(parseFloat(string[i - 1]))) {
            num = Math.PI * string[i - 1];
            string.splice(i - 1, 2, num);
            break;
          } else {
            num = Math.PI;
            string.splice(i, 1, num);
          }
          break;
      }
      let s = string.join("");

      let finalString = s.replace(/[x÷]/g, function(match) {
        return match == "x" ? "*" : "/";
      });

      try {
        var x = new Function(`'use strict'; return (${finalString})`)();
        setAnswer(x);
      } catch (error) {
        setAnswer("");
      }
    }
  };

  const handleChange = num => {
    try {
      if (num === "remove") {
        setAnswer(answer.slice(0, -1));
        return;
      }
      setAnswer(answer + num);
    } catch (error) {
      setAnswer(answer);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        width: screenWidth,
        height: "100%"
      }}
    >
      <View style={styles.mainView}>
        <Text style={styles.display}>{answer}</Text>
      </View>
      <ScrollView horizontal={true} pagingEnabled={true}>
        <Calculator
          values={page1}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          answer={answer}
          setAnswer={setAnswer}
        />
        <Calculator
          values={page2}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          answer={answer}
          setAnswer={setAnswer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#000",
    width: "100%",
    height: "25%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  display: {
    fontSize: 30,
    color: "white"
  }
});
export default CalculatorScreen;
