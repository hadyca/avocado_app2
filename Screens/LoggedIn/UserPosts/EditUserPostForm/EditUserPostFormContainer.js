import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import EditUserPostFormPresenter from "./EditUserPostFormPresenter";
import { EDIT_USERPOST_MUTATION } from "./EditUserPostFormQueries";

export default function ({ route: { params } }) {
  const [screenName, setScreenName] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const navigation = useNavigation();

  const updateEditUserPost = (cache, result) => {
    const {
      data: {
        editUserPost: { ok, id },
      },
    } = result;
    if (ok) {
      const UserPostId = `UserPost:${params.id}`;

      cache.modify({
        id: UserPostId,
        fields: {
          content() {
            return editedContent;
          },
          category() {
            return params.category;
          },
          file() {
            return photo[0]?.fileUrl;
          },
        },
      });
    }
    navigation.navigate("UserPostListDetail", {
      id,
      fromWhere: screenName,
    });
  };
  const [editUserPostMutation, { loading }] = useMutation(
    EDIT_USERPOST_MUTATION,
    {
      update: updateEditUserPost,
    }
  );

  const goToCategory = () =>
    navigation.navigate("EditPostCategory", { id: params.id });

  useEffect(() => {
    if (params.screenName) {
      setScreenName(params.screenName);
    }
  }, []);

  const handleEdit = (content) => {
    setEditedContent(content);
  };
  console.log(params);
  return (
    <EditUserPostFormPresenter
      content={params.content}
      loading={loading}
      userPostId={params.id}
      category={params.category}
      editUserPostMutation={editUserPostMutation}
      goToCategory={goToCategory}
      handleEdit={handleEdit}
      file={params.file}
      fileLength={params.file.length}
    />
  );
}
