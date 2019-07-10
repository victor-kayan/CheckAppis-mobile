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
      <Thumbnail square small source={{ uri: colmeia.foto }} />
      <Text style={{ paddingHorizontal: 15 }}>
        {colmeia.nome ? colmeia.nome : `Colmeia ${index}`}
      </Text>
    </View>
    <Icon
      style={{
        color: colorIcon
      }}
      name="check-square-o"
      type="FontAwesome"
    />
  </View>
);

export default ColmeiaItem;
