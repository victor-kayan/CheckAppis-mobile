import React, { Component } from "react";
import { Image, Modal, View } from "react-native";
import styles from "./styles";
import { Text, Spinner } from "native-base";
import { colors } from "../../../assets";

class SpinnerCustom extends Component {
  render() {
    return (
      <View style={{ flex: 0}}>
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
                  <Spinner size="large" color={colors.theme_default} />
                  <Text style={{ marginHorizontal: 20, fontSize: 16, fontFamily: 'Montserrat-Medium'}}>Carregando...</Text>
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
