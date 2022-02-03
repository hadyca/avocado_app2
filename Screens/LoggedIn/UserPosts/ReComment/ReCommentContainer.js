import React, { useEffect, useState } from "react";
import { NativeModules } from "react-native";
import { useQuery } from "@apollo/client";
import ReCommentPresenter from "./ReCommentPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";
import UserPostComment from "../../../../Components/Post/UserPostComment";
import { COMMENT_QUERY } from "./ReCommentQueries";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [commentRefetching, setCommentRefetching] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;

  const { data, refetch, loading, networkStatus } = useQuery(COMMENT_QUERY, {
    variables: {
      userPostCommentId: parseInt(params.id),
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);

  const refresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (networkStatus === 4) {
      setCommentRefetching(true);
    } else {
      setCommentRefetching(false);
    }
  }, [networkStatus]);

  return (
    <ScreenLayout loading={networkStatus === 1}>
      <ReCommentPresenter
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        userPostId={params.userPostId}
        id={params.id}
        statusBarHeight={statusBarHeight}
        refetch={refetch}
        commentRefetching={commentRefetching}
      />
    </ScreenLayout>
  );
}
