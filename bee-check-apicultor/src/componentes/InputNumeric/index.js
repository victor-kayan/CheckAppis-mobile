import React from "react";
import { TouchableOpacity } from "react-native";
import { Button, Icon, Input, View } from "native-base";
import { colors } from "../../../assets";

const InputNumeric = ({ value, onChangePlus, onChangeMinus }) => (
  <View style={{ flex: 1, flexDirection: "row" }}>
    <Button
      small
      onPress={onChangeMinus}
      style={{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.theme_default,
        marginTop: 10,
      }}
    >
      <Icon type="MaterialCommunityIcons" style={{color: colors.black}} name="minus" />
    </Button>
    <Input
      underlineColorAndroid="transparent"
      autoCapitalize="characters"
      placeholder="0"
      value={value.toString()}
      style={{ textAlign: "center"}}
    />
    <Button
      small
      onPress={onChangePlus}
      style={{
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.theme_default,
        marginTop: 10,
    }}
    >
      <Icon type="MaterialCommunityIcons" style={{color: colors.black}} name="plus" />
    </Button>
  </View>
);

export default InputNumeric;
