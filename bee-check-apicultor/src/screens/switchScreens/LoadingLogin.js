import React from "react";
import { View, AsyncStorage, StyleSheet, Image } from "react-native";
import { Spinner, Text, Alert } from "native-base";
import { colors, constants } from "../../../assets";
import { Api } from "../../../services";
const logo = require("../../../images/logo.png");

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
          if (error.response.status === 401) {
            AsyncStorage.removeItem(`@beecheckApp:${constants.ACCESS_TOKEN}`);
            // this.props.navigation.navigate("Login");
            alert("Erro na autenticação. Por favor,efetue login novamente");
          }else if (error.response.status === 500) {
            alert("Servico temporariamente indisponivel");
          }else if (error.response.status === 404) {
            alert("Servidor temporariamente indisponivel");
          }
          // Do something with response error
          return Promise.reject(error);
        }
      );
      this.props.navigation.navigate("Home");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <View style={styles.view}>
        <Image source={logo} />
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
