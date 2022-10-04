import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {
  NOTIFICATION_QUERY,
  NOTI_USER_POST_LIKE_MUTATION,
  NOTI_COMPANY_POST_COMMENT_MUTATION,
  NOTI_COMPANY_POST_LIKE_MUTATION,
  NOTI_USER_POST_COMMENT_MUTATION,
  NOTI_FOLLOWING_MUTATION,
} from "./NotificationSettingQueries";
import NotificationSettingPresenter from "./NotificationSettingPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function () {
  const [userPostLikeState, setUserPostLikeState] = useState();
  const navigation = useNavigation();
  const { data } = useQuery(NOTIFICATION_QUERY);
  const [userPostLikeMutation] = useMutation(NOTI_USER_POST_LIKE_MUTATION);
  const [userPostCommentMutation] = useMutation(
    NOTI_USER_POST_COMMENT_MUTATION
  );
  const [companyPostLikeMutation] = useMutation(
    NOTI_COMPANY_POST_LIKE_MUTATION
  );
  const [companyPostCommentMutation] = useMutation(
    NOTI_COMPANY_POST_COMMENT_MUTATION
  );
  const [followingMutation] = useMutation(NOTI_FOLLOWING_MUTATION);

  const toggleSwitch = () => {
    setUserPostLikeState((prev) => !prev);
    userPostLikeMutation({
      variables: {
        state: userPostLikeState,
      },
    });
  };
  useEffect(() => {
    if (data?.seeNotificationTypeState) {
      setUserPostLikeState(data?.seeNotificationTypeState?.userPostLike);
    }
  }, [data]);
  return (
    <ScreenLayout>
      <NotificationSettingPresenter
        userPostLikeMutation={userPostLikeMutation}
        userPostCommentMutation={userPostCommentMutation}
        companyPostLikeMutation={companyPostLikeMutation}
        companyPostCommentMutation={companyPostCommentMutation}
        followingMutation={followingMutation}
        toggleSwitch={toggleSwitch}
        userPostLikeState={userPostLikeState}
      />
    </ScreenLayout>
  );
}
