import React from "react";
import { View, Thumbnail, Text, Icon } from "native-base";

import { images } from '../../../../assets';

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
      { typeof(colmeia.foto) === 'string'  // Colmeia já sincronizada. 'colmeia.foto' é o link da imagem no Amazon AWS.
          ? (
            <Thumbnail square small source={{uri: colmeia.foto}} style={{borderRadius: 6}}/>
          ) : colmeia.foto.data ? (  // Colmeia ainda não sincronizada e possui imagem. 'colmeia.foto.datacolmeia.foto' é a imagem em Base64.
            <Thumbnail square small
              source={{uri: `data:image/png;base64,${colmeia.foto.data}`}}
              style={{borderRadius: 6}}
            />
          ) : ( // Colmeia ainda não cadastra e não possui imagem.
            <Thumbnail square small source={images.fotoDefault} style={{borderRadius: 6}}/>
          )
      }
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
