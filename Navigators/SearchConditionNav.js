import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchConditionDistrict from "../Screens/LoggedIn/Search/SearchConditionDistrict";
import SearchConditionSector from "../Screens/LoggedIn/Search/SearchConditionSector";

const Tab = createMaterialTopTabNavigator();

export default function SearchConditionNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "black" },
      }}
    >
      <Tab.Screen
        name="SearchConditionDistrict"
        component={SearchConditionDistrict}
        options={{
          title: "지역",
        }}
      />
      <Tab.Screen
        name="SearchConditionSector"
        component={SearchConditionSector}
        options={{
          title: "산업/업종",
        }}
      />
    </Tab.Navigator>
  );
}
