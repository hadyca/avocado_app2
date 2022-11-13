import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-native-phone-number-input";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";
import FormError from "../../Components/Auth/FormError";
import { Subtitle } from "../../Components/Auth/Subtitle";
import { TextInput } from "../../Components/Auth/AuthShared";
import { emailRule, passwordRule, usernameRule } from "../../RegExp";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../Colors";

export default function AskUsername({ route: { params } }) {
  const { t } = useTranslation();
  return <AuthLayout></AuthLayout>;
}
