import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Following from "../Screens/LoggedIn/Share/Following";
import Followers from "../Screens/LoggedIn/Share/Followers";

const Tab = createMaterialTopTabNavigator();

export default function FollowNav2({ id, screenName }) {
  return (
    <Tab.Navigator
      initialRouteName={screenName}
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "black" },
      }}
    >
      <Tab.Screen name="Following" children={() => <Following id={id} />} />
      <Tab.Screen name="Followers" children={() => <Followers id={id} />} />
    </Tab.Navigator>
  );
}
