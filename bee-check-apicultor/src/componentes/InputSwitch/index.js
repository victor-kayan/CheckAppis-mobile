import React from "react";
import Switch from "switch-button-react-native";
import { colors } from "../../../assets";

const InputSwitch = ({ value, onValueChange, ...rest }) => (
  <Switch
    {...rest}
    onValueChange={onValueChange}
    text1="NÃO"
    text2="SIM"
    switchHeight={44}
    switchdirection="ltr"
    switchBorderRadius={100}
    switchSpeedChange={500}
    switchBorderColor="#d4d4d4"
    switchBackgroundColor="#fff"
    btnBorderColor={colors.black}
    btnBackgroundColor={colors.theme_default}
    fontColor="#b1b1b1"
    activeFontColor="#fff"
    value={value}
  />
);

export default InputSwitch;
