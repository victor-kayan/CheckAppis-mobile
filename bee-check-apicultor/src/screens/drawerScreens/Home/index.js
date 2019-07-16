import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, Icon } from "native-base";
import { StatusBar, TouchableOpacity, Image, ScrollView } from "react-native";
import { colors, routes, images } from "../../../../assets";
import styles from "./styles";

const CardMenu = ({ uri, text, onPress, textButton }) => {
  // console.log("color", color);

  return (
    <View
      style={{
        height: 200,
        backgroundColor: "#fff",
        marginHorizontal: 8,
        marginTop: 8,
        borderColor: "rgba(0, 0, 0, 0.14)",
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 2,
        shadowColor: "rgba(255, 191, 0, 0.4)",
        shadowOffset: { height: 4, width: 4 }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 10
        }}
      >
        <Image style={{ paddingRight: 10 }} source={uri} />
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={5}
          style={{ color: "rgba(0, 0, 0, 0.59)", marginHorizontal: 20 }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          flexDirection: "column-reverse",
          flex: 1,
          paddingEnd: 10,
          paddingBottom: 10
        }}
      >
        <View
          style={{
            backgroundColor: colors.theme_primary,
            width: 220,
            height: 45,
            borderRadius: 7
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingTop: 10
            }}
            onPress={onPress}
          >
            <Text>{textButton}</Text>
            <Icon type="SimpleLineIcons" name="action-redo" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

class Home extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.theme_default} />
        <LinearGradient
          colors={[colors.theme_default, "#F4CC26", "#FFDD50", "#FFE579"]}
          style={{ height: "40%" }}
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
              alignItems: "center"
            }}
          >
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={images.home.colmeia64}
              />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  Colmeias
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={images.home.visita64}
                style={styles.image}
              />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  Visitas
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image
                source={images.home.intervencao64}
                style={styles.image}
              />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  100
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  Intervenções
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <ScrollView style={{ marginBottom: 8 }}>
          <CardMenu
            uri={images.home.colmeia64}
            onPress={() => this.props.navigation.navigate(routes.ColmeiaHome)}
            textButton="Ir para Colmeias"
            text={
              "Em Colmeias  você pode controlar  todas as colmeias de seu(s) apiario(s)"
            }
          />
          <CardMenu
            uri={images.home.visita64}
            onPress={() => this.props.navigation.navigate(routes.VisitasHome)}
            text={
              "Em Colmeias  você pode controlar  todas as colmeias de seu(s) apiario(s)"
            }
            textButton="Ir para Visitas"
          />
          <CardMenu
            uri={images.home.intervencao64}
            text={
              "Em Colmeias  você pode controlar  todas as colmeias de seu(s) apiario(s)"
            }
            onPress={() =>
              this.props.navigation.navigate(routes.IntervencaoHome)
            }
            textButton="Ir para Intervenções"
          />
        </ScrollView>
      </>
    );
  }
}

export default Home;
