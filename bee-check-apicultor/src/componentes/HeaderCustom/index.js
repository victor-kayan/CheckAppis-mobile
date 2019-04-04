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
          <Icon style={{color: colors.black}} type={typeIconLeft} name={iconLeft} />
        </Button>
      </Left>
    ) : (
      <Left />
    )}

    <Body>
      <Title style={{color: colors.black}}>{title}</Title>
    </Body>

    {iconRight ? (
      <Right>
        <Button transparent onPress={handleIconRight}>
          <Icon
            style={{color: colors.black}}
            type={typeIconRight}
            name={iconRight}
          />
        </Button>
      </Right>
    ) : (
      <Left />
    )}
  </Header>
);

export default HeaderCustom;
