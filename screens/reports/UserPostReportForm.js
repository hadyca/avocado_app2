import React from "react";
import { Text } from "react-native";
import ScreenLayout from "../../components/ScreenLayout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { userPostReportAry } from "../../constant";
import styled from "styled-components/native";
import { colors } from "../../colors";
const REPORT_MUTATION = gql`
  mutation userPostReport($userPostId: Int!) {
    userPostReport(userPostId: $userPostId) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const CategoryView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;
const CategoryView2 = styled.TouchableOpacity`
  padding: 25px 7px;
  color: black;
`;

const CategoryText = styled.Text``;

export default function UserPostReportForm() {
  const goReportUserPost = (cache, result) => {
    const {
      data: {
        deleteUserPost: { ok },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params?.id}`;
      cache.modify({
        id: UserPostId,
        fields: {
          deleted(prev) {
            return !prev;
          },
        },
      });
    }
    Alert.alert("게시글이 삭제 되었습니다.");
    navigation.pop();
  };
  const [reportPostMutation] = useMutation(REPORT_MUTATION, {
    update: goReportUserPost,
  });
  return (
    <ScreenLayout>
      <Container>
        <Text>신고내용을 써주세요</Text>
        {userPostReportAry.map((item, index) => (
          <CategoryView key={index}>
            <CategoryView2 onPress={() => selectCategory(item)}>
              <CategoryText>{item}</CategoryText>
            </CategoryView2>
          </CategoryView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
