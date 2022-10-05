import React, { useEffect, useState } from "react";
import { Switch, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
const Container = styled.View``;

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
  margin-left: 10px;
`;
const StateText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

export default function NotificationSettingPresenter({
  noticeToggle,
  userPostLikeToggle,
  userPostCommentToggle,
  companyPostLikeToggle,
  companyPostCommentToggle,
  followingToggle,
  noticeState,
  userPostLikeState,
  userPostCommentState,
  companyPostLikeState,
  companyPostCommentState,
  followingState,
}) {
  return (
    <Container>
      <StateView>
        <StateText>공지사항</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={noticeToggle}
          value={noticeState}
        />
      </StateView>
      {/* <Text>유저게시글좋아요</Text>
      <Switch
        trackColor={{
          false: colors.greyBackround,
          true: colors.buttonBackground,
        }}
        thumbColor={"#ffffff"}
        ios_backgroundColor={colors.greyBackround}
        onValueChange={userPostLikeToggle}
        value={userPostLikeState}
      /> */}
    </Container>
  );
}
