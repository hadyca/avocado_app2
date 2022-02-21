import React, { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import PostFormButton from "../../../../Components/Post/PostFormButton";
import { categories } from "../../../../Constant";

const Container = styled.View``;

const TopScroll = styled.ScrollView`
  background-color: ${colors.borderThin};
`;

const CategoryTouch = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  border: 1px ${colors.borderThick} solid;
  border-radius: 5px;
  margin: 10px 10px 10px ${(props) => (props.first ? 10 : 0)}px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  text-align: center;
`;

const BottomView = styled.View``;

const FetchView = styled.View`
  bottom: 100px;
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
    <>
      <Container>
        <TopScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <CategoryTouch
              first={index === 0}
              key={index}
              onPress={() => goToCategoryScreen(item)}
            >
              <CategoryText>{item}</CategoryText>
            </CategoryTouch>
          ))}
        </TopScroll>
        <FlatList
          ref={ref}
          onEndReachedThreshold={0.05}
          onEndReached={handleFetch}
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data?.seeAllUserPosts}
          keyExtractor={(item) => "" + item.id}
          renderItem={renderPost}
        />
        {fetchLoading ? (
          <FetchView>
            <ActivityIndicator color="black" />
          </FetchView>
        ) : null}
      </Container>
      <PostFormButton onPress={goToUserPostForm} />
    </>
  );
}
