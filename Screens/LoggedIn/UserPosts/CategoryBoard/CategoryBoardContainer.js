import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import CategoryUserPost from "../../../../Components/Post/CategoryUserPost";
import { CATEGORY_BOARD } from "../../../../Constant";
import { CATEGORY_BOARD_QUERY } from "./CategoryBoardQueries";
import CategoryBoardPresenter from "./CategoryBoardPresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(CATEGORY_BOARD_QUERY, {
    variables: {
      category: params.category,
      offset: 0,
    },
  });
  const { width, height } = useWindowDimensions();

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <CategoryUserPost {...item} />;
    } else {
      return null;
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFetch = async () => {
    if (loading) {
      return;
    } else {
      setFetchLoading(true);
      await fetchMore({
        variables: {
          offset: data?.seeUserCategoryPost?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToUserPostForm = () => {
    return navigation.navigate("UserPostUploadForm", {
      category: params.category,
      screenName: CATEGORY_BOARD,
    });
  };

  useEffect(() => {
    refetch();
  }, [params]);

  return (
    <ScreenLayout loading={loading}>
      <CategoryBoardPresenter
        width={width}
        height={height}
        category={params.category}
        goToUserPostForm={goToUserPostForm}
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        renderPost={renderPost}
        fetchLoading={fetchLoading}
      />
    </ScreenLayout>
  );
}
