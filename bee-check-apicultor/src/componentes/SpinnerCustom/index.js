import React from "react";
import { Image, Modal, View } from "react-native";

const imageLoading = require("../../../images/loading.gif");

const SpinnerCustom = ({ title, visible, ...rest }) => (
  <Modal visible={visible} onRequestClose={()  => null} transparent={true}>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(23,24,26,0.2)"
      }}
    >
      <View style={{ borderRadius: 10, padding: 25 }}>
        <Image source={imageLoading} />
      </View>
    </View>
  </Modal>
);

export default SpinnerCustom;
