import React from "react";
import { FlatList, ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
import PostFormButton from "../../../../Components/Post/PostFormButton";

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
  addressStep2,
  goToCompanyPostForm,
  handleFetch,
  refreshing,
  refresh,
  data,
  renderPost,
  fetchLoading,
  companyOwner,
}) {
  return (
    <>
      <Text>{addressStep2}</Text>
      <FlatList
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
      {companyOwner ? <PostFormButton onPress={goToCompanyPostForm} /> : null}
    </>
  );
}
