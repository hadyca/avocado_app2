import React from "react";
import { FlatList, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import ExplainCategory from "../../../../Components/Post/ExplainCategory";

const ImgContainer = styled.View``;

const MainImg = styled.Image`
  margin-top: 5px;
  width: ${(props) => props.width}px;
  height: ${(props) => Math.ceil(props.height / 3)}px;
`;

const CategoryText = styled.Text`
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
`;
const CategoryContent = styled.Text``;
const WriteTextLink = styled.TouchableOpacity``;
const WriteText = styled.Text``;

const FetchView = styled.View`
  bottom: 30px;
`;
export default function CategoryBoardPresenter({
  width,
  height,
  category,
  goToUserPostForm,
  handleFetch,
  refreshing,
  refresh,
  data,
  renderPost,
  fetchLoading,
}) {
  return (
    <>
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
            <CategoryText>{category}</CategoryText>
            <ExplainCategory categoryName={category} />
            <WriteTextLink onPress={goToUserPostForm}>
              <WriteText>이 주제로 글쓰기</WriteText>
            </WriteTextLink>
          </>
        }
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeUserCategoryPost}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderPost}
      />
      {fetchLoading ? (
        <FetchView>
          <ActivityIndicator color="black" />
        </FetchView>
      ) : null}
    </>
  );
}
