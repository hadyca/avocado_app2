# 4월 목표

- [] Profile 화면 완성

1. edit Profile 부분에서 추가로 aboutus가 아닌 조금 더 긴 회사 소개(필수아님) 란 넣자 (backend에도 추가)
2. 실제 직원 후기 (airbnb참고) - 실제 다니는 직원들만 후기를 작성 할 수 있으며, 기업 user만 해당 후기에 대해 댓글을 달 수 있음 (평점도 도입)
   2.1 실제 다니는지 어떻게 아는가? --> 기업 회원 가입 시 해당 기업의 고유번호를 부여 및 일반 유저는 해당 기업을 입사 할 때 고유번호를 알아 낸다.
   (해당 app을 통해 입사 했다고 하면 반드시 기업 회원은 직원에게 알려주어야 함. 만약에 안알려주면 운영진에게 report 및 회사에 운영진이 문의) 그리고 고유번호
   는 기업 유저가 임의로 다시 바꿀 수 있음(30일 내에 최대한 한번 / 고유번호 유출 방지)

   직원 후기 시 근거 없는 기업 악평은 안됨. 최대한 좋은 후기만 ^^ / 운영자가 임의로 삭제 가능 / 기업도 홍보되고 좋음 윈윈

2.2 더 나아가, 해당 고유번호를 사용하여 일반 유저가 프로필화면에서 해당 고유번호를 입력하면 어느 회사에 소속 되어있는지 표기 될 수 있게 하고(고유 번호 입력 후 이 회사가 맞나요? 라는 식으로 해당 업체 정보 보여줌)(필수 아님)

해당 유저와 기업이 연결이 되면, 기업 유저도 마찬가지로 본인 회사에 어느 유저들이 있는지 확인 할 수 있음(해당 유저들만 기업 후기 코멘트 가능)

해당 앱을 통해 입사할 수 있도록 실제 기업에 "나는 이xxx앱을 통해 지원하러 왔어요" 라고 말하면 (해당 app에 채용공고 떠있는 업체에만) 해당 기업에서는 신규 이벤트 쿠폰을 해당 유저에게 주어야하고(고유 랜덤 문자&번호로 중복되면 안됨), 해당 유저는 그 이벤트 번호를 아보카도 앱에 등록하면 현금 or 포인트 지급 !!이때 중간 수수료 수익 발생 가능!!

이때 보유하고 있는 쿠폰이 몇개 있는지 기업 프로필 and 채용 공고때 표시되게끔 ex) 39/100 (이벤트 쿠폰 번호 입력되면 1개 차감)

해당 쿠폰은 아보카도앱에서 지급(100개씩???)

해당 수익의 일부는 사회에 환원 (봉사활동 불우이웃 돕기)

- [] 채용글 포맷 당근마켓 벤치마킹
- [] 어떤 업종들을 넣을 것인지? (기준을 뭘로 ?) - 알바몬, 알바천국 참조
- [] 전체 폰트 크기 일괄 조정
- [x] companyPost 모델에 임금 값도 넣어야 할까?
- [] 기업 회원은 username 오른쪽에 작은 이미지로 기업회원인것처럼 표기 / 기업 유저 username 옆에는 1단계 : 기본가입 (회사 모양 이모티콘) / 2단계 : 검증 완료 - (체크 이모티콘) / 3단계 : 우수 업체 - (검증 + 우수 기준 합격시 별표 이모티콘으로 구분)
- [] 개인 프로필 부분에 구직 희망 on off, 아니면 다른 상태 등 개인 status 넣어 두기, on off로 스위치로 변경 될 수 있게
- [] 이와 연동되서, DM 부분 구현 (실시간 채팅은 나중에)
- [] Home 화면완성
- [] Me 화면 완성 - 프로필 사진 등록 부분에 (개인 사진 or 동물 그림 선택 할 수 있게) 기본 디폴트 값은 그냥 노말 인간 이미지임 (개인설정화면 완성) / toptab으로 내가 팔로윙 하는 유저의 유저게시판 모아보기와 채용게시판 모아보기 화면만들기
- [] 홍보 콘티 짜기 (약 2분 내외)
- [] SNS 계정 생성 및 활동 (YUTUBE, FB, INSTAGRAM) - 1) 방글라 일상생활 2) 시내 활동 3) 봉사 활동 4) 개발
- [] 한국 휴가 들어가기전에, 베트남 번역 해야 되는 부분 정리 (엑셀)
- [] user edit, company edit + delete 화면 만들기 (user는 탈퇴 없음)
- [] Header 스크린명 정하기
- [] 채용글 list에 글이 없으면, 채용글이 없다고 화면에 표시
- [일부 진행] Search 화면 완성 (채용 글 부분 UserPost와 거의 똑같게)
- [일부 진행] UserPostList탭 디자인 부분 다 끝내기
- [일부 진행] 기업 회원 가입 화면 만들기
- [x] backend에서 기업 회원 가입 edit 기능 만들기 / user도 마찬가지 (아바타 사진 변경, username변경 등)
- [x] 기업유저들이 기업 가입하는 링크 누르면 이미 가입되었다고 알림 띄워주기 (1계정 1기업만 가능하다고 알려줌)
- [x] Favorites 화면 완성 (companyPost 화면이랑 유사하게) / 실시간 업로드 되게 관심목록 cache 화, 또는 refetch로 실시간 반영

# 5월 목표

- [] 동물 프로필 사진만들기
- [] 디자인 최종 점검 (외주)
- [] 첫 로딩 화면 이미지
- [] 홍보 영상 만들기
- [] 번역(영,베) 완성

# 6월 목표

- [] app 배포
- [] 베트남 홍보

# 중기 개발 To-be

- [] 조회수 구현
- [] 안드로이드, ios 용 댓글 키보드 위로 가게 하는거 높이 조절...
- [] 번역 세팅 해야함, (현재 backend에서 카테고리를 한글->영어로 저장해놓게 해놨는데, 앱에서 이 영어가 나오게끔 되어있음 지금은,,)
- [] 본인 인증 시 이메일 -> 모바일 번호로 인증 교체
- [] Welcome : 계정 메일 찾기, 비번 찾기 기능 추가 // 페이스북 로그인 기능 추가
- [] 화면 정의서, 각 화면 파일과 component 파일 정의서
- [] 폰트 종류, 폰트 크기, 색상, 디자인
- [] 카테고리 보드 화면 상단 이미지 뭐 넣을지? 사진을 넣을까? 아니면 일러스트를 넣을까?
- [] username 30일에 한번씩만 변경 가능하게끔
- [] 각 스크린 props type 정의
- [] 로그인 5회 이상 비밀번호 불일치 시, 시도 1시간 제한 로직 만들기
- [] 일반 유저 회원 가입 시, 이메일 중복 확인(user안에서만), 기업 회원 가입 이메일 중복 확인(comnpany에서만) --> 나중에 일반 유저는 email항목 없애고 회원 가입 시 계정 아이디를 mobile번호로 대체 해야 함
- [] prisma model 변경 시, 기존 데이터 다 삭제됨?? 테스트해보기 (관련 전문가 문의)
- [] 게시글(유저, 채용 2개다)을 올릴 때 zalo와 FB에 동시에 업로드 할 수 있게끔 기능 만들기
- [] 실시간 채팅 기능
- [] 기업 유저 username 옆에는 1단계 : 기본가입 (회사 모양 이모티콘) / 2단계 : 검증 완료 - (체크 이모티콘) / 3단계 : 우수 업체 - (검증 + 우수 기준 합격시 별표 이모티콘으로 구분)
- [] 알림 확인 할 수 있는 기능 (운영진, 기타 메시지 등) / airbnb 앱 참고
- [] 특정 단어 posting 시, 유저가 등록 해놓은 단어에 걸리면 알람 기능
- [] 사진 클릭 시 사진 확대 및 여러 사진 스와이프 기능

- [보류] 사진 이미지 용량 줄이게
- [보류] DongNai(5), BienHoa(1) 이런식으로 지역 채용글 수 보여주기 - 장기 보류 / 구현 어려움
- [x] screen header 부분 통일 (뒤로가기, 메시지, 알림 신고 같은것들 모두)
- [x] 대댓글 모두 게시글 업데이트 후 없을 경우 화면이 튕기는데, 이거 말고 해당 글이나 댓글이 없어졌다고 화면에 띄우기

# 마케팅 IDEA

- [] app 첫 페이지에 기업 소개 영상 및 인터뷰 업로드
- [] App 전체 서비스 이미지는 친근하게 친숙하게, 동네 친구같이 (동물 이미지이용, 음식 이미지 이용)
- [] VN 여러 전시회, 박람회 참석 및 기업들에게 홍보
- [] 주기적으로 특정 장소(카페나 사무실 대관)에서 특정 분야 전문가 초빙하여 소박하게 강의, 강연 (요리, 한국어, 노무, 기타 등등)
  해당 app서비스 + 페이스북 및 sns통해서 공지

# 다른 BUSINESS IDEA

- [] 유료 모임 APP (일단 내가 먼저 만들자, 한국어 배우고 싶은 사람들 모임 내가 주최), 한달 월정액
