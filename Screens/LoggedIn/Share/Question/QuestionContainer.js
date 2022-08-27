import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { QUESTION_MUTATION } from "./QuestionQueries";
import QuestionPresenter from "./QuestionPresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const goToBack = () => {
    Alert.alert("접수 되었습니다. \n빠른 시일 내에 답변 드리겠습니다.");
    navigation.pop();
  };

  const [questionMutation, { loading }] = useMutation(QUESTION_MUTATION, {
    onCompleted: goToBack,
  });

  return (
    <QuestionPresenter questionMutation={questionMutation} loading={loading} />
  );
}
