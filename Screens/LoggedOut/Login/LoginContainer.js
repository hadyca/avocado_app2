import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import AuthLayout from "../../../components/auth/AuthLayout";
import { useForm, Controller } from "react-hook-form";
import { logUserIn } from "../../../apollo";
import { LOGIN_MUTATION } from "./LoginQueries";

export default function () {
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);

  const { handleSubmit, watch, setError, control, formState, clearErrors } =
    useForm({});

  const passwordRef = useRef();

  const onCompleted = async (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    } else {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
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
      <LoginPresenter onCompleted={onCompleted} onValid={onValid} />
    </AuthLayout>
  );
}
