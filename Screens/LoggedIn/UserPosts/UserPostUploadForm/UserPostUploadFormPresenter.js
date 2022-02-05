import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import { colors } from "../../../../colors";
import ContentInput from "../../../../Components/Post/ContentInput";
import { Text } from "react-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;
const ImageTop = styled.View`
  margin: 10px 10px 0px 10px;
`;

const ImageScroll = styled.ScrollView`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;
const InputBottom = styled.View`
  margin: 0px 10px 10px 10px;
`;
const ImagePick = styled.TouchableOpacity`
  margin: 10px 20px 10px 10px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border: 1px;
`;
const CameraText = styled.Text`
  color: #868b94;
`;

const HeaderRightText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const TitleInput = styled.TextInput`
  padding: 15px 7px;
  color: black;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const CategoryView = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderThin};
`;

const CategoryContainer = styled.View`
  padding: 15px 7px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.View`
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;

const DeleteBtn = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
  background-color: black;
  border-radius: 15px;
  position: absolute;
  top: 0px;
  right: -3px;
  justify-content: center;
  align-items: center;
`;

const DeleteText = styled.Text`
  color: white;
`;

export default function UserPostUploadFormPresenter({
  goToImageSelect,
  DeleteImg,
  goToCategory,
  countPhoto,
  photo,
  category,
}) {
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  return (
    <Container>
      <ImageTop>
        <ImageScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          <ImagePick onPress={goToImageSelect}>
            <Ionicons name={"camera"} color={"#868B94"} size={30} />
            <CameraText>{`${countPhoto} / 5`}</CameraText>
          </ImagePick>
          {photo?.length > 0
            ? photo.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image
                      source={{ uri: item.fileUrl }}
                      style={{ height: 60, width: 60 }}
                    />
                    <DeleteBtn onPress={() => DeleteImg(index)}>
                      <DeleteText>X</DeleteText>
                    </DeleteBtn>
                  </ImageContainer>
                );
              })
            : null}
        </ImageScroll>
      </ImageTop>
      <InputBottom>
        <Controller
          name="title"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TitleInput
              placeholder="Title"
              autoCapitalize="none"
              multiline={false}
              returnKeyType="next"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <CategoryView onPress={goToCategory}>
          <CategoryContainer>
            <Text>{category}</Text>
            <Ionicons name="chevron-forward" color="black" size={17} />
          </CategoryContainer>
        </CategoryView>
        <Controller
          name="content"
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <ContentInput
              multiline={true}
              autoCapitalize="none"
              onChangeText={(text) => onChange(text)}
              value={value || ""}
              categoryName={category}
            />
          )}
        />
      </InputBottom>
    </Container>
  );
}
