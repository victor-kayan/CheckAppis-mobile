import React from "react";
import { colors } from "../../../assets";
import { Icon, Text, Header, Thumbnail, Body, Right, Left } from "native-base";

const HeaderCard = ({
  title,
  note,
  icon,
  typeIcon,
  source,
  style,
  ...rest
}) => (
  <Header
    style={[{ backgroundColor: colors.theme_second }, style]}
    androidStatusBarColor={colors.colorAndroidBarraStatus}
  >
    <Left>
      {icon ? (
        <Icon
          style={{ color: colors.theme_primary }}
          name={icon}
          type={typeIcon}
        />
      ) : null}
      {source ? (
        <Thumbnail square source={source} style={{ height: 35, width: 35 }} />
      ) : null}
    </Left>
    <Body>
      <Text>{title}</Text>
      {note ? <Text note>{note}</Text> : null}
    </Body>
    <Right />
  </Header>
);

export default HeaderCard;
