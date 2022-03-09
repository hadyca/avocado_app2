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

# 2022.3.9

- [x] category명, 설명(category board랑 input placeholder에 들어가는것들 전부 constant에서 가져오게끔 변경)
- [x] 위 카테고리 포함해서, db나 root data에 박히는 것들은 전부 영어로 교체하고, text로 보이는것들은 한글로 해도 ok
- [] 기업 회원 가입 화면 만들기 (각 screen으로 만들기, 화면 이동 시 params 서로 공유되서 앞뒤로 이동해도 기록 그대로 남게), (회원 가입 후, 기업 유저들만 쓸 수 있는 기능들 추가해야함 (ex : 채용 공고))
  // 그리고, 기업 회원이라고 하더라도 공개적으로 노출되는 사용자명은 username 으로 쓰게 세팅
  -[] backend에서 기업 회원 가입 edit 기능 만들기 / user도 마찬가지 (아바타 사진 변경, username변경 등)

# 3월 목표

- [] UserPostList탭 디자인 부분 다 끝내기
- [] Search 화면 완성
- [] Profile 화면 완성
- [] Favorites 화면 완성

# 4월 목표

- [] Home 화면완성
- [] My 화면 완성
- [] 홍보 콘티 짜기

# 5월 목표

- [] 디자인 최종 점검 (외주)
- [] 홍보 영상 만들기
- [] 번역(영,베) 완성

# 6월 목표

- [] app 배포
- [] 베트남 홍보

# 중기 개발 To-be

- [x] screen header 부분 통일 (뒤로가기, 메시지, 알림 신고 같은것들 모두)
- [x] 대댓글 모두 게시글 업데이트 후 없을 경우 화면이 튕기는데, 이거 말고 해당 글이나 댓글이 없어졌다고 화면에 띄우기
- [x] 안드로이드, ios 용 댓글 키보드 위로 가게 하는거 높이 조절
- [] 번역 세팅 해야함, (현재 backend에서 카테고리를 한글->영어로 저장해놓게 해놨는데, 앱에서 이 영어가 나오게끔 되어있음 지금은,,)
- [] 본인 인증 시 이메일 -> 모바일 번호로 인증 교체
- [] Welcome : 계정 메일 찾기, 비번 찾기 기능 추가 // 페이스북 로그인 기능 추가
- [] 화면 정의서, 각 화면 파일과 component 파일 정의서
- [] 글꼴, 색상, 디자인
- [] 카테고리 보드 화면 상단 이미지 뭐 넣을지? 사진을 넣을까? 아니면 일러스트를 넣을까?
- [] username 30일에 한번씩만 변경 가능하게끔
- [] 각 스크린 props type 정의
- [] 로그인 5회 이상 비밀번호 불일치 시, 시도 1시간 제한 로직 만들기
- [보류] 사진 이미지 용량 줄이게
