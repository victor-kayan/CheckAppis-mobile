import React from "react";
import { View, AsyncStorage, StyleSheet, Alert, StatusBar } from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { Spinner, Text } from "native-base";
import { colors, constants, routes } from "../../../assets";
import { Api } from "../../../services";

class LoadingLogin extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem(
      `@beecheckApp:${constants.ACCCESS_TOKEN}`
    );
    const hasAccessedBefore = await AsyncStorage.getItem(
      `@beecheckApp:${constants.FIRST_ACCESS_FLAG}`
    );
    
    if (!hasAccessedBefore) {
      this.props.navigation.navigate(routes.Onboarding);
    } else if (token) {
      Api.instance.defaults.headers.Authorization = `Bearer ${token}`;
      Api.instance.interceptors.response.use(
        function(response) {
          return response;
        },
        function(error) {
          if (
            error.response &&
            error.response.status &&
            error.response.status === 401
          ) {
            AsyncStorage.removeItem(`@beecheckApp:${constants.ACCESS_TOKEN}`);
            Alert.alert(
              "Erro na autenticação",
              "Efetue login novamente."
            );
          } else if (
            error.response &&
            error.response.status &&
            error.response.status === 500
          ) {
            Alert.alert(
              "Erro durante o processamento",
              "Serviço temporariamente indisponível."
            );
          } else if (
            error.response &&
            error.response.status &&
            error.response.status === 404
          ) {
            Alert.alert(
              "Serviço não encontrado",
              "Serviço temporariamente indisponível."
            );
          }
          
          // Do something with response error
          return Promise.reject(error);
        }
      );
      this.props.navigation.navigate(routes.Home);
    } else {
      this.props.navigation.navigate(routes.Login);
    }
  }

  render() {
    return (
      <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%'}}
        >
        <StatusBar backgroundColor={colors.theme_default} />
      <View style={styles.view}>
        <Spinner size="large" color={colors.white} />
        <View style={styles.logoName}>
          <Text
            style={{ color: colors.white, fontSize: 40, fontFamily:'Montserrat-Bold' }}
          >
            Check
          </Text>
          <Text style={{ fontSize: 40, fontFamily: 'Montserrat-Medium', color: colors.white}} note>
            Appis
          </Text>
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoName: {
    flexDirection: "row"
  }
});

export default LoadingLogin;
