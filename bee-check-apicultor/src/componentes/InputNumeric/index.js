import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Icon, Input, View } from "native-base";
import { colors } from "../../../assets";

const InputNumeric = ({ value, onChangePlus, onChangeMinus }) => (
  <View style={{ flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', marginVertical: 6 }}>
    <TouchableOpacity
      small
      onPress={onChangeMinus}
      style={{
        borderRadius: 20,
        height: 40,
        width: 40,
        backgroundColor: colors.theme_second,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon type="AntDesign" style={{color: colors.white, fontSize: 16, alignSelf: 'center'}} name="minus" />
    </TouchableOpacity>
    <Input
      underlineColorAndroid="transparent"
      autoCapitalize="characters"
      placeholder="0"
      value={value.toString()}
      style={{ textAlign: "center", fontFamily: 'Montserrat Regular'}}
    />
    <TouchableOpacity
      small
      onPress={onChangePlus}
      style={{
        borderRadius: 25,
        height: 40,
        width: 40,
        backgroundColor: colors.theme_second,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }}
    >
      <Icon type="AntDesign" style={{color: colors.white, fontSize: 16, alignSelf: 'center'}} name="plus" />
    </TouchableOpacity>
  </View>
);

export default InputNumeric;
