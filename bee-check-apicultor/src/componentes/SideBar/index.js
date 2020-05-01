import React, { Component } from "react";
import { Image, Platform, Dimensions, StyleSheet } from "react-native";
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
import { routes, images } from "../../../assets";

const datas = [
  {
    name: "Home",
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
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={images.sider.drawerCover} style={styles.drawerCover} />

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
            <Separator bordered>
              <Text style={styles.textDivider}>CONFIGURAÇÕES</Text>
            </Separator>
            <CardItem button noBorder onPress={() => alert("Tela em construção.")}>
              <Left>
                <Thumbnail
                  square
                  source={images.sider.profile}
                  style={{ height: 30, width: 30 }}
                />
                <Text style={styles.text}>Perfil</Text>
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
    fontSize: 16,
    marginLeft: 20
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
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(SideBar);
