import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import ScreenLayout from "../../../Components/ScreenLayout";
import { userReportAry } from "../../../Constant";
import { colors } from "../../../Colors";

const REPORT_MUTATION = gql`
  mutation userReport($userId: Int!, $reason: String!) {
    userReport(userId: $userId, reason: $reason) {
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

const ReportContainer = styled.View``;
const ReportView = styled.TouchableOpacity`
  padding: 18px 15px;
  color: black;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderThin};
`;

const ReportText = styled.Text``;

export default function UserReportForm({ route: { params } }) {
  const navigation = useNavigation();
  const goReportUser = () => {
    Alert.alert("신고해주셔서 감사합니다.");
    navigation.pop();
  };
  const [reportUserMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportUser,
  });

  const goToReport = (item) => {
    reportUserMutation({
      variables: {
        userId: parseInt(params.id),
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
          <TitleText>유저를 신고하는 이유를 선택해 주세요.</TitleText>
        </TitleView>
        {userReportAry.map((item, index) => (
          <ReportContainer key={index}>
            <ReportView onPress={() => handleReport(item)}>
              <ReportText>{item}</ReportText>
            </ReportView>
            <Separator />
          </ReportContainer>
        ))}
      </Container>
    </ScreenLayout>
  );
}
