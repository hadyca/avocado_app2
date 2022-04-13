import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { EDIT_COMPANY_MUTATION } from "./EditCompanyNameQueries";
import EditCompanyNamePresenter from "./EditCompanyNamePresenter";

export default function ({ route: { params } }) {
  const [counting, setCounting] = useState(0);

  const navigation = useNavigation();

  const countingText = (value) => {
    return setCounting(value.length);
  };

  const updateCompanyName = (cache, result) => {
    const {
      data: { editCompany },
    } = result;
    if (editCompany.id) {
      const CompanyId = `User:${editCompany.id}`;
      cache.modify({
        id: CompanyId,
        fields: {
          companyName() {
            return editCompany.companyName;
          },
        },
      });
      navigation.navigate("EditProfile", {
        username: params.username,
        bio: params.bio,
        myCompany: editCompany,
      });
    }
  };

  const [editCompanyNameMutation, { loading }] = useMutation(
    EDIT_COMPANY_MUTATION,
    {
      update: updateCompanyName,
    }
  );

  useEffect(() => {
    if (params.myCompany.companyName?.length) {
      setCounting(params.myCompany.companyName?.length);
    }
  }, []);

  return (
    <ScreenLayout>
      <EditCompanyNamePresenter
        editCompanyNameMutation={editCompanyNameMutation}
        countingText={countingText}
        counting={counting}
        loading={loading}
        originCompanyName={params.myCompany.companyName}
      />
    </ScreenLayout>
  );
}
