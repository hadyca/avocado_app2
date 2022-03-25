# 2022.1.16

- [x] 바텀 네비게이터 누르면 화면 가장 상단으로 스크롤 가게 하는 기능

# 2022.1.17

- [x] 대댓글 새로고침 업데이트 (신규 글, 글 수정)
- [x] 대댓글 추가, 대댓글에 따른 totalcomments 수 백엔드 수정

# 2022.1.21

- [x] 대댓글 화면 꾸미기 + cache edit 관련

# 2022.1.23

# 2022.1.26

- [x] 댓글 입력 후, 화면 최하단으로 이동
- [x] 게시글, 댓글 ... 부분에 신고 기능 추가 (isMine 연동) , 동시에 ... 백엔드에 신고 부분 추가

# 2022.2.17

- [x] 파일 리팩토링
- [x] 파일 하나당 한개의 기능만 하게끔, 화면에 따라 두개의 기능이 하지 않게끔 다시 수정,,,
- [x] 회원 가입 부분 로직 문제, 인증번호 안넣었는데 로그인 가능한 문제임

# 2022.2.23

- [x] ios용 UserPostList 상단 카테고리 높이 문제
- [x] UserPostListDetail 화면 디자인
- [x] CategoryBoard 화면 디자인

# 2022.2.23

- [x] ios용 UserPostList 상단 카테고리 높이 문제
- [x] UserPostListDetail 화면 디자인
- [x] CategoryBoard 화면 디자인

# 2월 목표

# 2022.3.10

- [x] category명, 설명(category board랑 input placeholder에 들어가는것들 전부 constant에서 가져오게끔 변경)
- [x] 위 카테고리 포함해서, db나 root data에 박히는 것들은 전부 영어로 교체하고, text로 보이는것들은 한글로 해도 ok
- [x] 기업 회원 가입 - 디자인 통일

# 3월 목표

- [] DongNai(5), BienHoa(1) 이런식으로 지역 채용글 수 보여주기
- [] backend / front - 일반 유저가 좋아요 한 채용 게시글을 즐겨찾기에 넣는 것이 아니라, 우상단 옵션 선택란에서 추가하게끔 변경..
- [] 채용글에도 신고기능 넣기 항목추가
- [] Search 화면 완성 (채용 글 부분 UserPost와 거의 똑같게)
- [] 기업 회원 가입 화면 만들기
- [] 회원 가입 후, 기업 유저들만 쓸 수 있는 기능들 추가해야함 (ex : 채용 공고) --> backend 일부 수정해야함 (username으로 글쓰게)
- [] 기업 회원이라고 하더라도 공개적으로 노출되는 사용자명은 username 으로 쓰게 세팅,
- [] backend에서 기업 회원 가입 edit 기능 만들기 / user도 마찬가지 (아바타 사진 변경, username변경 등)
- [] 어떤 업종들을 넣을 것인지? (기준을 뭘로 ?)
- [] UserPostList탭 디자인 부분 다 끝내기
- [] Profile 화면 완성
- [] Favorites 화면 완성
- [] 전체 폰트 크기 일괄 조정
- [] user edit, company edit + delete 화면 만들기 (user는 탈퇴 없음)
- [] companyPost 모델에 임금 값도 넣어야 할까?
- [x] Report 내용 제대로 작성하기

# 4월 목표

- [] Home 화면완성
- [] Me 화면 완성 - 프로필 사진 등록 부분에 (개인 사진 or 동물 그림 선택 할 수 있게) 기본 디폴트 값은 그냥 노말 인간 이미지임
- [] 홍보 콘티 짜기 (약 2분 내외)
- [] SNS 계정 생성 및 활동 (YUTUBE, FB, INSTAGRAM) - 1) 방글라 일상생활 2) 시내 활동 3) 봉사 활동 4) 개발

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

- [x] screen header 부분 통일 (뒤로가기, 메시지, 알림 신고 같은것들 모두)
- [x] 대댓글 모두 게시글 업데이트 후 없을 경우 화면이 튕기는데, 이거 말고 해당 글이나 댓글이 없어졌다고 화면에 띄우기
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
- [보류] 사진 이미지 용량 줄이게

# 마케팅 IDEA

- [] App 전체 서비스 이미지는 친근하게 친숙하게, 동네 친구같이 (동물 이미지이용, 음식 이미지 이용)
- [] VN 여러 전시회, 박람회 참석 및 기업들에게 홍보

# 다른 BUSINESS IDEA

- [] 유료 모임 APP (일단 내가 먼저 만들자, 한국어 배우고 싶은 사람들 모임 내가 주최), 한달 월정액
