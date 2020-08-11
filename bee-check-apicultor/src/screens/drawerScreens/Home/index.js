import React, { Component } from "react";
import { ImageBackground, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Image, Animated, SafeAreaView } from "react-native";
import Carousel from 'react-native-snap-carousel';
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
  map: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100%'
  },
  mapContainer: {
    flex: 1,
    position: 'relative'
  },
  welcomeName: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat Regular',
  },
  welcomeDay: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'Montserrat-Bold',
  },
  welcomeView: {
    marginHorizontal: 20,
    marginTop: 70,
    position: 'absolute'
  },
  cardInfo: {
    width: "30%",
    height: 170,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scrollCard: {
    marginTop: 160,
    marginBottom: 10,
    position: 'absolute',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1, 
    opacity: 0.1,
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  titleCard: {
    color: colors.theme_second,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 40,
  },
  qtdCard: {
    color: colors.theme_second,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginLeft: 40,
  },
  cardIcon: {
    width: '50%',
    height: '100%',
  },
  viewText: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  safeArea: {
    marginTop: 200,
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

  static navigationOptions = {
    drawerLabel: 'HOME',
    headerTintColor: 'white',
    
  };


  render() {
    const {
      countColmeias,
      countApiarios,
      coutIntervencoes,
      apiarios
    } = this.props;

    const cards = [
      { tile: 'Apiários' },
      { tile: 'Apiários' },
      { tile: 'Apiários' }
    ];
    

    return (
      <>

        <StatusBar backgroundColor={colors.theme_default} />

        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: 250}}
        >
          
          <ImageBackground source={images.home.cover} style={styles.coverImage}/>

          <View style={styles.viewHeader}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon type="SimpleLineIcons" name="menu" style={{color: colors.white}} iconSize={5} active/>
            </TouchableOpacity>
          </View>
          <View style = {styles.welcomeView}>
            <Text style = {styles.welcomeName}>Olá, Usuário!</Text>
            <Text style = {styles.welcomeDay}>O que vamos fazer hoje? </Text>
          </View>
          </LinearGradient>

          <MapView
          provider={PROVIDER_GOOGLE} 
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

          <View style = {styles.scrollCard}>
            <ScrollView horizontal={true}
              contentContainerStyle={{ width: `${100*3}%` }}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              decelerationRate="fast"
              pagingEnabled
            >
            
            <View style = {styles.cardInfo}>
              <View style = {styles.viewText}>
                <Text style = {styles.titleCard}>Apiários</Text>
                <Text style = {styles.qtdCard}>Quantidade: {countApiarios && countApiarios}</Text>
              </View>
              <Image
                style = {styles.cardIcon}
                source={require ('../../../../images/cards/apiary.png')}
              />
            </View>
            <View style = {styles.cardInfo}>
              <View style = {styles.viewText}>
                <Text style = {styles.titleCard}>Colmeias</Text>
                <Text style = {styles.qtdCard}>Quantidade: {countColmeias && countColmeias}</Text>
              </View>
              <Image
                style = {styles.cardIcon}
                source={require ('../../../../images/cards/hive.png')}
              />
            </View>
            <View style = {styles.cardInfo}>
            <View style = {styles.viewText}>
                <Text style = {styles.titleCard}>Intervenções</Text>
                <Text style = {styles.qtdCard}>Quantidade: {coutIntervencoes && coutIntervencoes}</Text>
              </View>
              <Image
                style = {styles.cardIcon}
                source={require ('../../../../images/cards/interventions.png')}
              />
            </View>
            </ScrollView>
            <View
              style={{ flexDirection: 'row'}}
              >
              {cards.map((_, i) => { 
              scrollX = new Animated.Value(0);
              let position = Animated.divide(this.scrollX, 6);
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
              });
                return (
                  <Animated.View
                    key={i} 
                    style={{height: 6, width: 6, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                  />
                );
              })}
            </View>
          </View>

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

