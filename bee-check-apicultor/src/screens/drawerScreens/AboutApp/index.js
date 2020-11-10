import React, { Component } from "react";
import { TouchableOpacity, ImageBackground, StatusBar, Image } from "react-native";

import "moment/locale/pt-br";

import { Text, Container, View } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { colors, images, URLS } from "../../../../assets";
import openLinkInBrowser from '../../../componentes/InAppBrowser';
import styles from "./styles";

class AboutApp extends Component {
  render() {
    const { POLITICA_DE_PRIVACIDADE_URL, MANUAL_DO_APLICATIVO_URL } = URLS;

    return (
      <Container>
        <StatusBar backgroundColor={colors.theme_default} />

        <View style = {styles.container}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%'}}
        >
          <ImageBackground source={images.headers.hive} style = {{resizeMode: 'cover', flex: 1, opacity: 0.1}}/>
        </LinearGradient>

        <View style = {styles.viewInformations}>
          <Image source={images.sider.logo} style = {styles.logo}/>

          <Text style = {styles.version}>Versão 1.09.11.20</Text>
          <Text style = {styles.copyright}>© 2017-2020 CheckAppis</Text>
          <Text style = {styles.ifrn}>IFRN - Campus Pau dos Ferros</Text>

          <TouchableOpacity style = {styles.openLinkButton} onPress={() => openLinkInBrowser(POLITICA_DE_PRIVACIDADE_URL)}>
            <Text style = {styles.textButton}>POLÍTICA DE PRIVACIDADE</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.openLinkButton} onPress={() => openLinkInBrowser(MANUAL_DO_APLICATIVO_URL)}>
            <Text style = {styles.textButton}>MANUAL DO APLICATIVO</Text>
          </TouchableOpacity>
        </View>
        
        </View>
      </Container>
    );
  }
}


export default (AboutApp);
