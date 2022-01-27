import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteCompanyPost from "../Screens/FavoriteCompanyPost";
import FavoriteCompany from "../Screens/FavoriteCompany";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function FavoritesNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FavoriteCompanyPost"
        component={FavoriteCompanyPost}
        options={{
          title: "좋아요 게시글 리스트",
        }}
      />
      <Tab.Screen
        name="FavoriteCompany"
        component={FavoriteCompany}
        options={{
          title: "좋아요 회사 리스트",
        }}
      />
    </Tab.Navigator>
  );
}
