import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CONTACT_MUTATION } from "./ContactQueries";
import ContactPresenter from "./ContactPresenter";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const goToBack = () => {
    Alert.alert("접수 되었습니다. \n빠른 시일 내에 답변 드리겠습니다.");
    navigation.pop();
  };

  const [contactMutation, { loading }] = useMutation(CONTACT_MUTATION, {
    onCompleted: goToBack,
  });

  return (
    <ContactPresenter contactMutation={contactMutation} loading={loading} />
  );
}
