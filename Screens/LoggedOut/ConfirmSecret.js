import React from "react";
import AuthButton from "../../Components/Auth/AuthButton";
import AuthLayout from "../../Components/Auth/AuthLayout";
import { TextInput } from "../../Components/Auth/AuthShared";
import { logUserIn } from "../../apollo";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import FormError from "../../Components/Auth/FormError";
import { Alert } from "react-native";
import { Subtitle } from "../../Components/Auth/Subtitle";

const REQUEST_SECRET_MUTATION = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email) {
      ok
      error
    }
  }
`;

const CONFIRM_SECRET = gql`
  mutation confirmSecret(
    $email: String!
    $username: String!
    $password: String!
    $secret: String!
  ) {
    confirmSecret(
      email: $email
      username: $username
      password: $password
      secret: $secret
    ) {
      ok
      error
      token
    }
  }
`;

export default function ConfirmSecret({ route: { params } }) {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [finish, setFinish] = useState(false);
  const [sendNum, setSendNum] = useState(0);
  const [waitingMail, setWaitingMail] = useState(true);
  const [focus1, setFocus1] = useState(false);

  const { handleSubmit, formState, control, setError, clearErrors } = useForm({
    mode: "onChange",
  });

  const onCompleted = async (data) => {
    const {
      confirmSecret: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      await logUserIn(token);
    }
  };

  const [requestSecretMutation, { loading }] = useMutation(
    REQUEST_SECRET_MUTATION
  );

  const [confirmSecretMutation, { loading: confirmLoading }] = useMutation(
    CONFIRM_SECRET,
    {
      onCompleted,
    }
  );

  const onValid = (data) => {
    if (!loading) {
      confirmSecretMutation({
        variables: {
          email: params.email,
          username: params.username,
          password: params.password,
          secret: data.secret,
        },
      });
    }
  };

  const reSend = () => {
    if (waitingMail === true) {
      setTimeout(() => {
        setWaitingMail(true);
      }, 20000);
      setSendNum(sendNum + 1);
      setFinish(false);
      if (!loading) {
        requestSecretMutation({
          variables: {
            email: params.email,
          },
        });
        Alert.alert("???????????? ?????? ???????????????.");
        setWaitingMail(false);
      }
    } else {
      Alert.alert("20?????? ?????? ?????? ???????????? ???????????????.");
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          setFinish(true);
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const clearSecretError = () => {
    clearErrors("result");
    clearErrors("secret");
  };

  return (
    <AuthLayout>
      <Subtitle>Please check in your email ????</Subtitle>
      <Controller
        name="secret"
        rules={{
          required: "??????????????? ????????? ?????????.",
        }}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="????????????"
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="done"
            onChange={clearSecretError}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => onChange(text)}
            value={value || ""}
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
      <FormError message={formState.errors?.result?.message} />
      <FormError
        message={
          sendNum === 0
            ? finish === true
              ? "????????? ?????? ???????????????. ???????????? ?????? ?????? ????????? ???????????????. (5??? ??????)"
              : minutes === 0 && seconds <= 59
              ? `?????? ?????? ${seconds}???`
              : minutes > 0
              ? `?????? ?????? ${minutes}??? ${seconds}???`
              : null
            : null
        }
      />

      <FormError
        message={
          sendNum === 1
            ? "????????? ????????? ?????????! ?????? ????????? 4??? ???????????????."
            : null
        }
      />
      <FormError
        message={
          sendNum === 2
            ? "????????? ????????? ?????????! ?????? ????????? 3??? ???????????????."
            : null
        }
      />
      <FormError
        message={
          sendNum === 3
            ? "????????? ????????? ?????????! ?????? ????????? 2??? ???????????????."
            : null
        }
      />
      <FormError
        message={
          sendNum === 4
            ? "????????? ????????? ?????????! ?????? ????????? 1??? ???????????????."
            : null
        }
      />
      <FormError
        message={sendNum === 5 ? "?????? ????????? 5?????? ?????? ??? ????????????." : null}
      />
      <AuthButton
        text="???????????? ??????"
        disabled={finish}
        onPress={handleSubmit(onValid)}
        loading={confirmLoading}
      />
      <AuthButton
        text="???????????? ?????? ??????"
        disabled={sendNum === 5}
        onPress={reSend}
        loading={false}
        lastOne={true}
      />
    </AuthLayout>
  );
}
