import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, NativeModules } from "react-native";
import CommentForm from "../components/post/CommentForm";
import UserPostComment from "../components/post/UserPostComment";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyBoard";

const Container = styled.View`
  flex: 1;
`;

export default function ReComment({ route: { params } }) {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const { StatusBarManager } = NativeModules;
  useEffect(() => {
    Platform.OS == "ios"
      ? StatusBarManager.getHeight((statusBarFrameData) => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  return (
    <ScreenLayout>
      <DismissKeyboard>
        <Container>
          <UserPostComment
            userPostId={params?.userPostId}
            id={params?.id}
            user={params?.user}
            payload={params?.payload}
            isMine={params?.isMine}
            createdAt={params?.createdAt}
            screenName="ReComment"
          />
        </Container>
      </DismissKeyboard>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={statusBarHeight + 20}
        // keyboardVerticalOffset={300}
      >
        <CommentForm userPostId={parseInt(params?.id)} />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
