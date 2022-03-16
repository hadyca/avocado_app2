import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UserPostUploadForm from "../Screens/LoggedIn/UserPosts/UserPostUploadForm";
import EditUserPostForm from "../Screens/LoggedIn/UserPosts/EditUserPostForm";
import UserPostListDetail from "../Screens/LoggedIn/UserPosts/UserPostListDetail";
import EditUserPostCommentForm from "../Screens/LoggedIn/UserPosts/EditUserPostCommentForm";
import EditUserPostReCommentForm from "../Screens/LoggedIn/UserPosts/EditUserPostReCommentForm";
import Profile from "../Screens/LoggedIn/Share/Profile";
import PostCategory from "../Screens/LoggedIn/UserPosts/PostCategory";
import EditPostCategory from "../Screens/LoggedIn/UserPosts/EditPostCategory";
import CategoryBoard from "../Screens/LoggedIn/UserPosts/CategoryBoard";
import ReComment from "../Screens/LoggedIn/UserPosts/ReComment";
import UserPostReportForm from "../Screens/LoggedIn/UserPosts/UserPostReportForm";
import UserPostCommentReportForm from "../Screens/LoggedIn/UserPosts/UserPostCommentReportForm";
import UserPostReCommentReportForm from "../Screens/LoggedIn/UserPosts/UserPostReCommentReportForm";
import AskCompanyName from "../Screens/LoggedIn/Share/CreateCompany/AskCompanyName";
import AskEmail from "../Screens/LoggedIn/Share/CreateCompany/AskEmail";
import AskAboutUs from "../Screens/LoggedIn/Share/CreateCompany/AskAboutUs";
import AskContactNumber from "../Screens/LoggedIn/Share/CreateCompany/AskContactNumber";
import AskSector from "../Screens/LoggedIn/Share/CreateCompany/AskSector";
import AskTotalEmployees from "../Screens/LoggedIn/Share/CreateCompany/AskTotalEmployees";
import AskAddress_1 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_1";
import AskAddress_2 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_2";
import AskAddress_3 from "../Screens/LoggedIn/Share/CreateCompany/AskAddress_3";
import CreateCompanyFinish from "../Screens/LoggedIn/Share/CreateCompany/CreateCompanyFinish";

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
        name="CreateCompanyFinish"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CreateCompanyFinish}
      />
      <Stack.Screen
        name="AskAddress_1"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskAddress_1}
      />
      <Stack.Screen
        name="AskAddress_2"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskAddress_2}
      />
      <Stack.Screen
        name="AskAddress_3"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskAddress_3}
      />
      <Stack.Screen
        name="AskTotalEmployees"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskTotalEmployees}
      />

      <Stack.Screen
        name="AskSector"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskSector}
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
      <Stack.Screen
        name="AskCompanyName"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskCompanyName}
      />
      <Stack.Screen
        name="AskEmail"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskEmail}
      />
      <Stack.Screen
        name="AskContactNumber"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskContactNumber}
      />
      <Stack.Screen
        name="AskAboutUs"
        options={{
          headerBackTitleVisible: false,
        }}
        component={AskAboutUs}
      />
    </Stack.Navigator>
  );
}
