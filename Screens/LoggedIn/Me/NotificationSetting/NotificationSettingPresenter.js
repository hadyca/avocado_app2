import React, { useEffect, useState } from "react";
import { Switch, SwitchBase, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../Colors";
const Container = styled.View``;

const StateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;
const StateText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;
const Separator = styled.View`
  height: 1px;
  background-color: ${colors.borderThin};
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
  isCompany,
}) {
  return (
    <Container>
      <StateView>
        <StateText>공지 / 이벤트</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={noticeToggle}
          value={noticeState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      <StateView>
        <StateText>일반게시판 좋아요</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={userPostLikeToggle}
          value={userPostLikeState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      <StateView>
        <StateText>일반게시판 코멘트</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={userPostCommentToggle}
          value={userPostCommentState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
      {isCompany && (
        <>
          <StateView>
            <StateText>채용게시판 좋아요</StateText>
            <Switch
              trackColor={{
                false: colors.greyBackround,
                true: colors.buttonBackground,
              }}
              thumbColor={"#ffffff"}
              ios_backgroundColor={colors.greyBackround}
              onValueChange={companyPostLikeToggle}
              value={companyPostLikeState}
              style={{ marginRight: 10 }}
            />
          </StateView>
          <Separator />
          <StateView>
            <StateText>채용게시판 코멘트</StateText>
            <Switch
              trackColor={{
                false: colors.greyBackround,
                true: colors.buttonBackground,
              }}
              thumbColor={"#ffffff"}
              ios_backgroundColor={colors.greyBackround}
              onValueChange={companyPostCommentToggle}
              value={companyPostCommentState}
              style={{ marginRight: 10 }}
            />
          </StateView>
          <Separator />
        </>
      )}
      <StateView>
        <StateText>팔로잉</StateText>
        <Switch
          trackColor={{
            false: colors.greyBackround,
            true: colors.buttonBackground,
          }}
          thumbColor={"#ffffff"}
          ios_backgroundColor={colors.greyBackround}
          onValueChange={followingToggle}
          value={followingState}
          style={{ marginRight: 10 }}
        />
      </StateView>
      <Separator />
    </Container>
  );
}
