import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UserPostUploadForm from "../screens/UserPostUploadForm";
import EditUserPostForm from "../screens/EditUserPostForm";
import UserPostListDetail from "../screens/UserPostListDetail";
import EditUserPostCommentForm from "../screens/EditUserPostCommentForm";
import Profile from "../screens/Profile";
import SelectPhoto from "../screens/SelectPhoto";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectPhoto"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
        component={SelectPhoto}
      />
      <Stack.Screen
        name="TabsNav"
        options={{
          headerShown: false,
        }}
        component={TabsNav}
      />
      <Stack.Screen
        name="UserPostListDetail"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserPostListDetail}
      />
      <Stack.Screen
        name="Profile"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="UserPostUploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
        component={UserPostUploadForm}
      />
      <Stack.Screen
        name="EditUserPostForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditUserPostForm}
      />
      <Stack.Screen
        name="EditUserPostCommentForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditUserPostCommentForm}
      />
    </Stack.Navigator>
  );
}
