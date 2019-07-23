import React, { Component } from "react";
import { Image } from "react-native";
import { Container, View, CardItem, Text } from "native-base";
import { HeaderCustom } from "../../../componentes";

class DetalhesIntervencao extends Component {
  render() {
    const intervencao = this.props.navigation.getParam("intervencao", "");

    console.log("intervencao nio detalhes", intervencao);

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <CardItem>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ width: 54, height: 54 }}
              source={{
                uri: intervencao && intervencao.user && intervencao.user.foto
              }}
            />
            <View>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              >
                Intervenções para o(s) Apiario(s)
              </Text>
            </View>
          </View>
        </CardItem>
      </Container>
    );
  }
}

export default DetalhesIntervencao;
