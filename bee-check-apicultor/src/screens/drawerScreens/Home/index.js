import React, { Component } from "react";
import { ImageBackground, AsyncStorage, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Image, Animated, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, Icon } from "native-base";
import { colors, images, constants } from "../../../../assets";
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
import styles from "./styles";

const { width } = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.975353699999999,
        longitude: -38.7294817,
        latitudeDelta: 8,
        longitudeDelta: 8
      },
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
      { tile: 'Colmeias' },
      { tile: 'Intervenções' },
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
            <Text style = {styles.welcomeName}>Olá, Abreu!</Text>
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
              contentContainerStyle={{ width: `${100*3}%`}}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              decelerationRate="fast"
              pagingEnabled
              onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
              )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
              scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
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
              let position = Animated.divide(scrollX, width);
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1], 
                outputRange: [0.3, 1, 0.3], 
                extrapolate: 'clamp' 
              });
                return (
                  <Animated.View
                    key={i} 
                    style={{opacity, height: 6, width: 6, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
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

