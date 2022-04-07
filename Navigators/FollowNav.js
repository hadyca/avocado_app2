import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FollowNav2 from "./FollowNav2";

const Stack = createStackNavigator();

export default function FollowNav({ route: { params } }) {
  console.log(params, "!!빠람스");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FollowNav2"
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      >
        {() => <FollowNav2 id={params.id} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
