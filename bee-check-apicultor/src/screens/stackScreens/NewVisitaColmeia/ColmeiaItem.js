import React from "react";
import { View, Thumbnail, Text, Icon } from "native-base";

const ColmeiaItem = ({ colmeia, colorIcon }) => (
  <View
    key={colmeia.id}
    style={{
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 30
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Thumbnail style = {{borderRadius: 6}} quare small source={{ uri: colmeia.foto }} />
      <Text style={{ paddingHorizontal: 14, fontFamily: 'Montserrat Regular' }}>
        {colmeia.nome ? colmeia.nome : `Colmeia ${index}`}
      </Text>
    </View>
    <Icon
      style={{
        color: colorIcon
      }}
      name="checksquareo"
      type="AntDesign"
    />
  </View>
);

export default ColmeiaItem;
