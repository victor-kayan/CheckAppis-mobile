import React from "react";
import { colors } from "../../../assets";
import Spinner from "react-native-loading-spinner-overlay";

const SpinnerCustom = ({ title, visible, ...rest }) => (
  <Spinner
    {...rest}
    color={colors.black}
    visible={visible}
    textContent={title ? title : "Carregando..."}
    textStyle={{color: colors.black}}
  />
);

export default SpinnerCustom;
