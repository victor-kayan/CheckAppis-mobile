
import React from "react";
import { colors } from "../../../assets";
import { Button, Icon, Text } from "native-base";

const ButtonCustom = ({
  iconRight,
  typeIconRight,
  title,
  typeIconLeft,
  iconLeft,
  onPress,
  style,
  ...rest
}) => (
    <Button {...rest} style={[{ borderRadius: 15, backgroundColor: colors.theme_primary},style]} onPress={onPress}>
    {iconLeft ? (
        <Icon
        style={{color: colors.black}}
        type={typeIconLeft}
        name={iconLeft}
    />
    ) : 
      null
    }
    <Text style={{color: colors.black}}>{title}</Text>
    {iconRight ? (
        <Icon
            style={{color: colors.black}}
            type={typeIconRight}
            name={iconRight}
        />
    ) : 
      null
    }
  </Button>
);

export default ButtonCustom;
