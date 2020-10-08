import React, { Component } from "react";
import { 
  ImageBackground, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Dimensions
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Api } from '../../../../services';
import { updateAllIntervencoesByApicultor } from "../../../redux/actions/intervencaoActions";
import { updateAllColmeiasByApicultor } from "../../../redux/actions/colmeiaActions";
import { updateAllApiariosByApicultor } from "../../../redux/actions/apiarioActions";
import { updateAllVisitasByApicultor } from "../../../redux/actions/visitaActions";

import LinearGradient from "react-native-linear-gradient";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Text, View, Icon } from "native-base";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { colors, images, URLS, routes } from "../../../../assets";
import MarkerCallOut from "../../../componentes/MarkerCallOut";
import GooglePlacesInput from "./GooglePlacesInput";
import styles from "./styles";

const { width } = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -7.814615, // TODO: Pegar latitude e longitude real do usuário ao iniciar
        longitude: -39.234215,
        latitudeDelta: 8,
        longitudeDelta: 8
      },
    };
  }

  async componentDidMount() {
    this.fetchOfflineSyncData();
  }

  fetchOfflineSyncData = () => {
    Api.instance.get(URLS.GET_DADOS_SINCRONIZACAO_OFFLINE_URL)
      .then(response => {
        const { data } = response;

        // TODO: Fazer um object.assign com todos os dados para evitar perda de dados (não sincronizados) no redux.
        this.props.updateAllApiariosByApicultor(data.apiarios, data.apiarios_count);
        this.props.updateAllColmeiasByApicultor(data.colmeias, data.colmeias_count);
        this.props.updateAllIntervencoesByApicultor(
          data.intervencoes_apiarios,
          data.intervencoes_colmeias,
          data.intervencoes_pendentes_totais_count
        );
        this.props.updateAllVisitasByApicultor(data.visitas);
      })
      .catch(error => {});
  };

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

  static navigationOptions = {
    drawerLabel: 'HOME',
    headerTintColor: 'white',
  };

  render() {
    const {
      countColmeias,
      countApiarios,
      countIntervencoes,
      apiarios
    } = this.props;

    const mapStyleConfig = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ];

    return (
      <>
        <StatusBar backgroundColor={colors.theme_default} />

        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: hp("37.5%")}}
        >
          <ImageBackground source={images.home.cover} style={styles.coverImage}/>
          <View style={styles.viewHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon type="SimpleLineIcons" name="menu" style={{color: colors.white}} iconSize={5} active/>
            </TouchableOpacity>
          </View>
          <View style = {styles.welcomeView}>
            <Text style = {styles.welcomeName}>Olá, Abreu!</Text>
            <Text style = {styles.welcomeDay}>O que vamos fazer hoje? </Text>
          </View>
          <View style = {styles.viewInfo}>
            <TouchableOpacity onPress = {() => alert('Apiários')}>
              <View style = {styles.cardInfo}>
                {
                  countApiarios && countApiarios < 2 
                    ? (<Text style = {styles.titleCard}>{countApiarios && countApiarios} Apiário</Text>)
                    : (<Text style = {styles.titleCard}>{countApiarios && countApiarios} Apiários</Text>)
                }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate(routes.ColmeiaHome)}>
              <View style = {styles.cardInfo}>
              {
                countColmeias && countColmeias < 2 
                  ? (<Text style = {styles.titleCard}>{countColmeias && countColmeias} Colmeia</Text>)
                  : (<Text style = {styles.titleCard}>{countColmeias && countColmeias} Colmeias</Text>)
              }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate(routes.IntervencaoHome)}>
              <View style = {styles.cardInfo}>
              {
                countIntervencoes && countIntervencoes < 2 
                  ? (<Text style = {styles.titleCard}>{countIntervencoes && countIntervencoes} Intervenção</Text>)
                  : (<Text style = {styles.titleCard}>{countIntervencoes && countIntervencoes} Intervenções</Text>)
              }
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

          <MapView
            provider={PROVIDER_GOOGLE} 
            style={styles.map}
            region={this.state.region}
            zoomEnabled
            loadingEnabled
            customMapStyle = {mapStyleConfig}
          >
          {apiarios &&
            apiarios.length ?
            apiarios.map(apiario => (
              <Marker
                key = {apiario.id}
                onCalloutPress={ () => {this.onMarkerInfoPressed(pothole) } }
                coordinate={{
                  latitude: parseFloat(apiario.latitude),
                  longitude: parseFloat(apiario.longitude)
                }}
              >
                <Image source={images.icons.checkappis} style={{ width: 30, height: 30 }} />
                <MarkerCallOut title={ apiario.nome } />
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
    countIntervencoes: state.intervencaoState.countIntervencoes,
    loading:
      state.apiarioState.loading ||
      state.colmeiaState.loading ||
      state.intervencaoState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateAllApiariosByApicultor,
      updateAllColmeiasByApicultor,
      updateAllIntervencoesByApicultor,
      updateAllVisitasByApicultor
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);