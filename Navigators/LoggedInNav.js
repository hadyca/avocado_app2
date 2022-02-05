import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UserPostUploadForm from "../Screens/LoggedIn/UserPosts/UserPostUploadForm";
import EditUserPostForm from "../Screens/EditUserPostForm";
import UserPostListDetail from "../Screens/LoggedIn/UserPosts/UserPostListDetail";
import EditUserPostCommentForm from "../Screens/EditUserPostCommentForm";
import EditUserPostReCommentForm from "../Screens/EditUserPostReCommentForm";
import Profile from "../Screens/Profile";
import PostCategory from "../Screens/PostCategory";
import EditPostCategory from "../Screens/EditPostCategory";
import CategoryBoard from "../Screens/CategoryBoard";
import ReComment from "../Screens/LoggedIn/UserPosts/ReComment";
import UserPostReportForm from "../Screens/reports/UserPostReportForm";
import UserPostCommentReportForm from "../Screens/reports/UserPostCommentReportForm";
import UserPostReCommentReportForm from "../Screens/reports/UserPostReCommentReportForm";

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
