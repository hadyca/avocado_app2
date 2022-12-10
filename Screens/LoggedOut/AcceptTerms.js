import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import * as WebBrowser from "expo-web-browser";
import AuthButton from "../../Components/Auth/AuthButton";
import { logUserIn } from "../../apollo";
import CreateAccountLayout from "../../Components/CreateAccountLayout";
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation finalStepAccount(
    $password: String!
    $email: String!
    $username: String!
    $language: String!
    $pushToken: String!
  ) {
    finalStepAccount(
      password: $password
      email: $email
      username: $username
      language: $language
      pushToken: $pushToken
    ) {
      ok
      error
      token
    }
  }
`;

const Contents = styled.View`
  flex-direction: row;
`;

const Content = styled.Text``;
const Button = styled.TouchableOpacity``;
const ButtonText = styled.Text`
  font-size: 50px;
  text-decoration: underline;
`;

export default function AcceptTerms({ route: { params } }) {
  const { t, i18n } = useTranslation();

  const onCompleted = async (data) => {
    const {
      finalStepAccount: { ok, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: t("share.5"),
      });
    } else {
      await logUserIn(token);
    }
  };

  const [finalStepAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const handleSubmit = () => {
    if (!loading) {
      finalStepAccountMutation({
        variables: {
          password: params.password,
          email: params.email,
          username: params.username,
          language: params.language,
          pushToken: params.pushToken,
        },
      });
    }
  };

  return (
    <CreateAccountLayout step={5}>
      <ProgressCreateCompany title={t("askPassword.1")} />
      <Contents>
        <Content>내용 내용</Content>
        <Button
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://vinaarba.notion.site/4b8d0b7e8b8043e3aeea3d93609ab847"
            )
          }
        >
          <ButtonText>랄랄라</ButtonText>
        </Button>
        <Content>내용 내용</Content>
      </Contents>
      <AuthButton
        text={t("share.3")}
        disabled={false}
        loading={loading}
        onPress={handleSubmit}
      />
    </CreateAccountLayout>
  );
}
