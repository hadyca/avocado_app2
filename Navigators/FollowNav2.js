import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SharedStackNav from "./SharedStackNav";
import Following from "../Screens/LoggedIn/Share/Following";
import Followers from "../Screens/LoggedIn/Share/Followers";

const Tab = createMaterialTopTabNavigator();

export default function FollowNav2({ id }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Following1">
        {() => <SharedStackNav id={id} screenName="Following" />}
      </Tab.Screen>
      <Tab.Screen name="Followers1">
        {() => <SharedStackNav id={id} screenName="Followers" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
