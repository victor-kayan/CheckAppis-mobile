import React from "react";
import { Image } from "react-native";
import { images } from "../../../../assets";
import { View, Text } from "native-base";
import { ButtonCustom } from "../../../componentes";

export const ColmeiasSemIntervencao = ({ onReturnHome }) => (
  <View
    style={{
      flex: 1,
      marginHorizontal: "8%",
      marginTop: "20%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between"
    }}
  >
    <View>
      <Text>No monento não há nenhuma Intervenção especifica para as Colmeias de seu(s) Apiario(s)</Text>
    </View>
    <View>
      <Image source={images.home.checked} />
    </View>
    <ButtonCustom
      onPress={() => onReturnHome()}
      iconLeft="home"
      typeIconLeficonLeft="AntDesign"
      title="Retornar a tela inical"
      style={{
        alignSelf: "flex-end",
        marginHorizontal: "8%"
      }}
    />
  </View>
);
