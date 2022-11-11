import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ko: {
    translation: {
      header: {
        userPostList: "게시판",
        reComment: "댓글",
        userPostUploadForm: "글쓰기",
        postCategory: "주제",
        companyPostAll: "채용",
        companyPostUploadForm: "채용 글쓰기",
        companyReComment: "댓글",
        notification: "알림",
        myProfileSetting: "설정",
        account: "계정 안내",
        notificationSetting: "알림",
        contact: "문의하기",
        termsOfService: "이용약관",
        privacyPolicy: "개인정보처리방침",
        favoritesNav: "즐겨찾기",
        language: "언어",
        editProfile: "프로필 편집",
        editUsername: "사용자 이름 편집",
        editBio: "소개 편집",
        editCompanyName: "회사명 편집",
        editAboutUs: "회사소개 편집",
        editAddress: "주소 편집",
        editTotalEmployees: "직원수 편집",
        editCompanyEmail: "회사 이메일 편집",
        editContactNumber: "연락처 편집",
        userReportForm: "신고",
        userPostReportForm: "신고",
        userPostCommentReportForm: "신고",
        userPostReCommentReportForm: "신고",
        companyPostReportForm: "신고",
        companyPostCommentReportForm: "신고",
        companyPostReCommentReportForm: "신고",
        editUserPostForm: "편집",
        editUserPostCommentForm: "편집",
        editUserPostReCommentForm: "편집",
        editCompanyPostForm: "편집",
        editCompanyPostCommentForm: "편집",
        editCompanyPostReCommentForm: "편집",
        editPostCategory: "주제",
      },
      welcome: {
        1: "계정 생성",
        2: "로그인",
      },
      logIn: {
        1: "이메일",
        2: "비밀번호",
        3: "계정이 존재하지 않거나 잘못된 암호입니다.",
        4: "로그인",
      },
      createAccount: {
        1: "이메일",
        2: "사용자 이름",
        3: "비밀번호",
        4: "비밀번호 재입력",
        5: "다음",
        6: "특수문자는 사용할 수 없으며, 20자를 넘을 수 없습니다.",
        7: "숫자, 영문, 특수문자 각 1자리 이상이면서 최소 8자리를 넣어주세요.",
        8: "비밀번호 불일치",
        9: "이미 사용중인 이메일 주소가 있습니다.",
        10: "이미 사용중인 사용자 이름이 있습니다.",
        11: "필수 항목 입니다.",
        12: "VinaArba에 오신 것을 환영합니다!",
      },
      confirmSecret: {
        1: "이메일을 확인해 주세요",
        2: "인증번호",
        3: "인증번호 확인",
        4: "인증번호 다시 받기",
        5: "남은시간",
        6: "시간이 만료 되었습니다. 다시 받기 버튼을 눌러주세요.",
        7: "다시 시도해 주세요.",
        8: "인증번호가 일치 하지 않습니다.",
        9: "인증번호가 발송 되었습니다.",
        10: "30초 후에 다시 시도해 주세요.",
      },
      home: {
        1: "기업 회원이세요?",
        2: "가입하기",
        3: "이미 가입 되어있습니다.",
      },
      askCompanyName: {
        1: "회사명",
        2: "다음",
      },
      askAboutUs: {
        1: "어떤 회사인지 멋지게 소개해 주세요!",
        2: "예) 직원 복지가 좋은 dongnai 최고의 제조 회사!",
        3: "글자 수 제한",
        4: "다음",
      },
      askTotalEmployees: {
        1: "총 직원 수를 알려주세요",
        2: "다음",
      },
      askEmail: {
        1: "이메일",
        2: "다음",
      },
      askContactNumber: {
        1: "연락처",
        2: "다음",
      },
      askAddressOne: {
        1: "회사의 첫 번째 지역",
        2: "취소",
        3: "다음",
      },
      askAddressTwo: {
        1: "회사의 두 번째 지역",
        2: "취소",
        3: "다음",
      },
      askAddressThree: {
        1: "회사의 마지막 세부 주소",
        2: "다음",
      },
      createCompanyFinish: {
        1: "완료",
      },
      userPostList: {
        1: "더보기",
        2: "좋아요",
        3: "댓글",
      },
      categoryBoard: {
        1: "이 주제로 글쓰기",
      },
      userPostUploadForm: {
        1: "게시글의 주제를 정해주세요.",
        2: "완료",
        3: "사진은 5장까지만 가능합니다.",
      },
      editUserPostForm: {
        1: "완료",
        2: "사진은 5장까지만 가능합니다.",
      },
      notification: {
        1: "님이 회원님을 팔로잉 했어요!",
        2: "님이 회원님의 글에 댓글을 남겼어요!",
        3: "님이 회원님의 글에 ❤를 남겼어요!",
        4: "일반글",
        5: "채용글",
        6: "팔로잉",
        7: "공지",
      },
      time: {
        1: "방금 전",
        2: "분 전",
        3: "시간 전",
        4: "일 전",
        5: "년 전",
      },
      myProfileSetting: {
        1: "계정",
        2: "알림",
        3: "언어",
        4: "문의하기",
        5: "이용약관",
        6: "개인정보처리방침",
        7: "현재",
        8: "최신",
      },
      profile: {
        1: "일반글",
        2: "채용글",
        3: "팔로잉",
        4: "팔로워",
        5: "팔로우",
        6: "프로필 편집",
        7: "회사 정보",
        8: "직원수",
        9: "이메일",
        10: "연락처",
        11: "설정",
        12: "취소",
        13: "명",
        14: "신고",
      },
      editProfile: {
        1: "사용자 이름",
        2: "소개",
        3: "회사 정보",
        4: "회사",
        5: "회사 소개",
        6: "주소",
        7: "직원수",
        8: "이메일",
        9: "연락처",
        10: "기업 정보 삭제",
        11: "정말 삭제 하시겠습니까?",
        12: "명",
        13: "아바타 변경",
        14: "완료",
        15: "확인",
        16: "취소",
        17: "소개 추가",
      },
      editUsername: {
        1: "30일 이내 다시 변경 할 수 없습니다.",
        2: "30일 이내 변경 하셨습니다.",
        3: "사용자 이름",
        4: "완료",
        5: "특수문자는 사용할 수 없으며, 20자를 넘을 수 없습니다.",
        6: "이미 사용중인 사용자 이름이 있습니다.",
      },
      editBio: {
        1: "완료",
        2: "소개",
      },
      editCompanyName: {
        1: "완료",
      },
      editAboutUs: {
        1: "완료",
        2: "예) 직원 복지가 좋은 dongnai 최고의 제조 회사!",
      },
      editAddress: {
        1: "완료",
        2: "두 번째 지역",
      },
      editTotalEmployees: {
        1: "완료",
      },
      editCompanyEmail: {
        1: "완료",
      },
      editContactNumber: {
        1: "완료",
      },
      createCompanyFinish: {
        1: "파트너 회원이 되신 것을 축하드립니다.🎉",
        2: "VinaArba는 파트너 회원분들의 구인 및 홍보 활동을 더 멀리 퍼질 수 있도록 도와드리겠습니다.",
        3: "파트너 회원분들을 위해 여러 서비스들을 제공할 예정이오니, 앞으로 많은 사용 부탁드립니다!",
        4: "완료",
      },
      account: {
        1: "현재 계정",
        2: "로그아웃",
        3: "정말 로그아웃 하시겠습니까?",
        4: "탈퇴하기",
        5: "정말 탈퇴 하시겠습니까?",
      },
      contact: {
        1: "유형",
        2: "문의 유형을 선택하세요.",
        3: "답변 받을 이메일을 입력하세요.",
        4: "내용",
        5: "작성 완료",
        6: "유형을 입력해주세요.",
        7: "내용을 입력해주세요.",
        8: "이메일을 입력해주세요.",
        9: "이메일 형식이 잘못 되었습니다.",
        10: "이메일",
      },
      favoritesNav: {
        1: "관심 일반글",
        2: "관심 채용글",
      },
      userPostListDetail: {
        1: "댓글이 없습니다. 댓글을 작성해 주세요.😊",
        2: "수정",
        3: "삭제",
        4: "취소",
        5: "게시글을 삭제 하시겠어요?",
        6: "답글 쓰기",
        7: "관심목록에 추가",
        8: "신고",
        9: "관심목록에서 삭제",
        10: "삭제 되었습니다.",
        11: "관심목록에 추가 되었습니다.",
        12: "관심목록에 추가 하시겠어요?",
        13: "관심목록에서 삭제 하시겠어요?",
        14: "확인",
        15: "댓글을 삭제 하시겠어요?",
      },
      userPostReportForm: {
        1: "게시글을 신고하는 이유를 선택해 주세요.",
        2: "신고하시겠습니까?",
        3: "신고해주셔서 감사합니다.",
        4: "확인",
        5: "취소",
      },
      userPostCommentReportForm: {
        1: "댓글을 신고하는 이유를 선택해 주세요.",
        2: "신고하시겠습니까?",
        3: "신고해주셔서 감사합니다.",
        4: "확인",
        5: "취소",
      },
      userReportForm: {
        1: "유저를 신고하는 이유를 선택해 주세요.",
      },
      companyPostUploadForm: {
        1: "사진",
        2: "(선택)",
        3: "구인글에 사진이 있으면 더 많은 사람들이 확인해요.",
        4: "사진은 5장까지만 가능합니다.",
        5: "제목",
        6: "공고 내용을 요약해서 적어주세요.",
        7: "연락처",
        8: "이메일",
        9: "근무 요일",
        10: "월",
        11: "화",
        12: "수",
        13: "목",
        14: "금",
        15: "토",
        16: "일",
        17: "협의 가능",
        18: "근무 시간",
        19: "시작",
        20: "종료",
        21: "임금",
        22: "세부 내용",
        23: "예) 업무 예시, 사내 복지, 근무 여건, 지원자가 갖추어야 할 능력, 우대 사항 등",
        24: "작성 완료",
        25: "제목을 입력해주세요.",
        26: "연락처를 입력해주세요.",
        27: "이메일을 입력해주세요.",
        28: "이메일 형식이 잘못 되었습니다.",
        29: "임금을 입력해주세요.",
        30: "세부 내용을 입력해주세요.",
        31: "최소 1개 이상 요일을 넣어주세요.",
        32: "월급",
      },
      companyPostAll: {
        1: "희망근무지 선택",
        2: "전체",
        3: "닫기",
        4: "확인",
        5: "지역1",
        6: "지역2",
        7: "외",
        8: "건",
        9: "해당 지역에 구인글이 없어요.😂",
        10: "5개까지만 가능해요.",
        11: "지역 찾기",
        12: "시급",
        13: "일급",
        14: "월급",
        15: "건당",
        16: "월",
        17: "화",
        18: "수",
        19: "목",
        20: "금",
        21: "토",
        22: "일",
        23: "협의",
      },
      share: {
        1: "확인",
        2: "취소",
        3: "완료",
      },
    },
  },
  en: {
    translation: {
      header: {
        userPostList: "Forums",
        reComment: "Comment",
        userPostUploadForm: "Writing",
        postCategory: "Topic",
        companyPostAll: "Recruitment",
        companyPostUploadForm: "Recruitment writing",
        companyReComment: "Comment",
        notification: "Notification",
        myProfileSetting: "Setting",
        account: "Account",
        notificationSetting: "Notification",
        contact: "Contact",
        termsOfService: "Terms of service",
        privacyPolicy: "Privacy policy",
        favoritesNav: "Favorites",
        language: "Language",
        editProfile: "Edit Profile",
        editUsername: "Edit username",
        editBio: "Edit bio",
        editCompanyName: "Edit company name",
        editAboutUs: "Edit about us",
        editAddress: "Edit address",
        editTotalEmployees: "Edit number of employees",
        editCompanyEmail: "Edit company email",
        editContactNumber: "Edit contact number",
        userReportForm: "Report",
        userPostReportForm: "Report",
        userPostCommentReportForm: "Report",
        userPostReCommentReportForm: "Report",
        companyPostReportForm: "Report",
        companyPostCommentReportForm: "Report",
        companyPostReCommentReportForm: "Report",
        editUserPostForm: "Edit",
        editUserPostCommentForm: "Edit",
        editUserPostReCommentForm: "Edit",
        editCompanyPostForm: "Edit",
        editCompanyPostCommentForm: "Edit",
        editCompanyPostReCommentForm: "Edit",
        editPostCategory: "Topic",
      },
      welcome: {
        1: "Create Account",
        2: "Log In",
      },
      logIn: {
        1: "Email",
        2: "Password",
        3: "The account does not exist or is an invalid password.",
        4: "Log In",
      },
      createAccount: {
        1: "Email",
        2: "Username",
        3: "Password",
        4: "Retype password",
        5: "Next",
        6: "Special characters cannot be used, and cannot exceed 20 characters.",
        7: "Please include at least one digit each of the numbers, English, and special characters, and at least 8 digits.",
        8: "Password mismatch.",
        9: "There is already have an email address in use.",
        10: "There is already have an username in use.",
        11: "Required.",
        12: "Welcome to VinaArba!",
      },
      confirmSecret: {
        1: "Please check in your email",
        2: "Authentication code",
        3: "Confirm",
        4: "Get again",
        5: "Time remaining",
        6: "Time has expired. Please press the get again button.",
        7: "Please try again.",
        8: "The authentication code does not match.",
        9: "The authentication code has been sent.",
        10: "Try again 30seconds later.",
      },
      home: {
        1: "Are you a corporate member?",
        2: "Sign up",
        3: "Already signed up",
      },
      askCompanyName: {
        1: "Company name",
        2: "Next",
      },
      askAboutUs: {
        1: "Introduce your company nicely!",
        2: "Ex) Best Manufacturing Company in Dongnai!",
        3: "Character limit",
        4: "Next",
      },
      askTotalEmployees: {
        1: "Total number of employees",
        2: "Next",
      },
      askEmail: {
        1: "Email",
        2: "Next",
      },
      askContactNumber: {
        1: "Contact Number",
        2: "Next",
      },
      askAddressOne: {
        1: "Level-1 district of the company",
        2: "Cancel",
        3: "Next",
      },
      askAddressTwo: {
        1: "Level-2 district of the company",
        2: "Cancel",
        3: "Next",
      },
      askAddressThree: {
        1: "Last detailed address of the company",
        2: "Next",
      },
      createCompanyFinish: {
        1: "Done",
      },
      userPostList: {
        1: "more",
        2: "like",
        3: "comment",
      },
      categoryBoard: {
        1: "Writing on this topic",
      },
      userPostUploadForm: {
        1: "Please select a topic for the post.",
        2: "Done",
        3: "Limited to 5 photos.",
      },
      editUserPostForm: {
        1: "Done",
        2: "Limited to 5 photos.",
      },
      notification: {
        1: " followed you!",
        2: " commented on your post!",
        3: " marked ❤ in your post!",
        4: "Post",
        5: "Job Post",
        6: "Following",
        7: "Notice",
      },
      time: {
        1: "A moment ago",
        2: "minute",
        3: "hour",
        4: "day",
        5: "year",
      },
      myProfileSetting: {
        1: "Account",
        2: "Notification",
        3: "Language",
        4: "Contact Us",
        5: "Terms of service",
        6: "Privacy policy",
        7: "Current",
        8: "Latest",
      },
      profile: {
        1: "Post",
        2: "Job Post",
        3: "Following",
        4: "Follower",
        5: "Follow",
        6: "Edit Profile",
        7: "Company Info",
        8: "Number of employees",
        9: "Email",
        10: "Contact Number",
        11: "Setting",
        12: "Cancel",
        13: "Worker",
        14: "Report",
      },
      editProfile: {
        1: "Username",
        2: "Bio",
        3: "Company Info",
        4: "Company",
        5: "About Us",
        6: "Address",
        7: "Number of employees",
        8: "Email",
        9: "Contact Number",
        10: "Delete Company Info",
        11: "Are you sure you want to delete it?",
        12: "worker",
        13: "Edit Avatar",
        14: "Done",
        15: "Ok",
        16: "Cancel",
        17: "Add bio",
      },
      editUsername: {
        1: "You can't change username again within 30 days.",
        2: "You changed username within 30 days.",
        3: "Username",
        4: "Done",
        5: "Special characters cannot be used, and cannot exceed 20 characters.",
        6: "There is already have an username in use.",
      },
      editBio: {
        1: "Done",
        2: "Bio",
      },
      editCompanyName: {
        1: "Done",
      },
      editAboutUs: {
        1: "Done",
        2: "ex) Best Manufacturing Company in Dongnai!",
      },
      editAddress: {
        1: "Done",
        2: "Level-2 district",
      },
      editTotalEmployees: {
        1: "Done",
      },
      editCompanyEmail: {
        1: "Done",
      },
      editContactNumber: {
        1: "Done",
      },
      createCompanyFinish: {
        1: "Congratulations on becoming a partner.🎉",
        2: "VinaArba will help you further spread your recruitment and promotional activities.",
        3: "We will provide a variety of services for our partner members, so please use our service a lot!",
        4: "Done",
      },
      account: {
        1: "Current Account",
        2: "Log out",
        3: "Are you sure?",
        4: "Account Withdrawal",
        5: "Are you sure?",
      },
      contact: {
        1: "Type",
        2: "Please select a contact type.",
        3: "Please enter an email to receive an answer",
        4: "Content",
        5: "Submit",
        6: "Please enter a type.",
        7: "Please enter a content.",
        8: "Please enter your email.",
        9: "Email format is invalid.",
        10: "Email",
      },
      favoritesNav: {
        1: "Post",
        2: "Job Post",
      },
      userPostListDetail: {
        1: "There is no comment. Please write a comment.😊",
        2: "Edit",
        3: "Delete",
        4: "Cancel",
        5: "Are you sure?",
        6: "Write a reply",
        7: "Add to Favorite List",
        8: "Report",
        9: "Delete from favorites",
        10: "Deleted",
        11: "Added to favorites",
        12: "Add to favorites?",
        13: "Delete from favorites?",
        14: "Ok",
        15: "Are you sure?",
      },
      userPostReportForm: {
        1: "Please select the reason for reporting the post.",
        2: "Would you like to report post?",
        3: "Thank you for reporting",
        4: "Ok",
        5: "Cancel",
      },
      userPostCommentReportForm: {
        1: "Please select the reason for reporting the comment.",
        2: "Would you like to report comment?",
        3: "Thank you for reporting",
        4: "Ok",
        5: "Cancel",
      },
      userReportForm: {
        1: "Please select the reason for reporting the user.",
      },
      companyPostUploadForm: {
        1: "Photo",
        2: "(Option)",
        3: "If there is a picture in the job posting, more people check it out.",
        4: "Limited to 5 photos.",
        5: "Title",
        6: "Please write a summary of the title.",
        7: "Contact us",
        8: "Email",
        9: "Working Day",
        10: "Mon",
        11: "Tue",
        12: "Wed",
        13: "Thu",
        14: "Fri",
        15: "Sat",
        16: "Sun",
        17: "Negotiable",
        18: "Working Time",
        19: "Start",
        20: "End",
        21: "Wage",
        22: "Details",
        23: "Ex) work examples, welfare, working conditions, ability of the applicant, preferential treatment, etc",
        24: "Submit",
        25: "Please enter a title.",
        26: "Please enter your contact.",
        27: "Please enter your email.",
        28: "Email format is invalid.",
        29: "Please enter the wage.",
        30: "Please enter details.",
        31: "Enter at least one day.",
        32: "Monthly wage",
      },
      companyPostAll: {
        1: "Select District",
        2: "All",
        3: "Close",
        4: "Ok",
        5: "Level-1",
        6: "Level-2",
        7: "and",
        8: "more",
        9: "There is no post.😂",
        10: "Limited to 5 districts",
        11: "Find a district",
        12: "Hourly wage",
        13: "Daily wage",
        14: "Monthly wage",
        15: "Per case",
        16: "Mon",
        17: "Tue",
        18: "Wed",
        19: "Thu",
        20: "Fri",
        21: "Sat",
        22: "Sun",
        23: "Negotiable",
      },
      share: {
        1: "Ok",
        2: "Cancel",
        3: "Done",
      },
    },
  },
  vn: {
    translation: {
      header: {
        userPostList: "Bảng thông báo",
        reComment: "Bình luận",
        userPostUploadForm: "Tạo bài viết",
        postCategory: "Chủ đề",
        companyPostAll: "Tuyển dụng",
        companyPostUploadForm: "Tạo bài viết tuyển dụng",
        companyReComment: "Bình luận",
        notification: "Thông báo",
        myProfileSetting: "Cài đặt",
        account: "Tài khoản",
        notificationSetting: "Thông báo",
        contact: "Đặt câu hỏi",
        termsOfService: "Điều khoản sử dụng",
        privacyPolicy: "chính sách quyền riêng tư",
        favoritesNav: "Yêu thích",
        language: "Ngôn ngữ",
        editProfile: "Trang cá nhân", //너무 길어서 Chỉnh sửa 전부 삭제
        editUsername: "Tên người dùng",
        editBio: "Tiểu sử",
        editCompanyName: "Tên doanh nghiệp",
        editAboutUs: "Giới thiệu doanh nghiệp",
        editAddress: "Địa chỉ",
        editTotalEmployees: "Số lượng nhân viên",
        editCompanyEmail: "Email doanh nghiệp",
        editContactNumber: "Số điện thoại",
        userReportForm: "Báo cáo",
        userPostReportForm: "Báo cáo",
        userPostCommentReportForm: "Báo cáo",
        userPostReCommentReportForm: "Báo cáo",
        companyPostReportForm: "Báo cáo",
        companyPostCommentReportForm: "Báo cáo",
        companyPostReCommentReportForm: "Báo cáo",
        editUserPostForm: "Chỉnh sửa",
        editUserPostCommentForm: "Chỉnh sửa",
        editUserPostReCommentForm: "Chỉnh sửa",
        editCompanyPostForm: "Chỉnh sửa",
        editCompanyPostCommentForm: "Chỉnh sửa",
        editCompanyPostReCommentForm: "Chỉnh sửa",
        editPostCategory: "Chủ đề",
      },
      welcome: {
        1: "Thiết lập tài khoản",
        2: "Đăng nhập",
      },
      logIn: {
        1: "Email",
        2: "Mật khẩu",
        3: "Tài khoản không tồn tại hoặc là mật khẩu không chính xác.",
        4: "Đăng nhập",
      },
      createAccount: {
        1: "Email",
        2: "Tên người dùng",
        3: "Mật khẩu",
        4: "Nhập lại mật khẩu",
        5: "Tiếp theo",
        6: "Không thể sử dụng ký tự đặc biệt, không vượt quá 20 ký tự.",
        7: "Hãy đặt ít nhất 8 chữ số trong đó có ít nhất trên 1 chữ số, chữ cái tiếng Anh, và chữ số đặc biệt.",
        8: "Sai mật khẩu",
        9: "Địa chỉ email này đã được sử dụng.",
        10: "Tên người dùng đã được sử dụng.",
        11: "Bắt buộc",
        12: "Chào mừng bạn đến VinaArba!",
      },
      confirmSecret: {
        1: "Hãy kiểm tra địa chỉ email.",
        2: "Mã xác nhận",
        3: "Xác nhận",
        4: "Yêu cầu lại mã xác nhận",
        5: "Thời gian còn lại",
        6: "Đã hết thời gian. Hãy nhấn vào nút yêu cầu lại mã xác nhận.",
        7: "Hãy thử lại",
        8: "Sai mã xác nhận",
        9: "Đã gửi mã xác nhận.",
        10: "Hãy thử lại sau 30 giây nữa.",
      },
      home: {
        1: "bạn là nhà tuyển dụng phải không?",
        2: "gia nhập",
        3: "Bạn đã là hội viên.",
      },
      askCompanyName: {
        1: "Tên doanh nghiệp",
        2: "Tiếp theo",
      },
      askAboutUs: {
        1: "Giới thiệu chi tiết về doanh nghiệp!",
        2: "Ví dụ: Công ty sản xuất số 1 ở Đồng Nai!",
        3: "Giới hạn lượng chữ",
        4: "Tiếp theo",
      },
      askTotalEmployees: {
        1: "Tổng số công nhân viên",
        2: "Tiếp theo",
      },
      askEmail: {
        1: "Email",
        2: "Tiếp theo",
      },
      askContactNumber: {
        1: "Số điện thoại liên hệ",
        2: "Tiếp theo",
      },
      askAddressOne: {
        1: "Tỉnh thành phố của doanh nghiệp",
        2: "Hủy",
        3: "Tiếp theo",
      },
      askAddressTwo: {
        1: "Quận·Huyện của doanh nghiệp",
        2: "Hủy",
        3: "Tiếp theo",
      },
      askAddressThree: {
        1: "Địa chỉ chi tiết của doanh nghiệp",
        2: "Tiếp theo",
      },
      createCompanyFinish: {
        1: "Hoàn thành",
      },
      userPostList: {
        1: "xem thêm",
        2: "thích",
        3: "bình luận",
      },
      categoryBoard: {
        1: "Viết về chủ đề này",
      },
      userPostUploadForm: {
        1: "Hãy chọn chủ đề cho bài đăng của bạn.",
        2: "Xong",
        3: "Bạn chỉ được đăng tối đa 5 tấm hình.",
      },
      editUserPostForm: {
        1: "Xong",
        2: "Bạn chỉ được đăng tối đa 5 tấm hình.",
      },
      notification: {
        1: " đã theo dõi bạn!",
        2: " đã bình luận vào bài viết của bạn!",
        3: " đã để lại ❤ vào bài viết của bạn!",
        4: "Bài viết thông thường",
        5: "Bài viết tuyển dụng",
        6: "Đang theo dõi",
        7: "Thông báo",
      },
      time: {
        1: "Vừa mới",
        2: "phút trước",
        3: "tiếng trước",
        4: "ngày trước",
        5: "năm trước",
      },
      myProfileSetting: {
        1: "Tài khoản",
        2: "Thông báo",
        3: "Ngôn ngữ",
        4: "Đặt câu hỏi",
        5: "Điều khoản sử dụng",
        6: "Chính sách quyền riêng tư",
        7: "Hiện tại",
        8: "Gần đây",
      },
      profile: {
        1: "Bài viết",
        2: "Tuyển dụng",
        3: "Đang theo dõi",
        4: "Người theo dõi",
        5: "Theo dõi",
        6: "Chỉnh sửa trang cá nhân",
        7: "Thông tin doanh nghiệp",
        8: "Số lượng nhân viên",
        9: "Email",
        10: "Số điện thoại",
        11: "Cài đặt",
        12: "Hủy",
        13: "Người",
        14: "Báo cáo",
      },
      editProfile: {
        1: "Tên người dùng",
        2: "Tiểu sử",
        3: "Thông tin doanh nghiệp",
        4: "Doanh nghiệp",
        5: "Giới thiệu doanh nghiệp",
        6: "Địa chỉ",
        7: "Số lượng nhân viên",
        8: "Email",
        9: "Số điện thoại",
        10: "Xoá thông tin doanh nghiệp",
        11: "Bạn chắc chắn muốn xoá?",
        12: "Người",
        13: "Chỉnh sửa ảnh đại diện",
        14: "Xong",
        15: "Xác nhận",
        16: "Hủy",
        17: "Thêm tiểu sử",
      },
      editUsername: {
        1: "Không thể thay đổi lại trong vòng 30 ngày",
        2: "Bạn đã thay đổi trong 30 ngày.",
        3: "Tên người dùng",
        4: "Xong",
        5: "Không thể sử dụng ký tự đặc biệt, không vượt quá 20 ký tự.",
        6: "Tên người dùng đã được sử dụng.",
      },
      editBio: {
        1: "Xong",
        2: "Tiểu sử",
      },
      editCompanyName: {
        1: "Xong",
      },
      editAboutUs: {
        1: "Xong",
        2: "Ví dụ: Công ty sản xuất số 1 ở Đồng Nai!",
      },
      editAddress: {
        1: "Xong",
        2: "Quận·Huyện",
      },
      editTotalEmployees: {
        1: "Xong",
      },
      editCompanyEmail: {
        1: "Xong",
      },
      editContactNumber: {
        1: "Xong",
      },
      createCompanyFinish: {
        1: "Chúc mừng bạn đã trở thành hội viên doanh nghiệp.🎉",
        2: "VinaArba sẽ giúp đỡ để phát triển những hoạt động quảng cáo hay tìm kiếm nhân lực.",
        3: "Cung cấp nhiều dịch vụ vì các hội viên, mong sau này các bạn hãy sử dụng thật nhiều!",
        4: "Xong",
      },
      account: {
        1: "Tài khoản hiện tại",
        2: "Đăng xuất",
        3: "Bạn chắc chắn muốn đăng xuất?",
        4: "Xoá tài khoản",
        5: "Bạn chắc chắn muốn xoá?",
      },
      contact: {
        1: "Loại",
        2: "Chọn loại câu hỏi.",
        3: "Nhập địa chỉ mail để nhận câu trả lời.",
        4: "Nội dung",
        5: "Xong",
        6: "Hãy nhập loại câu hỏi",
        7: "Hãy nhập nội dung",
        8: "Hãy nhập email",
        9: "Bạn đã nhập sai email.",
        10: "Email",
      },
      favoritesNav: {
        1: "Bài viết",
        2: "Tuyển dụng",
      },
      userPostListDetail: {
        1: "Không có bình luận. Hãy viết bình luận của bạn.😊",
        2: "Chỉnh sửa",
        3: "Xóa",
        4: "Hủy",
        5: "Bạn muốn xóa bài viết?",
        6: "Viết bình luận",
        7: "Thêm mục bạn yêu thích",
        8: "Báo cáo",
        9: "Xoá khỏi mục yêu thích",
        10: "Đã xoá",
        11: "Đã thêm vào mục yêu thích",
        12: "Bạn sẽ thêm vào mục yêu thích?",
        13: "Bạn sẽ xoá khỏi mục yêu thích?",
        14: "Xác nhận",
        15: "Bạn muốn xóa bình luận?",
      },
      userPostReportForm: {
        1: "Hãy chọn lí do bạn báo cáo bài viết.",
        2: "Bạn muốn báo cáo?",
        3: "Cám ơn bạn đã báo cáo.",
        4: "Xác nhận",
        5: "Hủy",
      },
      userPostCommentReportForm: {
        1: "Hãy lựa chọn lí do báo cáo bình luận",
        2: "Bạn muốn báo cáo?",
        3: "Cám ơn bạn đã báo cáo.",
        4: "Xác nhận",
        5: "Hủy",
      },
      userReportForm: {
        1: "Hãy lựa chọn lí do báo cáo tài khoản.",
      },
      companyPostUploadForm: {
        1: "Hình ảnh",
        2: "(Lựa chọn)",
        3: "Nếu có hình ảnh trong bài viết tìm người thì sẽ có nhiều người xác nhận được.",
        4: "Bạn chỉ được đăng tối đa 5 tấm hình.",
        5: "Tiêu đề",
        6: "Tóm tắt nội dung thông báo và viết.",
        7: "Số điện thoại",
        8: "Email",
        9: "Ngày làm việc",
        10: "T2",
        11: "T3",
        12: "T4",
        13: "T5",
        14: "T6",
        15: "T7",
        16: "CN",
        17: "Có thể thương lượng",
        18: "Thời gian làm việc",
        19: "Bắt đầu",
        20: "Kết thúc",
        21: "Tiền lương",
        22: "Nội dung chi tiết",
        23: "Ví dụ: nghiệp vụ, phúc lợi công ty, điều kiện làm việc, năng lực phù hợp với ứng viên, các mục được ưu tiên.",
        24: "Xong",
        25: "Hãy nhập tiêu đề.",
        26: "Hãy nhập số điện thoại.",
        27: "Hãy nhập email.",
        28: "Bạn đã nhập sai email.",
        29: "Hãy nhập tiền lương.",
        30: "Hãy nhập nội dung chi tiết.",
        31: "번역필요",
        32: "Lương tháng",
      },
      companyPostAll: {
        1: "Chọn nơi làm việc mong muốn",
        2: "Tất cả",
        3: "Đóng",
        4: "Xác nhận",
        5: "Tỉnh thành phố",
        6: "Quận·Huyện",
        7: "Ngoai ra",
        8: "vụ",
        9: "Khu vực này không bài viết tuyển dụng.😂",
        10: "번역필요",
        11: "번역필요",
        12: "Lương giờ",
        13: "Lương ngày",
        14: "Lương tháng",
        15: "Mỗi lần",
        16: "T2",
        17: "T3",
        18: "T4",
        19: "T5",
        20: "T6",
        21: "T7",
        22: "CN",
        23: "thương lượng",
      },
      share: {
        1: "Xác nhận",
        2: "Hủy",
        3: "Xong",
      },
    },
  },
};

export const loadLng = (lng) => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng,
    fallbackLng: "vn",
  });
};

export default i18n;
