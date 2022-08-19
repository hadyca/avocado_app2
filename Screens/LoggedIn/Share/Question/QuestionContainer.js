import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { QUESTION_MUTATION } from "./QuestionQueries";
import QuestionPresenter from "./QuestionPresenter";
import useMe from "../../../../Hooks/useMe";

export default function ({ route: { params } }) {
  const { data: userData } = useMe();
  const navigation = useNavigation();

  const [questionMutation, { loading }] = useMutation(QUESTION_MUTATION, {
    onCompleted: () => navigation.pop(),
  });

  return (
    <ScreenLayout loading={loading}>
      <QuestionPresenter
        questionMutation={questionMutation}
        loading={loading}
        email={userData?.email}
      />
    </ScreenLayout>
  );
}
