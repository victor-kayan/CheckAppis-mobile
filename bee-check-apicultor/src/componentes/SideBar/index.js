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

  logout = () => {
    this.props.logout();
    this.props.navigation.navigate(routes.Login);
  };

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ backgroundColor: "#fff", height: '100%' }}
        >
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
                          style={{ height: 30, width: 30 }}
                        />
                      <Text style={styles.text}>{data.name}</Text>
                    </Left>
                  </CardItem>
                ))
              : null}
            <Separator style = {{backgroundColor: 'white', borderBottomColor: colors.blackgrey, borderBottomWidth: 1, width: '93%', alignSelf: 'flex-end', height: 15, marginBottom: 8}}/>
              
            <CardItem button noBorder onPress={() => this.props.navigation.navigate(routes.Perfil)}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.profile}
                  style={{ height: 30, width: 30 }}
                />
                <Text style={styles.text}>Perfil</Text>
              </Left>
            </CardItem>
            <CardItem button noBorder onPress={() => this.props.navigation.navigate(routes.AboutApp)}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.info}
                  style={{ height: 30, width: 30 }}
                />
                <Text style={styles.text}>Sobre o aplicativo</Text>
              </Left>
            </CardItem>
            <CardItem button noBorder onPress={() => this.logout()}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.logout}
                  style={{ height: 30, width: 30 }}
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

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10
  },
  drawerImage: {
    position: "absolute",
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  text: {
    fontSize: 14,
    marginLeft: 20,
    fontFamily: 'Montserrat-Medium',
  },
  textDivider: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 12,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  logo: {
    height: '29%',
    width: '70%',
    alignSelf: 'center',
    position: 'absolute',
    opacity: 0.9,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(SideBar);
