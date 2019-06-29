import React, { Component } from "react";
import { Image, Platform, Dimensions, StyleSheet } from "react-native";
import {
  Content,
  Text,
  CardItem,
  Icon,
  Container,
  Left,
  View,
  Separator,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../redux/actions/userActions";

const drawerCover = require("../../../images/drawer-cover.png");
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    type: "FontAwesome"
  },
  {
    name: "Colmeias",
    route: "Colmeia",
    icon: "archive",
    type: "FontAwesome"
  },
  {
    name: "Visitas",
    route: "Visita",
    icon: "calendar-check-o",
    type: "FontAwesome"
  }
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
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />

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
                      <Icon
                        active
                        name={data.icon}
                        type={data.type}
                        style={{ color: "#777", fontSize: 26, width: 30 }}
                      />
                      <Text style={styles.text}>{data.name}</Text>
                    </Left>
                  </CardItem>
                ))
              : null}
            <CardItem
              button
              noBorder
              onPress={() => this.props.navigation.navigate("Intervencao")}
            >
              <Left>
                <Thumbnail
                  square
                  source={require("../../../images/intervencaoHomeIcon.png")}
                  style={{ height: 30, width: 30 }}
                />
                <Text style={styles.text}>Intervenções</Text>
              </Left>
            </CardItem>
            <Separator bordered>
              <Text style={styles.textDivider}>configurações</Text>
            </Separator>
            <CardItem button noBorder onPress={() => this.logout()}>
              <Left>
                <Icon
                  active
                  name="sign-out"
                  type="FontAwesome"
                  style={{ color: "#777", fontSize: 26, width: 30 }}
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
