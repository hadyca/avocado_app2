import React from "react";
import { Alert } from "react-native";
import ScreenLayout from "../../Components/ScreenLayout";
import { gql, useMutation } from "@apollo/client";
import { userPostCommentReportAry } from "../../constant";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";

const REPORT_MUTATION = gql`
  mutation userPostReCommentReport(
    $userPostReCommentId: Int!
    $reason: String!
  ) {
    userPostReCommentReport(
      userPostReCommentId: $userPostReCommentId
      reason: $reason
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View``;
const TitleView = styled.View`
  padding: 25px 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;
const TitleText = styled.Text`
  font-weight: bold;
`;

const ReportView = styled.TouchableOpacity`
  padding: 25px 15px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ReportText = styled.Text``;

export default function UserPostReCommentReportForm({ route: { params } }) {
  const navigation = useNavigation();
  const goReportUserPostComment = () => {
    Alert.alert("신고해주셔서 감사합니다.");
    navigation.pop();
  };
  const [reportReCommentMutation, { loading }] = useMutation(REPORT_MUTATION, {
    update: goReportUserPostComment,
  });

  const goToReport = (item) => {
    reportReCommentMutation({
      variables: {
        userPostReCommentId: parseInt(params.id),
        reason: item,
      },
    });
  };
  const handleReport = (item) => {
    Alert.alert("신고하시겠습니까?", "", [
      { text: "Cancel" },
      {
        text: "Ok",
        onPress: () => goToReport(item),
      },
    ]);
  };

  return (
    <ScreenLayout>
      <Container>
        <TitleView>
          <TitleText>댓글을 신고하는 이유를 선택해주세요!.</TitleText>
        </TitleView>
        {userPostCommentReportAry.map((item, index) => (
          <ReportView key={index} onPress={() => handleReport(item)}>
            <ReportText>{item}</ReportText>
          </ReportView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
