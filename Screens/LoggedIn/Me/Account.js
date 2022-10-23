import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";
import { logUserOut } from "../../../apollo";

const AccountText = styled.Text`
  background-color: ${colors.backgraound};
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  margin-left: 10px;
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;
const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${colors.borderThin};
`;

const DELETE_PUSHTOKEN_MUTATION = gql`
  mutation deletePushToken($pushToken: String!) {
    deletePushToken(pushToken: $pushToken) {
      ok
      error
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(userId: $userId) {
      ok
      error
    }
  }
`;

export default function Account({ route: { params } }) {
  const [deletePushTokenMutation, { loading }] = useMutation(
    DELETE_PUSHTOKEN_MUTATION,
    {
      onCompleted: () => logUserOut(),
    }
  );

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => logUserOut(),
  });
  return (
    <ScreenLayout loading={loading}>
      <AccountText>현재 계정 {params.email}</AccountText>
      <Separator />
      <Button
        onPress={() =>
          Alert.alert("정말 로그아웃 하시겠습니까?", "", [
            { text: "Cancel" },
            {
              text: "Ok",
              onPress: async () => {
                const pushToken = (await Notifications.getExpoPushTokenAsync())
                  .data;
                await deletePushTokenMutation({
                  variables: {
                    pushToken,
                  },
                });
              },
            },
          ])
        }
      >
        <ButtonText>로그아웃</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button
        onPress={() =>
          Alert.alert("정말 탈퇴 하시겠습니까?", "", [
            { text: "Cancel" },
            {
              text: "Ok",
              onPress: async () => {
                await deleteUserMutation({
                  variables: {
                    userId: params.userId,
                  },
                });
              },
            },
          ])
        }
      >
        <ButtonText>탈퇴하기</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
    </ScreenLayout>
  );
}
