import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  ko: {
    translation: {
      home: {
        "1_1": "구인, 구직자들을 위한",
        "1_2": "맞춤형 소통 공간",
        2: "기업 회원이세요?",
        3: "가입하기",
        4: "공유",
        5: "일자리 정보부터, 인생 꿀팁 정보까지",
        6: "옆 공장의 월급은 얼마일까?",
        7: "동네 맛집은 어디지?",
        8: "당신의 정보를 공유해 주세요",
        9: "채용",
        10: "봉제 작업자, 카페 알바 등 친숙한 우리의 일",
        11: "지역별로 채용 글을 확인해 보세요.",
        12: "이미 가입 되어있습니다.",
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
        1: "일·직업",
        2: "질문",
        3: "피부 미용",
        4: "출산·육아",
        5: "동네 정보",
        6: "연애·결혼",
        7: "요리·음식",
        8: "일상",
        9: "일반·기타",
        10: "방금 전",
        11: "분 전",
        12: "시간 전",
        13: "일 전",
        14: "년 전",
      },
      categoryBoard: {
        1: "이 주제로 글쓰기",
      },
      userPostUploadForm: {
        1: "게시글의 주제를 정해주세요",
        2: "완료",
        3: "사진은 5장까지만 가능합니다",
      },
      editUserPostForm: {
        1: "완료",
        2: "사진은 5장까지만 가능합니다",
      },
    },
  },
  en: {
    translation: {
      home: {
        "1_1": "Customized communication",
        "1_2": "space for job search",
        2: "Are you a corporate member?",
        3: "Sign up",
        4: "Sharing",
        5: "From job information to life tips",
        6: "How much is the monthly salary at the next factory?",
        7: "Where is the best restaurant in the neighborhood?",
        8: "Please share your information",
        9: "Recruitment",
        10: "Our familiar work, such as sewing workers and cafe part-time jobs",
        11: "Check out the recruitment by region",
        12: "Already signed up!",
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
        1: "Work·Job",
        2: "Question",
        3: "Skin care",
        4: "Parenting",
        5: "Town Info",
        6: "Love·Marriage",
        7: "Cooking·Food",
        8: "Daily life",
        9: "General·Etc",
        10: "A moment ago",
        "11_1": "minute ago",
        "11_2": "minutes ago",
        "12_1": "hour ago",
        "12_2": "hours ago",
        "13_1": "day ago",
        "13_2": "days ago",
        "14_1": "year ago",
        "14_2": "years ago",
      },
      categoryBoard: {
        1: "Writing on this topic",
      },
      userPostUploadForm: {
        1: "Please select a topic for the post",
        2: "Done",
        3: "Up to 5 photos are possible",
      },
      editUserPostForm: {
        1: "Done",
        2: "Up to 5 photos are possible",
      },
    },
  },
  vn: {
    translation: {
      home: {
        "1_1": "Nơi để cho nhà tuyển",
        "1_2": "và người lao động nói chuyện",
        2: "bạn là nhà tuyển dụng phải không?",
        3: "gia nhập",
        4: "Chia sẻ",
        5: "Từ thông tin công việc đến thông tin hữu ích cho cuộc sống",
        6: "Lương các doanh nghiệp xung quanh là bao nhiêu?",
        7: "quán ăn ngon ở đâu?",
        8: "Hãy chia sẻ thông tin của bạn",
        9: "tuyển dụng",
        10: "Các công việc quen thuộc như nhân viên may, nhân viên quán cà phê",
        11: "Kiểm tra tin tuyển dụng của từng khu vực",
        12: "Bạn đã là hội viên.",
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
        1: "Quận huyện của doanh nghiệp",
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
        1: "Công việc·Nghề nghiệp",
        2: "Câu hỏi",
        3: "Làm đẹp",
        4: "Sinh sản·Giáo dục",
        5: "Xung quanh nơi ở",
        6: "Hẹn hò·Tình yêu",
        7: "Nấu ăn·Ẩm thực",
        8: "Thường nhật",
        9: "Khác",
        10: "vừa mới",
        11: "phút trước",
        12: "tiếng trước",
        13: "ngày trước",
        14: "năm trước",
      },
      categoryBoard: {
        1: "Viết về chủ đề này",
      },
      userPostUploadForm: {
        1: "Hãy chọn chủ đề cho bài đăng của bạn",
        2: "Xong",
        3: "추가번역필요",
      },
      editUserPostForm: {
        1: "Xong",
        2: "추가번역필요",
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
