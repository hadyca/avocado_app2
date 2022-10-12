import React, { useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import ScreenLayout from "../../../Components/ScreenLayout";
const Container = styled.ScrollView`
  margin: 10px;
`;

const Text = styled.Text``;
const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const SubTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 7px;
`;

export default function TermsOfService() {
  return (
    <ScreenLayout>
      <Container showsVerticalScrollIndicator={false}>
        <Text>Vina Arba에 방문하신 것을 환영합니다.</Text>
        <Text>
          약관은 Vina Arba 모든 회원 활동에 적용됩니다. Vina Arba를 이용하면 본
          약관에 동의하는 것으로 간주합니다.
        </Text>
        <Title>제1장 총칙</Title>
        <SubTitle>제1조 (목적)</SubTitle>
        <Text>
          1. 자소설닷컴 서비스 약관(이하 "본 약관")은 자소설닷컴(이하
          "자소설닷컴")이 제공하는 자소설닷컴 및 자소설닷컴 관련 모든 서비스와
          관련하여 자소설닷컴과 회원의 권리⋅의무 및 책임사항, 기타 필요한 사항을
          규정함을 목적으로 합니다.
        </Text>
        <SubTitle>제2조 (정의)</SubTitle>
        <Text>1. 본 약관의 용어 정의는 다음 각호와 같습니다.</Text>
        <Text>
          a. 서비스: 구현되는 단말기(PC, TV, 휴대형 단말기 등 각종 유무선 장치를
          포함)와 상관없이 "이용자"가 자소설닷컴 플랫폼에 접속하여 자소설닷컴 및
          자소설닷컴이 제공하는 일체의 용역. 자료 DB화, 컴퓨터 기타 이와 유사한
          정보통신처리장치를 이용한 일체의 행위를 말합니다.
        </Text>
        <Text>
          b. 이용자: 자소설닷컴에 접속하여 본 약관에 따라 서비스를 받는 모든
          회원
        </Text>
        <Text>
          c. 회원: 자소설닷컴에 개인정보를 제공하여 회원등록을 한 자로서,
          자소설닷컴의 정보를 제공받으며, 서비스를 이용할 수 있는 사람을
          말합니다.
        </Text>
        <Text>
          d. 비회원: 회원에 가입하지 않고 자소설닷컴이 제공하는 서비스를
          이용하는 자를 말합니다.
        </Text>
        <Text>
          e. 회원ID: 회원 식별과 서비스 이용을 위하여 자소설닷컴 회원임을
          확인하고 회원 자신의 비밀보호를 위해 회원 자신이 선정하고 자소설닷컴이
          승인하는 이메일 주소
        </Text>
        <Text>
          f. 비밀번호: 자소설닷컴 회원이 부여받은 회원ID와 일치된 회원임을
          확인하고 자신의 비밀 보호를 위해 회원이 설정한 문자,숫자,특수문자의
          조합
        </Text>
        <Text>
          g. 개인정보: 생존하는 개인에 관한 정보로서 해당 정보에 포함되어 있는
          회사정보, 이메일 주소 등의 사항에 의하여 해당 개인을 식별할 수 있는
          정보(해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와
          용이하게 결합하여 식별할 수 있는 것을 포함)
        </Text>
        <Text>
          h. 유료서비스: 자소설닷컴이 유료로 제공하는 각종 콘텐츠 및 제반 서비스
        </Text>
        <Text>
          i. 서비스이용요금(또는 서비스요금 또는 이용요금): 자소설닷컴이
          제공하는 서비스를 사용하기 위해서 지불하는 대가
        </Text>
        <Text>
          j. 플랫폼: 자소설닷컴이 서비스를 제공하기 위해 온라인에 구축한
          API(application programming interface), DB, 기타 이와 유사한 정보통신
          처리 장치로서 앱 개발자와 웹 사이트 운영자를 비롯한 타인은 위
          정보통신처리장치에 API, DB 등을 제공할 수도 있고, 데이터를 검색할 수도
          있습니다.
        </Text>
        <Text>
          k. 어플리케이션: 플랫폼에 접속하여 자소설닷컴이 제공하는 서비스를
          이용할 수 있도록 하는 웹, 모바일 웹, 스마트폰 앱, 기타 이와 유사한
          정보통신 처리장치
        </Text>
        <Text>
          l. 콘텐츠: 자소설닷컴이 생성, 수집, 기타 일체의 방법으로 플랫폼에
          제공한 콘텐츠
        </Text>
        <Text>
          m. 사용자 콘텐츠: "회원"이 "서비스"를 이용함에 "서비스상"에 게시한
          부호, 문자, 음성, 음향, 화상, 동영상 등의 정보, 각종 파일과
          링크(어플리케이션 이용 등의 방식으로 게시한 것도 포함)
        </Text>
        <Text>
          n. 데이터: 자소설닷컴이 서비스를 제공하는 과정에서 수집하고 축적한
          각종 정보, 자료 및 이용의 콘텐츠
        </Text>
      </Container>
    </ScreenLayout>
  );
}
