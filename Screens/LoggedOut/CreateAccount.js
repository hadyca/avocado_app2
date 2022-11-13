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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($email: String!, $username: String!) {
    createAccount(email: $email, username: $username) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ route: { params } }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [focus4, setFocus4] = useState(false);
  const navigation = useNavigation();
  const { control, handleSubmit, getValues, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    const { email, username, password } = getValues();
    if (!ok) {
      return setError("result", {
        message: error === "100" ? t("createAccount.9") : t("createAccount.10"),
      });
    } else {
      return navigation.navigate("ConfirmSecret", {
        email,
        username,
        password,
        pushToken: params.pushToken,
        language: params.language,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const phoneInput = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <Subtitle>{t("createAccount.12")}</Subtitle>
      {showMessage && (
        <View>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? "true" : "false"}</Text>
        </View>
      )}
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
      <TouchableOpacity
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          setShowMessage(true);
          setValid(checkValid ? checkValid : false);
        }}
      >
        <Text>Check</Text>
      </TouchableOpacity>
      <Controller
        name="email"
        rules={{
          required: t("createAccount.11"),
          pattern: {
            value: emailRule,
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder={t("createAccount.1")}
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onChange={clearLoginError}
            hasError={Boolean(formState?.errors?.email)}
            onFocus={() => {
              setFocus1(true);
            }}
            onBlur={() => {
              setFocus1(false);
            }}
            focus={focus1}
          />
        )}
      />
      <FormError message={formState?.errors?.email?.message} />

      <Controller
        name="username"
        rules={{
          required: t("createAccount.11"),
          pattern: {
            value: usernameRule,
            message: t("createAccount.6"),
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={usernameRef}
            placeholder={t("createAccount.2")}
            placeholderTextColor="#cccccc"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => onChange(text)}
            value={value}
            hasError={Boolean(formState?.errors?.username?.message)}
            onChange={clearLoginError}
            onFocus={() => {
              setFocus2(true);
            }}
            onBlur={() => {
              setFocus2(false);
            }}
            focus={focus2}
          />
        )}
      />
      <FormError message={formState?.errors?.username?.message} />

      <Controller
        name="password"
        rules={{
          required: t("createAccount.11"),
          pattern: {
            value: passwordRule,
            message: t("createAccount.7"),
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={passwordRef}
            placeholder={t("createAccount.3")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="next"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={() => onNext(password2Ref)}
            hasError={Boolean(formState?.errors?.password?.message)}
            onFocus={() => {
              setFocus3(true);
            }}
            onBlur={() => {
              setFocus3(false);
            }}
            focus={focus3}
          />
        )}
      />
      <FormError message={formState?.errors?.password?.message} />

      <Controller
        name="password2"
        rules={{
          required: t("createAccount.11"),
          validate: {
            checkAgain: () => {
              const { password, password2 } = getValues();
              return password === password2 || t("createAccount.8");
            },
          },
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={password2Ref}
            placeholder={t("createAccount.4")}
            placeholderTextColor="#cccccc"
            secureTextEntry
            returnKeyType="done"
            autoCapitalize="none"
            onChangeText={(text) => onChange(text)}
            value={value || ""}
            onSubmitEditing={handleSubmit(onValid)}
            hasError={Boolean(formState?.errors?.password2?.message)}
            onFocus={() => {
              setFocus4(true);
            }}
            onBlur={() => {
              setFocus4(false);
            }}
            focus={focus4}
          />
        )}
      />
      <FormError message={formState?.errors?.password2?.message} />

      <AuthButton
        text={t("createAccount.5")}
        disabled={!formState.isValid}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
      <FormError message={formState?.errors?.result?.message} />
    </AuthLayout>
  );
}
