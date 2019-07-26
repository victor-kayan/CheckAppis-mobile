import React, { Component } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, Icon } from "native-base";
import { StatusBar, TouchableOpacity, Image } from "react-native";
import { colors, images } from "../../../../assets";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import GooglePlacesInput from "./GooglePlacesInput";

const styles = StyleSheet.create({
  mapContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0
  },
  map: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    bottom: 0
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.975353699999999,
        longitude: -38.7294817,
        latitudeDelta: 8,
        longitudeDelta: 8
      }
    };
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;    

    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0121
      }
    });
  };

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
              <Image source={images.home.colmeia64} />
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
              <Image source={images.home.visita64} style={styles.image} />
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
              <Image source={images.home.intervencao64} style={styles.image} />
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
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.region}
          zoomEnabled
          loadingEnabled
        />
        <GooglePlacesInput onLocationSelected={this.handleLocationSelected} />
      </>
    );
  }
}

export default Home;
