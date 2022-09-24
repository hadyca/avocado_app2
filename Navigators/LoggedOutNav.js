import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../Screens/LoggedOut/Welcome";
import Login from "../Screens/LoggedOut/LogIn";
import CreateAccount from "../Screens/LoggedOut/CreateAccount";
import ConfirmSecret from "../Screens/LoggedOut/ConfirmSecret";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        title: false,
        headerTransparent: true,
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="ConfirmSecret" component={ConfirmSecret} />
    </Stack.Navigator>
  );
}
