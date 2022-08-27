import React, { useRef } from "react";
import { useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CreatCompanyLayout from "../../../../Components/CreatCompanyLayout";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { colors } from "../../../../Colors";
import AuthButton from "../../../../Components/Auth/AuthButton";
import useMe from "../../../../Hooks/useMe";

const Container = styled.View`
  flex: 0.6;
`;
const TopContainer = styled.View`
  margin-bottom: 30px;
`;
const BottomContainer = styled.View``;
const Title = styled.Text`
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
`;

const Content = styled.Text``;

export default function CreateCompanyFinish() {
  const navigation = useNavigation();
  const { refetch } = useMe();
  const goToHome = async () => {
    await refetch();
    navigation.navigate("TabsNav");
  };

  return (
    <CreatCompanyLayout>
      <Container>
        <TopContainer>
          <Title>파트너 기업 회원이 되어 주셔서 감사합니다.</Title>
          <Content>이제 채용 게시판에 구인글을 등록할 수 있어요.</Content>
          <Content>
            그리고 계속해서 파트너 회원분들을 위해 여러 서비스를 제공할
            예정이오니, 많은 사용 부탁 드릴게요!
          </Content>
        </TopContainer>
        <BottomContainer>
          <AuthButton
            text="확인"
            disabled={false}
            loading={false}
            onPress={goToHome}
          />
        </BottomContainer>
      </Container>
    </CreatCompanyLayout>
  );
}
