import React from "react";
import { colors } from "../../../assets";
import { Header, Left, Icon, Button, Body, Title, Right } from "native-base";

const HeaderCustom = ({
  iconRight,
  typeIconRight,
  handleIconRight,
  title,
  typeIconLeft,
  iconLeft,
  handleIconLeft,
  ...rest
}) => (
  <Header
    {...rest}
    style={{ backgroundColor: colors.theme_default }}
    androidStatusBarColor={colors.colorAndroidBarraStatus}
  >
    {iconLeft ? (
      <Left>
        <Button transparent onPress={handleIconLeft}>
          <Icon style={{color: colors.white}} type={typeIconLeft} name={iconLeft} />
        </Button>
      </Left>
    ) : (
      <Left />
    )}

    <Body>
      <Title style={{color: colors.white, fontFamily: "Montserrat-Medium"}}>{title}</Title>
    </Body>

    {iconRight ? (
      <Right>
        <Button transparent onPress={handleIconRight}>
          <Icon
            style={{color: colors.white}}
            type={typeIconRight}
            name={iconRight}
          />
        </Button>
      </Right>
    ) : (
      <Right />
    )}
  </Header>
);

export default HeaderCustom;
