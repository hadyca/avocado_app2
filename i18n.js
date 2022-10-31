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
        8: "당신의 정보를 공유해 주세요.",
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
        8: "Please share your information.",
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
        5: "Từ thông tin công việc đến thông tin hữu ích cho cuộc sống.",
        6: "Lương các doanh nghiệp xung quanh là bao nhiêu?",
        7: "Nhà hàng, quán ăn ngon ở đâu?",
        8: "Hãy chia sẻ thông tin của bạn",
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
