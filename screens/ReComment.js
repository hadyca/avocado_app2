import React from "react";
import { Text } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import UserPostComment from "../components/post/UserPostComment";
import ScreenLayout from "../components/ScreenLayout";

export default function ReComment({ route: { params } }) {
  return (
    <ScreenLayout>
      <UserPostComment
        userPostId={params?.userPostId}
        id={params?.id}
        user={params?.user}
        payload={params?.payload}
        isMine={params?.isMine}
        createdAt={params?.createdAt}
      />
    </ScreenLayout>
  );
}
