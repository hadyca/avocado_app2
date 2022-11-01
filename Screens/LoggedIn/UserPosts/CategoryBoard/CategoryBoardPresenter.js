import React from "react";
import { FlatList, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { categories } from "../../../../Constant";
import { colors } from "../../../../Colors";

const ImgContainer = styled.View``;

const MainImg = styled.Image`
  width: 100%;
  height: ${(props) => Math.floor(props.height * 0.3)}px;
`;

const TopContainer = styled.View``;
const CategoryText = styled.Text`
  margin: 10px;
  font-weight: bold;
`;

const WriteTextLink = styled.TouchableOpacity`
  background-color: ${colors.buttonBackground};
  border-radius: 20px;
  margin: 0px 10px;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;
const WriteText = styled.Text`
  color: white;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
  margin-top: 10px;
`;

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
            {categories.map((item, index) =>
              item.id === category ? (
                <TopContainer key={index}>
                  <ImgContainer>
                    <MainImg
                      resizeMode="cover"
                      source={{
                        uri: item.url,
                      }}
                      width={width}
                      height={height}
                    />
                  </ImgContainer>
                  <CategoryText>{item.content}</CategoryText>
                </TopContainer>
              ) : null
            )}
            <WriteTextLink onPress={goToUserPostForm}>
              <WriteText>이 주제로 글쓰기</WriteText>
            </WriteTextLink>
            <Separator />
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
