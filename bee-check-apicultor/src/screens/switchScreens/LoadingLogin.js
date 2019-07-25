import React from "react";
import { View, AsyncStorage, StyleSheet, Image, Alert } from "react-native";
import { Spinner, Text } from "native-base";
import { colors, constants, routes, images } from "../../../assets";
import { Api } from "../../../services";

class LoadingLogin extends React.Component {
  async componentDidMount() {
    var token = await AsyncStorage.getItem(
      `@beecheckApp:${constants.ACCESS_TOKEN}`
    );

    if (token) {
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
              "Por favor,efetue login novamente"
            );
          } else if (
            error.response &&
            error.response.status &&
            error.response.status === 500
          ) {
            Alert.alert(
              "Erro durante o processamento",
              "Servico temporariamente indisponivel"
            );
          } else if (
            error.response &&
            error.response.status &&
            error.response.status === 404
          ) {
            Alert.alert(
              "Serviço não encontrado",
              "Servidor temporariamente indisponivel"
            );
          } else {
            Alert.alert(
              "Serviço indisponivel",
              "Contate o admistrador do sistema"
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
      <View style={styles.view}>
        <Image source={images.logo} />
        <View style={styles.logoName}>
          <Text
            style={{ color: colors.black, fontWeight: "bold", fontSize: 40 }}
          >
            Bee
          </Text>
          <Text style={{ fontSize: 40, marginHorizontal: 10 }} note>
            Check
          </Text>
        </View>
        <Spinner size="large" color={colors.theme_default} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoName: {
    flexDirection: "row"
  }
});

export default LoadingLogin;
