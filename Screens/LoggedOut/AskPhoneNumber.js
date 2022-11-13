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
import ProgressCreateCompany from "../../Components/Auth/ProgressCreateCompany";
import CreateAccountLayout from "../../Components/CreateAccountLayout";

export default function AskPhoneNumber({ route: { params } }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const phoneInput = useRef();

  return (
    // <AuthLayout>
    //   <Subtitle>{t("createAccount.12")}</Subtitle>
    //   {showMessage && (
    //     <View>
    //       <Text>Value : {value}</Text>
    //       <Text>Formatted Value : {formattedValue}</Text>
    //       <Text>Valid : {valid ? "true" : "false"}</Text>
    //     </View>
    //   )}
    //   <PhoneInput
    //     containerStyle={{
    //       width: "100%",
    //       backgroundColor: colors.greyBackround,
    //     }}
    //     // textInputStyle={{ color: "blue" }}
    //     // textContainerStyle={{ backgroundColor: "red" }}
    //     filterProps={{ placeholder: t("createAccount.14") }}
    //     ref={phoneInput}
    //     defaultValue={value}
    //     placeholder={t("createAccount.13")}
    //     defaultCode="VN"
    //     layout="first"
    //     onChangeText={(text) => {
    //       setValue(text);
    //     }}
    //     onChangeFormattedText={(text) => {
    //       setFormattedValue(text);
    //     }}
    //   />
    //   <TouchableOpacity
    //     onPress={() => {
    //       const checkValid = phoneInput.current?.isValidNumber(value);
    //       setShowMessage(true);
    //       setValid(checkValid ? checkValid : false);
    //     }}
    //   >
    //     <Text>Check</Text>
    //   </TouchableOpacity>
    // </AuthLayout>
    <CreateAccountLayout step={"1"}>
      <ProgressCreateCompany title={t("askCompanyName.1")} />
      <PhoneInput
        containerStyle={{
          width: "100%",
          backgroundColor: colors.greyBackround,
        }}
        // textInputStyle={{ color: "blue" }}
        // textContainerStyle={{ backgroundColor: "red" }}
        filterProps={{ placeholder: t("createAccount.14") }}
        ref={phoneInput}
        defaultValue={value}
        placeholder={t("createAccount.13")}
        defaultCode="VN"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
      />
      <AuthButton
        text={t("askCompanyName.2")}
        // disabled={!formState.isValid}
        loading={false}
        onPress={() => console.log("Hehe")}
      />
    </CreateAccountLayout>
  );
}
