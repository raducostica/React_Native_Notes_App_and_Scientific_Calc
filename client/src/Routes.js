import * as React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import CalculatorScreen from "./screens/CalculatorScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NotesScreen from "./screens/NotesScreen";

import { AuthContext } from "./context/AuthContext";
import EditNoteScreen from "./screens/EditNoteScreen";

const Stack = createStackNavigator();

const Routes = () => {
  const { state } = React.useContext(AuthContext);
  return (
    <NavigationContainer>
      <>
        {state.userToken == null ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Calculator" component={CalculatorScreen} />
            <Stack.Screen name="Notes" component={NotesScreen} />
            <Stack.Screen name="EditNote" component={EditNoteScreen} />
          </Stack.Navigator>
        )}
      </>
    </NavigationContainer>
  );
};

export default Routes;
