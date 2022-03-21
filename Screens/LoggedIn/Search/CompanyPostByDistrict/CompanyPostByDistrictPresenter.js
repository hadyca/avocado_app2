import React from "react";
import { FlatList, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import ExplainCategory from "../../../../Components/Post/ExplainCategory";
import { colors } from "../../../../Colors";

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

const ExplainView = styled.View`
  margin: 0px 0px 10px 10px;
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
export default function CompanyPostByDistrictPresenter({
  width,
  height,
  goToCompanyPostForm,
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
        // ListHeaderComponent={
        //   <>
        //     <ImgContainer>
        //       <MainImg
        //         resizeMode="cover"
        //         source={{
        //           uri: "https://images.unsplash.com/photo-1641729297455-bf88ac511bc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        //         }}
        //         width={width}
        //         height={height}
        //       />
        //     </ImgContainer>
        //     <CategoryText>{category}</CategoryText>
        //     <ExplainView>
        //       <ExplainCategory categoryName={category} />
        //     </ExplainView>
        //     <WriteTextLink onPress={goToCompanyPostForm}>
        //       <WriteText>이 주제로 글쓰기</WriteText>
        //     </WriteTextLink>
        //     <Separator />
        //   </>
        // }
        onEndReachedThreshold={0.05}
        onEndReached={handleFetch}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCompanyPostByDistrict}
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
