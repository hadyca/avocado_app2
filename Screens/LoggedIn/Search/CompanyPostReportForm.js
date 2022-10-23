import React from "react";
import { Alert } from "react-native";
import ScreenLayout from "../../../Components/ScreenLayout";
import { gql, useMutation } from "@apollo/client";
import { companyPostReportAry } from "../../../Constant";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";

const REPORT_MUTATION = gql`
  mutation companyPostReport($companyPostId: Int!, $reason: String!) {
    companyPostReport(companyPostId: $companyPostId, reason: $reason) {
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

export default function CompanyPostReportForm({ route: { params } }) {
  const navigation = useNavigation();
  const goReportCompanyPost = () => {
    Alert.alert("신고해주셔서 감사합니다.");
    navigation.pop();
  };
  const [reportPostMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportCompanyPost,
  });

  const goToReport = (item) => {
    reportPostMutation({
      variables: {
        companyPostId: parseInt(params.id),
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
          <TitleText>게시글을 신고하는 이유를 선택해 주세요.</TitleText>
        </TitleView>
        {companyPostReportAry.map((item, index) => (
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
