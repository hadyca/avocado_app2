import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList, ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components/native";
import PostFormButton from "../../../../Components/Post/PostFormButton";
import { categories } from "../../../../Constant";

const Container = styled.View`
  flex: 1;
`;
const CategoryView = styled.TouchableOpacity`
  margin: 10px;
`;
const CategoryText = styled.Text``;
const FetchView = styled.View`
  bottom: 30px;
`;

export default function UserPostListPresenter({
  goToUserPostForm,
  refreshing,
  refresh,
  handleFetch,
  goToCategoryScreen,
  data,
  fetchLoading,
  renderPost,
}) {
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <Container>
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
    </Container>
  );
}
