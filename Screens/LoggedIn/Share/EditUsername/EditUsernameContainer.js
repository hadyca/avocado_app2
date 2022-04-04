import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_USERNAME_MUTATION } from "./EditUsernameQueries";
import EditUsernamePresenter from "./EditUsernamePresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(params.username.length);
  const [betweenTimeDay, SetBetweenTimeDay] = useState(0);
  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const updateUsername = (cache, result) => {
    const {
      data: { editProfile },
    } = result;
    if (editProfile.id) {
      const UserId = `User:${editProfile.id}`;
      cache.modify({
        id: UserId,
        fields: {
          username() {
            return editProfile.username;
          },
        },
      });
      navigation.navigate("EditProfile", {
        username: editProfile.username,
      });
    }
  };

  const [editUsernameMutation, { loading }] = useMutation(
    EDIT_USERNAME_MUTATION,
    {
      update: updateUsername,
    }
  );

  const today = new Date();
  const todayTime = today.getTime();
  const getDate = params.usernameEditDate;
  if (getDate !== null) {
    const betweenTime = Math.floor((todayTime - getDate.getTime()) / 1000 / 60);
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    SetBetweenTimeDay(betweenTimeDay);
  }
  console.log(todayTime);
  console.log(betweenTimeDay);
  return (
    <ScreenLayout>
      <EditUsernamePresenter
        editUsernameMutation={editUsernameMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originUsername={params.username}
        todayTime={todayTime}
        betweenTimeDay={betweenTimeDay}
      />
    </ScreenLayout>
  );
}
