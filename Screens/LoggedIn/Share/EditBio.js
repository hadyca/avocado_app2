import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../../Colors";
import DismissKeyboard from "../../../Components/DismissKeyBoard";
import { UnderBar } from "../../../Components/Auth/AuthShared";

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Container = styled.View`
  margin: 10px;
`;
const TextInput = styled.TextInput`
  padding: 15px 7px 0px 3px;
  color: black;
`;

const CountingText = styled.Text`
  color: ${colors.buttonBackground};
  font-size: 11px;
`;

export default function EditBio({ route: { params } }) {
  const [counting, setCounting] = useState(params.bio.length);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      bio: params.bio,
    },
    mode: "onChange",
  });

  const headerRight = () => (
    <TouchableOpacity style={{ marginRight: 10, opacity: 1 }}>
      <HeaderRightText>Done</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, []);

  return (
    <DismissKeyboard>
      <Container>
        <Controller
          name="bio"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Please Write Bio"
              textAlignVertical={"top"}
              maxLength={150}
              autoCapitalize="none"
              onChangeText={(text) => {
                onChange(text);
                countingText(text);
              }}
              value={value}
            />
          )}
        />
        <UnderBar />
        <CountingText>({counting}/150)</CountingText>
      </Container>
    </DismissKeyboard>
  );
}
