import React, { useEffect, useState } from "react";
import { Switch, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;

export default function NotificationSettingPresenter({
  userPostLikeMutation,
  userPostCommentMutation,
  companyPostLikeMutation,
  companyPostCommentMutation,
  followingMutation,
  toggleSwitch,
}) {
  return (
    <Container>
      <Text></Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={userPostLikeState ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={userPostLikeState}
      />
    </Container>
  );
}
