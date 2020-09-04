
import React from "react";
import { colors } from "../../../assets";
import { Button, Icon, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";

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
    <Button {...rest} style={[{ 
      borderRadius: 50, 
      backgroundColor: colors.theme_default,
      marginTop: 40,
      paddingBottom: 0,
      paddingTop: 0,
      },style]} onPress={onPress}>
        <LinearGradient
            colors={[colors.theme_default, colors.theme_second]}
            style={{ height: '100%', borderRadius: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}
          >
    {iconLeft ? (
        <Icon
        style={{color: colors.white}}
        type={typeIconLeft}
        name={iconLeft}
    />
    ) : 
      null
    }
    <Text style={{color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 13}}>{title}</Text>
    {iconRight ? (
        <Icon
            style={{color: colors.white, marginLeft: 0}}
            type={typeIconRight}
            name={iconRight}
        />
    ) : 
      null
    }
    </LinearGradient>
  </Button>
);

export default ButtonCustom;
