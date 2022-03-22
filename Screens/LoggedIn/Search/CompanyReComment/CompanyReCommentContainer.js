import React, { useEffect, useState } from "react";
import { Alert, NativeModules } from "react-native";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import CompanyReCommentPresenter from "./CompanyReCommentPresenter";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { COMMENT_QUERY } from "./CompanyReCommentQueries";

export default function ({ route: { params } }) {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;
  const navigation = useNavigation();
  const { data, refetch, loading, error } = useQuery(COMMENT_QUERY, {
    variables: {
      companyPostCommentId: parseInt(params.id),
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

  useEffect(() => {
    if (error) {
      Alert.alert("코멘트가 삭제되었습니다.");
      navigation.pop();
    }
  }, [error]);

  return (
    <ScreenLayout loading={loading}>
      <CompanyReCommentPresenter
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        companyPostId={params.companyPostId}
        id={params.id}
        statusBarHeight={statusBarHeight}
      />
    </ScreenLayout>
  );
}
