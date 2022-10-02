import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NOTI_USER_POST_LIKE_MUTATION } from "./NotificationSettingQueries";
import NotificationSettingPresenter from "./NotificationSettingPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function () {
  const navigation = useNavigation();

  const [userPostLikeMutation, { loading }] = useMutation(
    NOTI_USER_POST_LIKE_MUTATION
  );

  return (
    <ScreenLayout>
      <NotificationSettingPresenter
        userPostLikeMutation={userPostLikeMutation}
      />
    </ScreenLayout>
  );
}
