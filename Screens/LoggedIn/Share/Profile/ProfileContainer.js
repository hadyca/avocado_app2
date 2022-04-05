import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../../../Components/ScreenLayout";
import { PROFILE_QUERY, COMPANYPOST_QUERY } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";
import DistrictCompanyPost from "../../../../Components/Post/DistrictCompanyPost";

export default function ({ route: { params } }) {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { data, loading, refetch } = useQuery(PROFILE_QUERY, {
    variables: {
      userId: parseInt(params.id),
    },
  });

  // const {
  //   data: postData,
  //   loading: postLoading,
  //   refetch: postRefetch,
  // } = useQuery(COMPANYPOST_QUERY, {
  //   variables: {
  //     companyId: parseInt(data?.seeProfile?.myCompany?.id),
  //     offset: 0,
  //   },
  // });

  // const renderPost = ({ item }) => {
  //   if (item.deleted === false) {
  //     return <DistrictCompanyPost {...item} />;
  //   } else {
  //     return null;
  //   }
  // };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFetch = async () => {
    if (loading) {
      return;
    } else {
      setFetchLoading(true);
      await fetchMore({
        variables: {
          offset: postData?.seeCompanyAllPosts?.length,
        },
      });
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: loading ? "Loading..." : data?.seeProfile?.username,
    });
  }, [data]);

  return (
    <ScreenLayout loading={loading}>
      <ProfilePresenter
        handleFetch={handleFetch}
        refreshing={refreshing}
        refresh={refresh}
        data={data}
        // postData={postData}
        // renderPost={renderPost}
        fetchLoading={fetchLoading}
      />
    </ScreenLayout>
  );
}
