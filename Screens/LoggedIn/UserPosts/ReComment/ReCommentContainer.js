import React, { useEffect, useState } from "react";
import { NativeModules } from "react-native";
import { useQuery } from "@apollo/client";
import ReCommentPresenter from "./ReCommentPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { COMMENT_QUERY } from "./ReCommentQueries";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;

  const { data, refetch, loading } = useQuery(COMMENT_QUERY, {
    variables: {
      userPostCommentId: parseInt(params.id),
    },
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

  return (
    <ScreenLayout loading={loading}>
      <ReCommentPresenter
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        userPostId={params.userPostId}
        id={params.id}
        statusBarHeight={statusBarHeight}
      />
    </ScreenLayout>
  );
}
