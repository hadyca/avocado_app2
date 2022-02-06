import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  Text,
} from "react-native";
import ScreenLayout from "../Components/ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CategoryUserPost from "../Components/Post/CategoryUserPost";
import { CATEGORY_BOARD } from "../Constant";

const CATEGORY_BOARD_QUERY = gql`
  query seeUserCategoryPost($category: String!, $offset: Int!) {
    seeUserCategoryPost(category: $category, offset: $offset) {
      id
      user {
        username
        avatar
      }
      title
      content
      category
      totalUserPostLikes
      totalUserPostComments
      createdAt
      isMine
      file {
        fileUrl
      }
      deleted
    }
  }
`;
const ImgContainer = styled.View``;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const CategoryLink = styled.TouchableOpacity``;
const CategoryText = styled.Text``;

const FetchView = styled.View`
  bottom: 30px;
`;

export default function CategoryBoard({ route: { params } }) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(CATEGORY_BOARD_QUERY, {
    variables: {
      category: params?.category,
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
      category: params?.category,
      screenName: CATEGORY_BOARD,
    });
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ListHeaderComponent={
          <>
            <ImgContainer>
              <MainImg
                resizeMode="cover"
                source={{
                  uri: "https://images.unsplash.com/photo-1641729297455-bf88ac511bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
                }}
                width={width}
                height={height}
              />
            </ImgContainer>
            <Text>{params?.category}</Text>
            <CategoryLink onPress={goToUserPostForm}>
              <CategoryText>이 주제로 글 쓰러 가기</CategoryText>
            </CategoryLink>
          </>
        }
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeUserCategoryPost}
        keyExtractor={(post) => "" + post.id}
        renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
    </ScreenLayout>
  );
}
