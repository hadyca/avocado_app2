import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  useWindowDimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";

const Container = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const Img = styled.Image``;

const DotView = styled.View`
  flex-direction: row;
  position: absolute;
  align-self: center;
  bottom: 0;
`;

const Dot = styled.Text`
  color: ${(props) => (props.active ? "white" : "#888")};
  margin: 3px;
  font-size: ${(props) => props.size / 40}px;
`;

export default function ImageSlider({ file }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { width } = useWindowDimensions();

  const height = Math.ceil(width * 0.6);

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    if (slide !== active) {
      setActive(slide);
    }
  };

  // const images = [
  //   {
  //     // Simplest usage.
  //     url: data?.seeProfile?.avatarUrl,
  //     // width: 200,
  //     // height: 200,
  //     // Optional, if you know the image size, you can set the optimization performance

  //     // You can pass props to <Image />.
  //     props: {},
  //   },
  // ];

  console.log(file[0].fileUrl);

  return (
    <Container width={width} height={height}>
      <ScrollView
        horizontal
        scrollEventThrottle="16"
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {file &&
          file.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setIsModalOpen(true)}
            >
              <Img
                key={index}
                source={{ uri: item.fileUrl }}
                style={{ width, height, resizeMode: "cover" }}
              />
            </TouchableWithoutFeedback>
          ))}
      </ScrollView>
      <DotView>
        {file &&
          file.map((item, index) => (
            <Dot active={index === active} key={index} size={width}>
              ⬤
            </Dot>
          ))}
      </DotView>
      <Modal visible={isModalOpen} transparent={true}>
        <ImageViewer
          imageUrls={images}
          saveToLocalByLongPress={false}
          renderHeader={() => (
            <TouchableOpacity
              style={{
                zIndex: 3,
                position: "absolute",
                top: 50,
                left: 10,
              }}
              onPress={() => setIsModalOpen(false)}
            >
              <Ionicons name="close-outline" size={35} color="white" />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </Container>
  );
}
