import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Home from "../Screens/LoggedIn/Home/Home";
import UserPostList from "../Screens/LoggedIn/UserPosts/UserPostList";
import CompanyPostAll from "../Screens/LoggedIn/Search/CompanyPostAll";
import FavoritesNav from "./FavoritesNav";
import Me from "../Screens/LoggedIn/Me";
import { colors } from "../Colors";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerStyle: {
          borderBottomColor: colors.borderThick,
          shadowColor: "rgba(255, 255, 255, 0.3)", //IOS용 인듯? 나중에 확인
          backgroundColor: "white",
        },
        headerTitleAlign: "center",
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "UserPostList" ? (
        <Stack.Screen name={"UserPostList"} component={UserPostList} />
      ) : null}
      {screenName === "CompanyPostAll" ? (
        <Stack.Screen name={"CompanyPostAll"} component={CompanyPostAll} />
      ) : null}
      {screenName === "FavoritesNav" ? (
        <Stack.Screen name={"FavoritesNav"} component={FavoritesNav} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
    </Stack.Navigator>
  );
}
