import React from "react";
import { Image } from "react-native";
import { images } from "../../../../assets";
import styles from "./styles";
import { Picker } from "native-base";

export const RenderSelectApiario = ({
  apiarios,
  selectedPickerApiario,
  onValueChangePickerApiario
}) => {

  return (
    <>
      <Image
        source={images.icons.apiario}
        style={styles.iconImagemSelectPicker}
      />
      <Picker
        mode="dropdown"
        selectedValue={selectedPickerApiario}
        style={styles.pikerLisitApiario}
        onValueChange={apiario =>
          onValueChangePickerApiario(apiario)
        }
      >
        <Picker.Item
          enabled={false}
          key={null}
          label={"Selecione um Apiario"}
          value={null}
        />
        {!apiarios ? (
          <Picker.Item
            enabled={false}
            note
            label={"Nenhum Apiario encontrado"}
          />
        ) : (
          apiarios.map(data => (
            <Picker.Item key={data.id} label={data.nome} value={data} />
          ))
        )}
      </Picker>
    </>
  );
};
