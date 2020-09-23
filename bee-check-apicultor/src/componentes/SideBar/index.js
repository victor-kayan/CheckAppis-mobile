import React, { Component } from "react";
import { ImageBackground, Platform, Dimensions, StyleSheet, Image } from "react-native";

import {
  Content,
  Text,
  CardItem,
  Container,
  Left,
  View,
  Separator,
  Thumbnail
} from "native-base";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../redux/actions/userActions";
import { routes, images, colors } from "../../../assets";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

const datas = [
  {
    name: "Início",
    route: routes.Home,
    icon: images.sider.home
  },
  {
    name: "Colmeias",
    route: routes.ColmeiaHome,
    icon: images.sider.colmeia
  },
  {
    name: "Visitas",
    route: routes.VisitasHome,
    icon: images.sider.visita
  },
  {
    name: "Intervenções",
    route: routes.IntervencaoHome,
    icon: images.sider.intervencao
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  // sair da conta
  logout = () => {
    this.props.logout();
    this.props.navigation.navigate(routes.Login);
  };

  render() {
    return (
      <Container>
        <Content bounces = {false} style = {styles.container}>

          <LinearGradient
            colors={[colors.theme_default, colors.theme_second]}
            style={{ height: 220, marginBottom: 20, justifyContent: 'center'}}
          >
            <ImageBackground source={images.headers.hive} style = {{resizeMode: 'cover', flex: 1, opacity: 0.1, }}/>
            <Image source={images.sider.logo} style = {styles.logo}/>
          </LinearGradient>

          <View>

            {datas && Object.keys(datas).length
              ? datas.map(data => (
                  <CardItem
                    key={data.name}
                    button
                    noBorder
                    onPress={() => this.props.navigation.navigate(data.route)}
                  >
                    <Left>
                      <Thumbnail
                        square
                        source={data.icon}
                        style={styles.icon}
                      />
                      <Text style={styles.text}>{data.name}</Text>
                    </Left>
                  </CardItem>
                ))
              : null}

            <Separator style = {styles.separator}/>
              
            <CardItem button noBorder onPress={() => this.props.navigation.navigate(routes.Perfil)}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.profile}
                  style={styles.icon}
                />
                <Text style={styles.text}>Perfil</Text>
              </Left>
            </CardItem>

            <CardItem button noBorder onPress={() => this.props.navigation.navigate(routes.AboutApp)}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.info}
                  style={styles.icon}
                />
                <Text style={styles.text}>Sobre o aplicativo</Text>
              </Left>
            </CardItem>

            <CardItem button noBorder onPress={() => this.logout()}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.logout}
                  style={styles.icon}
                />
                <Text style={styles.text}>Sair</Text>
              </Left>
            </CardItem>

          </View>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(SideBar);
