import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import FollowNav from "./FollowNav";
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
import CompanyPostUploadForm from "../Screens/LoggedIn/Search/CompanyPostUploadForm";
import CompanyPostListDetail from "../Screens/LoggedIn/Search/CompanyPostListDetail";
import CompanyPostByDistrict from "../Screens/LoggedIn/Search/CompanyPostByDistrict";
import CompanyPostBySector from "../Screens/LoggedIn/Search/CompanyPostBySector";
import EditCompanyPostForm from "../Screens/LoggedIn/Search/EditCompanyPostForm";
import CompanyReComment from "../Screens/LoggedIn/Search/CompanyReComment";
import EditCompanyPostCommentForm from "../Screens/LoggedIn/Search/EditCompanyPostCommentForm";
import EditCompanyPostReCommentForm from "../Screens/LoggedIn/Search/EditCompanyPostReCommentForm";
import CompanyPostReportForm from "../Screens/LoggedIn/Search/CompanyPostReportForm";
import CompanyPostCommentReportForm from "../Screens/LoggedIn/Search/CompanyPostCommentReportForm";
import CompanyPostReCommentReportForm from "../Screens/LoggedIn/Search/CompanyPostReCommentReportForm";
import EditProfile from "../Screens/LoggedIn/Share/EditProfile";
import EditUsername from "../Screens/LoggedIn/Share/EditUsername";
import EditBio from "../Screens/LoggedIn/Share/EditBio";
import MyProfileSetting from "../Screens/LoggedIn/Share/MyProfileSetting";
import UserReportForm from "../Screens/LoggedIn/Share/UserReportForm";
import UserAllUserPost from "../Screens/LoggedIn/Share/UserAllUserPost";
import UserAllCompanyPost from "../Screens/LoggedIn/Share/UserAllCompanyPost";
import EditCompanyName from "../Screens/LoggedIn/Share/EditCompanyName";
import EditAboutUs from "../Screens/LoggedIn/Share/EditAboutUs";
import EditTotalEmployees from "../Screens/LoggedIn/Share/EditTotalEmployees";

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
        name="FollowNav"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        component={FollowNav}
      />
      <Stack.Screen
        name="EditTotalEmployees"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditTotalEmployees}
      />
      <Stack.Screen
        name="EditCompanyName"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditCompanyName}
      />
      <Stack.Screen
        name="EditAboutUs"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditAboutUs}
      />
      <Stack.Screen
        name="UserAllCompanyPost"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserAllCompanyPost}
      />
      <Stack.Screen
        name="UserAllUserPost"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserAllUserPost}
      />
      <Stack.Screen
        name="EditProfile"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditProfile}
      />
      <Stack.Screen
        name="UserReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={UserReportForm}
      />
      <Stack.Screen
        name="MyProfileSetting"
        options={{
          headerBackTitleVisible: false,
        }}
        component={MyProfileSetting}
      />
      <Stack.Screen
        name="EditUsername"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditUsername}
      />
      <Stack.Screen
        name="EditBio"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditBio}
      />
      <Stack.Screen
        name="CompanyPostCommentReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostCommentReportForm}
      />
      <Stack.Screen
        name="CompanyPostReCommentReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostReCommentReportForm}
      />
      <Stack.Screen
        name="CompanyPostReportForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostReportForm}
      />
      <Stack.Screen
        name="EditCompanyPostCommentForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostCommentForm}
      />
      <Stack.Screen
        name="CompanyPostBySector"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostBySector}
      />
      <Stack.Screen
        name="EditCompanyPostReCommentForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostReCommentForm}
      />
      <Stack.Screen
        name="CompanyReComment"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyReComment}
      />
      <Stack.Screen
        name="EditCompanyPostForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={EditCompanyPostForm}
      />
      <Stack.Screen
        name="CompanyPostByDistrict"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostByDistrict}
      />
      <Stack.Screen
        name="CompanyPostListDetail"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostListDetail}
      />
      <Stack.Screen
        name="CompanyPostUploadForm"
        options={{
          headerBackTitleVisible: false,
        }}
        component={CompanyPostUploadForm}
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
