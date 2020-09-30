import React from "react";
import Switch from "switch-button-react-native";
import { colors } from "../../../assets";

const InputSwitch = ({ value, onValueChange, ...rest }) => (
  <Switch
    {...rest}
    onValueChange={onValueChange}
    text1="Não"
    text2="Sim"
    switchHeight={44}
    switchdirection="ltr"
    switchBorderRadius={100}
    switchSpeedChange={500}
    switchBorderColor="#d4d4d4"
    switchBackgroundColor="#fff"
    btnBorderColor="transparent"
    btnBackgroundColor={colors.theme_second}
    fontColor="#b1b1b1"
    fontFamily='Montserrat-Medium'
    activeFontColor="#fff"
    value={value}
  />
);

export default InputSwitch;
