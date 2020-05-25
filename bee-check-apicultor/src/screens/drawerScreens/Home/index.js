import React, { Component } from "react";
import { StyleSheet, StatusBar, TouchableOpacity, Image } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Text, View, Icon } from "native-base";
import { colors, images } from "../../../../assets";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import GooglePlacesInput from "./GooglePlacesInput";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getCountApiariosByApicultor,
  fetchApiariosByUser
} from "../../../redux/actions/apiarioActions";
import { getCountColmeiasApiariosByApicultor } from "../../../redux/actions/colmeiaActions";
import { getCountIntervencoesByApicultor } from "../../../redux/actions/intervencaoActions";

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

  componentDidMount() {
    this.props.getCountApiariosByApicultor();
    this.props.getCountColmeiasApiariosByApicultor();
    this.props.getCountIntervencoesByApicultor();
    this.props.fetchApiariosByUser();
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
    const {
      countColmeias,
      countApiarios,
      coutIntervencoes,
      apiarios
    } = this.props;

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
              <Image source={images.home.apiario64} style={styles.image} />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  {countApiarios && countApiarios}
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  {countApiarios && countApiarios === 1
                    ? "Apiário"
                    : "Apiários"}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image source={images.home.colmeia64} />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  {countColmeias && countColmeias}
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  {countColmeias && countColmeias === 1
                    ? "Colmeia"
                    : "Colmeias"}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "center", width: "33%" }}>
              <Image source={images.home.intervencao64} style={styles.image} />
              <View style={{ marginTop: "15%", alignItems: "center" }}>
                <Text
                  style={{ color: "#ff8416", fontWeight: "bold", fontSize: 25 }}
                >
                  {coutIntervencoes && coutIntervencoes}
                </Text>
                <Text
                  style={{
                    marginTop: "10%",
                    color: "#ff8416",
                    fontWeight: "bold",
                    fontSize: 17
                  }}
                >
                  {coutIntervencoes && coutIntervencoes === 1
                    ? "Intervencao"
                    : "Intervenções"}
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
        >
          {apiarios &&
            apiarios.length ?
            apiarios.map(apiario => (
              <Marker
                key={apiario.id}
                coordinate={{
                  latitude: parseFloat(apiario.latitude),
                  longitude: parseFloat(apiario.longitude)
                }}
              >
                <Image source={images.icons.apiario} style={{ width: 30, height: 30 }} />
              </Marker>
            )): null}
        </MapView>
        <GooglePlacesInput onLocationSelected={this.handleLocationSelected} />
      </>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    countApiarios: state.apiarioState.countApiarios,
    countColmeias: state.colmeiaState.countColmeias,
    coutIntervencoes: state.intervencaoState.coutIntervencoes,
    loading:
      state.apiarioState.loading ||
      state.colmeiaState.loading ||
      state.intervencaoState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCountApiariosByApicultor,
      fetchApiariosByUser,
      getCountColmeiasApiariosByApicultor,
      getCountIntervencoesByApicultor
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
