import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UserPostUploadForm from "../screens/UserPostUploadForm";
import EditUserPostForm from "../screens/EditUserPostForm";
import UserPostListDetail from "../screens/UserPostListDetail";
import EditUserPostCommentForm from "../screens/EditUserPostCommentForm";
import EditUserPostReCommentForm from "../screens/EditUserPostReCommentForm";
import Profile from "../screens/Profile";
import PostCategory from "../screens/PostCategory";
import EditPostCategory from "../screens/EditPostCategory";
import CategoryBoard from "../screens/CategoryBoard";
import ReComment from "../screens/ReComment";
import UserPostReportForm from "../screens/reports/UserPostReportForm";
import UserPostCommentReportForm from "../screens/reports/UserPostCommentReportForm";
import UserPostReCommentReportForm from "../screens/reports/UserPostReCommentReportForm";

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
        name="EditPostCategory"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditPostCategory}
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
        name="EditUserPostReCommentForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditUserPostReCommentForm}
      />
      <Stack.Screen
        name="CategoryBoard"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CategoryBoard}
      />
      <Stack.Screen
        name="ReComment"
        options={{
          headerBackTitleVisible: false,
        }}
        component={ReComment}
      />
      <Stack.Screen
        name="UserPostReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserPostReportForm}
      />
      <Stack.Screen
        name="UserPostCommentReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserPostCommentReportForm}
      />
      <Stack.Screen
        name="UserPostReCommentReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserPostReCommentReportForm}
      />
    </Stack.Navigator>
  );
}
