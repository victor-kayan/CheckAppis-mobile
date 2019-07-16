import React, { Component } from "react";
import { Image, Modal, View } from "react-native";
import styles from "./styles";
import { Text } from "native-base";
import { images } from "../../../assets";

class SpinnerCustom extends Component {
  render() {
    return (
      <View style={{ flex: 0 }}>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => null}
        >
          <View style={styles.container}>
            <View style={{ marginHorizontal: 20 }}>
              <View style={styles.alertContainer}>
                <View style={{ borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Image source={images.gif.loading} />
                  <Text style={{ marginHorizontal: 20, fontSize: 20, fontFamily: 'regular', fontWeight: 'bold'}}>Carregando...</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SpinnerCustom;
