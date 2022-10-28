import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CreatCompanyLayout from "../../../../Components/CreatCompanyLayout";
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
  font-size: 18px;
`;

const Content = styled.Text`
  font-size: 15px;
`;

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
          <Title>파트너 회원이 되신 것을 축하드립니다! 🎉</Title>
          <Content>VinaArba는 파트너 회원분들의 구인 및 홍보 활동을</Content>
          <Content>더 멀리 퍼질 수 있도록 도와드리겠습니다.</Content>
          <Content></Content>
          <Content>
            파트너 회원분들을 위해 여러 서비스들을 제공할 예정이오니, 앞으로
            많은 사용 부탁드립니다!
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
