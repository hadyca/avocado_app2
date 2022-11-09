import React from "react";
import { Alert } from "react-native";
import ScreenLayout from "../../../Components/ScreenLayout";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { userPostCommentReportAry } from "../../../Constant";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import { useNavigation } from "@react-navigation/native";

const REPORT_MUTATION = gql`
  mutation userPostCommentReport($userPostCommentId: Int!, $reason: String!) {
    userPostCommentReport(
      userPostCommentId: $userPostCommentId
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
  padding: 18px 15px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const ReportText = styled.Text``;

export default function UserPostCommentReportForm({ route: { params } }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const goReportUserPostComment = () => {
    Alert.alert(t("userPostCommentReportForm.3"));
    navigation.pop();
  };
  const [reportCommentMutation, { loading }] = useMutation(REPORT_MUTATION, {
    onCompleted: goReportUserPostComment,
  });

  const goToReport = (item) => {
    reportCommentMutation({
      variables: {
        userPostCommentId: parseInt(params.id),
        reason: item,
      },
    });
  };
  const handleReport = (item) => {
    Alert.alert(t("userPostCommentReportForm.2"), "", [
      { text: t("userPostCommentReportForm.5") },
      {
        text: t("userPostCommentReportForm.4"),
        onPress: () => goToReport(item),
      },
    ]);
  };

  return (
    <ScreenLayout>
      <Container>
        <TitleView>
          <TitleText>{t("userPostCommentReportForm.1")}</TitleText>
        </TitleView>
        {userPostCommentReportAry.map((item, index) => (
          <ReportView key={index} onPress={() => handleReport(item.valueEn)}>
            <ReportText>
              {i18n.language === "vn"
                ? item.valueVn
                : i18n.language === "en"
                ? item.valueEn
                : item.valueKo}
            </ReportText>
          </ReportView>
        ))}
      </Container>
    </ScreenLayout>
  );
}
