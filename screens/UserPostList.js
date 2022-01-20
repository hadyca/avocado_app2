import React, { useState, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, ActivityIndicator, Text } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import UserPost from "../components/post/UserPost";
import { useNavigation } from "@react-navigation/native";
import PostFormButton from "../components/post/PostFormButton";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { categories } from "../constant";
import { categoriesScreen } from "../constant";

const POST_QUERY = gql`
  query seeAllUserPosts($offset: Int!) {
    seeAllUserPosts(offset: $offset) {
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

const CategoryView = styled.TouchableOpacity`
  margin: 10px;
`;
const CategoryText = styled.Text``;
const FetchView = styled.View`
  bottom: 30px;
`;

export default function UserPostList() {
  const ref = useRef(null);
  useScrollToTop(ref);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(POST_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const goToUserPostForm = () => {
    return navigation.navigate("UserPostUploadForm", {
      screenName: "UserPostList",
    });
  };

  const renderPost = ({ item }) => {
    if (item.deleted === false) {
      return <UserPost {...item} />;
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
          offset: data?.seeAllUserPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  const goToCategoryScreen = (item) => {
    navigation.navigate("CategoryBoard", {
      category: item,
    });
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "grey", maxHeight: 50 }}
      >
        {categories.map((item, index) => (
          <CategoryView key={index} onPress={() => goToCategoryScreen(item)}>
            <CategoryText>{item}</CategoryText>
          </CategoryView>
        ))}
      </ScrollView>

      <FlatList
        ref={ref}
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeAllUserPosts}
        keyExtractor={(post) => "" + post.id}
        renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
      <PostFormButton onPress={goToUserPostForm} />
    </ScreenLayout>
  );
}
