import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../Screens/LoggedOut/Welcome";
import Login from "../Screens/LoggedOut/LogIn";
import ConfirmSecret from "../Screens/LoggedOut/ConfirmSecret";
import AskPhoneNumber from "../Screens/LoggedOut/AskPhoneNumber";
import AskUsername from "../Screens/LoggedOut/AskUsername";
import AskPassword from "../Screens/LoggedOut/AskPassword";

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
      <Stack.Screen name="AskPhoneNumber" component={AskPhoneNumber} />
      <Stack.Screen name="ConfirmSecret" component={ConfirmSecret} />
      <Stack.Screen name="AskUsername" component={AskUsername} />
      <Stack.Screen name="AskPassword" component={AskPassword} />
    </Stack.Navigator>
  );
}
