import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoriteCompanyPost from "../Screens/LoggedIn/Favorites/FavoriteCompanyPost";
import FavoriteCompany from "../Screens/LoggedIn/Favorites/FavoriteCompany";

const Tab = createMaterialTopTabNavigator();

export default function FavoritesNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FavoriteCompanyPost"
        component={FavoriteCompanyPost}
        options={{
          title: "즐겨찾기 게시글 리스트",
        }}
      />
      <Tab.Screen
        name="FavoriteCompany"
        component={FavoriteCompany}
        options={{
          title: "팔로잉 회사들",
        }}
      />
    </Tab.Navigator>
  );
}
