import React from "react";
import { Image } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";

import {
  Card,
  CardItem,
  Body,
  View,
  Text,
  Left,
  Right,
  Grid,
  Col
} from "native-base";
import { ButtonCustom } from "../../../componentes";

export const ItemLista = ({ intervencao }) => {
  console.log(intervencao.apiario);

  return (
    <Card>
      <CardItem>
        <Body>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ paddingHorizontal: 20, width: 45, height: 45 }}
              source={images.home.apiario64}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Apiario: </Text>
              <Text style={{ color: "#A1A1A1" }}>
                {intervencao &&
                  intervencao.apiario &&
                  intervencao.apiario.nome &&
                  intervencao.apiario.nome}
              </Text>
            </View>
          </View>
        </Body>
      </CardItem>
      <CardItem>
        <Text style={{ fontWeight: "bold" }}>Periodo de aplicação:</Text>
      </CardItem>
      <CardItem>
        <Grid>
          <Col>
            <View style={{ flexDirection: "row" }}>
              <Image source={images.icons.clock_success} />
              <Text
                style={{
                  color: "#578360",
                  fontSize: 12,
                  marginLeft: 5,
                  marginTop: 3
                }}
              >
                {moment(
                  intervencao &&
                    intervencao.data_inicio &&
                    intervencao.data_inicio
                ).format("DD MMMM  YYYY")}
              </Text>
            </View>
          </Col>
          <Col>
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Image source={images.icons.clock_danger} />
              <Text
                style={{
                  color: "#B3404A",
                  fontSize: 12,
                  marginLeft: 5,
                  marginTop: 3
                }}
              >
                {moment(
                  intervencao && intervencao.data_fim && intervencao.data_fim
                ).format("DD MMMM  YYYY")}
              </Text>
            </View>
          </Col>
        </Grid>
      </CardItem>
      <CardItem>
        <Left />
        <Right>
          <ButtonCustom
            onPress={() => console.log("detalhar")}
            small
            iconRight="search"
            typeIconRight="FontAwesome"
            title="Detalhar"
          />
        </Right>
      </CardItem>
    </Card>
  );
};
