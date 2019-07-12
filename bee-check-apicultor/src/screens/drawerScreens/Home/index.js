import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, Icon } from "native-base";
import { StatusBar, TouchableOpacity, Image } from "react-native";
import { colors } from "../../../../assets";
import styles from "./styles";

class Home extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.theme_default} />
        <LinearGradient
          colors={[colors.theme_default, "#F4CC26", "#FFDD50", "#FFE579"]}
          style={{ height: "50%" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginHorizontal: 20,
              marginTop: 20
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon type="AntDesign" name="menuunfold" active />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              marginTop: "5%",
              alignItems: "center"
            }}
          >
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={require("../../../../images/home/colmeiaIcon1.png")}
              />
              <View style={{ marginTop: "20%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{ marginTop: "10%", color: "#ff8416", fontWeight: "bold", fontSize: 17 }}
                >
                  Colmeias
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={require("../../../../images/home/visitaIcon1.png")}
                style={styles.image}
              />
              <View style={{ marginTop: "20%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{ marginTop: "10%", color: "#ff8416", fontWeight: "bold", fontSize: 17 }}
                >
                  Visitas
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={require("../../../../images/home/intervencaoIcon1.png")}
                style={styles.image}
              />
              <View style={{ marginTop: "20%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{ marginTop: "10%", color: "#ff8416", fontWeight: "bold", fontSize: 17 }}
                >
                  Intervenções
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </>
    );
  }
}

export default Home;
