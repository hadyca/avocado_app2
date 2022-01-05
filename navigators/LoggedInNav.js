import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UserPostUploadForm from "../screens/UserPostUploadForm";
import EditUserPostForm from "../screens/EditUserPostForm";
import UserPostListDetail from "../screens/UserPostListDetail";
import EditUserPostCommentForm from "../screens/EditUserPostCommentForm";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import PostCategory from "../screens/PostCategory";
import General from "../screens/userCommunity/General";
import Job from "../screens/userCommunity/Job";
import Neighborhood from "../screens/userCommunity/Neighborhood";
import Question from "../screens/userCommunity/Question";
import Food from "../screens/userCommunity/Food";
import ChildCare from "../screens/userCommunity/ChildCare";
import Love from "../screens/userCommunity/Love";
import DailyLife from "../screens/userCommunity/DailyLife";
import Beauty from "../screens/userCommunity/Beauty";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator>
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
        }}
        component={UserPostUploadForm}
      />
      <Stack.Screen
        name="PostCategory"
        options={{
          headerBackTitleVisible: false,
        }}
        component={PostCategory}
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
      <Stack.Screen
        name="General"
        options={{
          headerBackTitleVisible: false,
        }}
        component={General}
      />
      <Stack.Screen
        name="Job"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Job}
      />
      <Stack.Screen
        name="Neighborhood"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Neighborhood}
      />
      <Stack.Screen
        name="Question"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Question}
      />
      <Stack.Screen
        name="Food"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Food}
      />
      <Stack.Screen
        name="ChildCare"
        options={{
          headerBackTitleVisible: false,
        }}
        component={ChildCare}
      />
      <Stack.Screen
        name="Love"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Love}
      />
      <Stack.Screen
        name="DailyLife"
        options={{
          headerBackTitleVisible: false,
        }}
        component={DailyLife}
      />
      <Stack.Screen
        name="Beauty"
        options={{
          headerBackTitleVisible: false,
        }}
        component={Beauty}
      />
    </Stack.Navigator>
  );
}
