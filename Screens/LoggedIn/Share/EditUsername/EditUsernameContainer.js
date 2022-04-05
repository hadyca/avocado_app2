import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_USERNAME_MUTATION } from "./EditUsernameQueries";
import EditUsernamePresenter from "./EditUsernamePresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(params.username.length);
  const [errorMessage, setErrorMessage] = useState(null);
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
        bio: params.bio,
      });
    }
  };

  const [editUsernameMutation, { loading }] = useMutation(
    EDIT_USERNAME_MUTATION,
    {
      update: updateUsername,
      onError: (error) => setErrorMessage(error.message),
    }
  );

  const today = new Date().getTime();

  return (
    <ScreenLayout>
      <EditUsernamePresenter
        editUsernameMutation={editUsernameMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originUsername={params.username}
        today={today}
        errorMessage={errorMessage}
      />
    </ScreenLayout>
  );
}
