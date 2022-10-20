import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FavoriteUserPost from "../Screens/LoggedIn/Favorites/FavoriteUserPost";
import FavoriteCompanyPost from "../Screens/LoggedIn/Favorites/FavoriteCompanyPost";
import { colors } from "../Colors";

const Tab = createMaterialTopTabNavigator();

export default function FavoritesNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.buttonBackground },
      }}
    >
      <Tab.Screen
        name="FavoriteUserPost"
        component={FavoriteUserPost}
        options={{
          title: "관심 일반 게시글",
        }}
      />
      <Tab.Screen
        name="FavoriteCompanyPost"
        component={FavoriteCompanyPost}
        options={{
          title: "관심 채용 게시글",
        }}
      />
    </Tab.Navigator>
  );
}
