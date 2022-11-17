import React from "react";
import styled from "styled-components/native";
import { colors } from "../../../Colors";
import ScreenLayout from "../../../Components/ScreenLayout";

const Container = styled.ScrollView`
  margin: 10px;
`;

const Text = styled.Text``;

const SubTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 7px;
`;

const Separator = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${colors.borderThin};
`;

export default function PrivacyPolicy() {
  return (
    <ScreenLayout>
      <Container showsVerticalScrollIndicator={false}>
        <SubTitle>1. 개인정보의 처리 목적</SubTitle>
        <Text>
          별보는캐리어(이하 ‘VinaArba’)는 다음의 목적을 위하여 개인정보를
          처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
        </Text>
        <Text>
          1. 고객 가입 의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별·인증,
          회원자격 유지·관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는
          서비스의 공급·배송 등
        </Text>
        <SubTitle>2. 개인정보처리 위탁</SubTitle>
        <Text>
          1. 별보는캐리어('VinaArba')는 원활한 개인정보 업무처리를 위하여 다음과
          같이 개인정보 처리업무를 위탁하고 있습니다.
        </Text>
        <Text>
          2. 별보는캐리어('VinaArba')는 위탁계약 체결 시 개인정보 보호법
          제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적
          보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에
          관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
          처리하는 지 감독하고 있습니다.
        </Text>
        <Text>
          3. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보
          처리방침을 통하여 공개하도록 하겠습니다.
        </Text>
        <SubTitle>3. 정보주체의 권리, 의무 및 그 행사방법</SubTitle>
        <Text>
          이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
        </Text>
        <Text>
          1. 정보주체는 별보는캐리어('VinaArba')에 대해 언제든지 다음 각호의
          개인정보 보호 관련 권리를 행사할 수 있습니다.
        </Text>
        <Text>a. 개인정보 열람요구</Text>
        <Text>b. 오류 등이 있을 경우 정정 요구</Text>
        <Text>c. 삭제요구</Text>
        <Text>d. 처리정지 요구</Text>
        <SubTitle>4. 개인정보 수집 및 이용</SubTitle>
        <Text>
          1. 별보는캐리어('VinaArba')는 다음의 개인정보 항목을 처리하고
          있습니다.
        </Text>
        <Separator />
        <Text>분류: 일반회원가입</Text>
        <Text>항목: [필수]이메일주소</Text>
        <Text>
          수집 및 이용 목적: 본인 확인 및 가입의사 확인, 신규 서비스 안내, 설문,
          상담 및 문의처리, 회원 맞춤형 채용정보 제공
        </Text>
        <Text>보유 및 이용기간 : 회원 탈퇴 시 즉시 파기</Text>
        <Separator />
        <Text>분류: 기업회원가입</Text>
        <Text>항목: [필수]회사명, 기업주소, 직원수, 기업이메일, 연락처</Text>
        <Text>
          수집 및 이용 목적: 구직자 채용 정보 제공 및 서비스 안내 제공
        </Text>
        <Text>보유 및 이용기간 : 회원 탈퇴 시 즉시 파기</Text>
        <SubTitle>5. 개인정보의 파기</SubTitle>
        <Text>
          별보는캐리어(‘VinaArba’)는 원칙적으로 개인정보 처리목적이 달성된
          경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및
          방법은 다음과 같습니다.
        </Text>
        <Text>■ 파기절차</Text>
        <Text>
          이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우
          별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후
          혹은 즉시 파기됩니다. 이때, DB로 옮겨진 개인정보는 법률에 의한 경우가
          아니고서는 다른 목적으로 이용되지 않습니다.
        </Text>
        <Text>■ 파기기한</Text>
        <Text>
          회원 탈퇴 요청 시, 회사는 탈퇴처리와 동시에 지체 없이 개인정보를
          파기하는 것을 원칙으로 합니다.
        </Text>
        <SubTitle>6. 개인정보의 안전성 확보 조치</SubTitle>
        <Text>
          별보는캐리어(‘VinaArba’)는 개인정보보호법 제29조에 따라 다음과 같이
          안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
        </Text>
        <Text>1. 개인정보 처리 직원의 최소화 및 교육</Text>
        <Text>
          개인정보를 처리하는 직원을 지정하고 담당자에 한정시켜 최소화하여
          개인정보를 관리하는 대책을 시행하고 있습니다.
        </Text>
        <Text>2. 정기적인 자체 감사 실시</Text>
        <Text>
          개인정보 처리 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를
          실시하고 있습니다.
        </Text>
        <Text>3. 내부관리계획의 수립 및 시행</Text>
        <Text>
          개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고
          있습니다.
        </Text>
        <Text>4. 개인정보의 암호화</Text>
        <Text>
          이용자의 개인정보 및 비밀번호는 암호화되어 저장 및 관리되고 있어
          본인만이 알 수 있으며, 중요한 데이터에 대해서는 파일 및 전송 데이터를
          암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고
          있습니다.
        </Text>
        <Text>5. 해킹 등에 대비한 기술적 대책</Text>
        <Text>
          별보는캐리어(‘VinaArba’)는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보
          유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인
          갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고
          기술적/물리적으로 감시 및 차단하고 있습니다.
        </Text>
        <Text>6. 개인정보에 대한 접근 제한</Text>
        <Text>
          개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경,
          말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고
          있으며 침입차단시스템을 이용하여 외부의 무단 접근을 통제하고 있습니다.
        </Text>
        <Text>7. 접속기록의 보관 및 위변조 방지</Text>
        <Text>
          개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고
          있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고
          있습니다.
        </Text>
        <Text>8. 비인가자에 대한 출입 통제</Text>
        <Text>
          개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해
          출입통제 절차를 수립, 운영하고 있습니다.
        </Text>
        <SubTitle>7. 개인정보 보호책임자 작성</SubTitle>
        <Text>
          1. 별보는캐리어(‘VinaArba’)는 개인정보 처리에 관한 업무를 총괄해서
          책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
          위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </Text>
        <Text>담당자: 김제형 대표 / vinaarba@gmail.com</Text>
        <Text>
          2. 정보주체는 별보는캐리어(‘VinaArba’)의 서비스(또는 사업)을
          이용하면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제
          등에 관한 사항을 개인정보 보호책임자 및 담당 부서로 문의하실 수
          있습니다. 별보는캐리어(‘VinaArba’)는 정보주체의 문의에 대해 지체 없이
          답변 및 처리할 것입니다.
        </Text>
        <SubTitle>8. 개인정보 처리방침 변경</SubTitle>
        <Text>
          1. 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
          변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일
          전부터 공지사항을 통하여 고지할 것입니다.
        </Text>
        <Text>시행일: 2022년 11월 1일</Text>
      </Container>
    </ScreenLayout>
  );
}
