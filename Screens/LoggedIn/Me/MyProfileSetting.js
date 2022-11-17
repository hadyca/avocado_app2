import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ScreenLayout from "../../../Components/ScreenLayout";
import { colors } from "../../../Colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.backgraound};
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  padding: 15px 2px 15px 2px;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${colors.borderThin};
`;
export default function MyProfileSetting({ route: { params } }) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <ScreenLayout>
      <Button
        onPress={() =>
          navigation.navigate("Account", {
            email: params.email,
            userId: params.userId,
          })
        }
      >
        <ButtonText>{t("myProfileSetting.1")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button onPress={() => navigation.navigate("NotificationSetting")}>
        <ButtonText>{t("myProfileSetting.2")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button onPress={() => navigation.navigate("Language")}>
        <ButtonText>{t("myProfileSetting.3")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button onPress={() => navigation.navigate("Contact")}>
        <ButtonText>{t("myProfileSetting.4")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button onPress={() => navigation.navigate("TermsOfService")}>
        <ButtonText>{t("myProfileSetting.5")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
      <Button onPress={() => navigation.navigate("PrivacyPolicy")}>
        <ButtonText>{t("myProfileSetting.6")}</ButtonText>
        <Ionicons
          name="chevron-forward"
          color="black"
          size={17}
          style={{ marginRight: 20 }}
        />
      </Button>
      <Separator />
    </ScreenLayout>
  );
}
