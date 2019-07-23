import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Text,
  View,
  Card,
  CardItem,
  Body
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fecthIntervencoesByApicultor,
  concluirIntervencao
} from "../../../redux/actions/intervencaoActions";
import { HeaderCustom } from "../../../componentes";
import { images, routes } from "../../../../assets";

class Intervencao extends Component {
  render() {
    return (
      <Container>
        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Intervenções"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <Content padder scrollEnabled={true}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(routes.IntervencaoApiario)}>
            <Card style={{ height: 200, marginTop: 30 }}>
              <CardItem>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image
                    style={{ width: 54, height: 54 }}
                    source={images.home.apiario64}
                  />
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 22,
                      fontWeight: "bold"
                    }}
                  >
                    Intervenções para o(s) Apiario(s)
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={{ color: "#B8B8B8" }}>
                    Listar Intervenções cadastradas para o(s) seu(s) apiario(s)
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity>
            <Card style={{ height: 200}}>
              <CardItem>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Image
                    style={{ width: 54, height: 54 }}
                    source={images.home.colmeia64}
                  />
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 22,
                      fontWeight: "bold"
                    }}
                  >
                    Intervenções para as Colmeias
                  </Text>
                </View>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={{ color: "#B8B8B8" }}>
                    Listar Intervenções cadastradas para as colmeias de seu(s) apiario(s)
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fecthIntervencoesByApicultor, concluirIntervencao },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intervencao);
