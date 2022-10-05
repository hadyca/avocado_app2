import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {
  NOTIFICATION_QUERY,
  NOTI_NOTICE_MUTATION,
  NOTI_USER_POST_LIKE_MUTATION,
  NOTI_USER_POST_COMMENT_MUTATION,
  NOTI_COMPANY_POST_LIKE_MUTATION,
  NOTI_COMPANY_POST_COMMENT_MUTATION,
  NOTI_FOLLOWING_MUTATION,
} from "./NotificationSettingQueries";
import NotificationSettingPresenter from "./NotificationSettingPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";

export default function () {
  const [screenLoading, setScreenLoading] = useState(true);
  const [noticeState, setNoticeState] = useState();
  const [userPostLikeState, setUserPostLikeState] = useState();
  const [userPostCommentState, setUserPostCommentState] = useState();
  const [companyPostLikeState, setCompanyPostLikeState] = useState();
  const [companyPostCommentState, setCompanyPostCommentState] = useState();
  const [followingState, setFollowingState] = useState();

  const { data } = useQuery(NOTIFICATION_QUERY);

  const [noticeMutation] = useMutation(NOTI_NOTICE_MUTATION);
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

  const noticeToggle = () => {
    setNoticeState((prev) => !prev);
    noticeMutation({
      variables: {
        state: !noticeState,
      },
    });
  };
  const userPostLikeToggle = () => {
    setUserPostLikeState((prev) => !prev);
    userPostLikeMutation({
      variables: {
        state: !userPostLikeState,
      },
    });
  };
  const userPostCommentToggle = () => {
    setUserPostCommentState((prev) => !prev);
    userPostCommentMutation({
      variables: {
        state: !userPostCommentState,
      },
    });
  };
  const companyPostLikeToggle = () => {
    setCompanyPostLikeState((prev) => !prev);
    companyPostLikeMutation({
      variables: {
        state: !companyPostLikeState,
      },
    });
  };
  const companyPostCommentToggle = () => {
    setCompanyPostCommentState((prev) => !prev);
    companyPostCommentMutation({
      variables: {
        state: !companyPostCommentState,
      },
    });
  };

  const followingToggle = () => {
    setFollowingState((prev) => !prev);
    followingMutation({
      variables: {
        state: !followingState,
      },
    });
  };

  useEffect(() => {
    if (data?.seeNotificationTypeState) {
      setNoticeState(data?.seeNotificationTypeState?.notice);
      setUserPostLikeState(data?.seeNotificationTypeState?.userPostLike);
      setUserPostCommentState(data?.seeNotificationTypeState?.userPostComment);
      setCompanyPostLikeState(data?.seeNotificationTypeState?.CompanyPostLike);
      setCompanyPostCommentState(
        data?.seeNotificationTypeState?.CompanyPostComment
      );
      setFollowingState(data?.seeNotificationTypeState?.following);
    }
  }, [data]);
  return (
    <ScreenLayout>
      <NotificationSettingPresenter
        noticeToggle={noticeToggle}
        userPostLikeToggle={userPostLikeToggle}
        userPostCommentToggle={userPostCommentToggle}
        companyPostLikeToggle={companyPostLikeToggle}
        companyPostCommentToggle={companyPostCommentToggle}
        followingToggle={followingToggle}
        noticeState={noticeState}
        userPostLikeState={userPostLikeState}
        userPostCommentState={userPostCommentState}
        companyPostLikeState={companyPostLikeState}
        companyPostCommentState={companyPostCommentState}
        followingState={followingState}
      />
    </ScreenLayout>
  );
}
