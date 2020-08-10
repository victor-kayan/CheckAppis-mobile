import React from "react";
import { colors } from "../../../assets";
import {Left, Icon, Button, Body, Title, Right } from "native-base";
import {View, Text, TouchableOpacity} from "react-native";

const HeaderCustom = ({
  iconRight,
  typeIconRight,
  handleIconRight,
  title,
  description,
  typeIconLeft,
  iconLeft,
  handleIconLeft,
  ...rest
}) => (
  <View
  {... rest}
    style={{ 
      backgroundColor: colors.theme_default, 
      height: '40%',
     }}
    androidStatusBarColor={colors.colorAndroidBarraStatus}
  >
    <View style = {{justifyContent: 'space-between', flexDirection: 'row', padding: 20, }}>
        <TouchableOpacity transparent onPress={handleIconLeft}>
          <Icon style={{color: colors.white}} type='SimpleLineIcons' name='menu' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIconRight}>
          <Icon
            style={{color: colors.white}}
            type={typeIconRight}
            name={iconRight}
          />
        </TouchableOpacity>
    </View>

      <Text style={{
        color: colors.white, 
        fontFamily: "Montserrat-Bold", 
        fontSize: 22, 
        marginTop: 20, 
        marginLeft: 20, 
        marginBottom: 5}}>{title}</Text>
      <View style = {{width: '70%'}}>
      <Text style={{
        color: colors.white, 
        fontFamily: "Montserrat Regular", 
        fontSize: 13, 
        marginLeft: 20, }}>{description}</Text>
      </View>
    
  </View>
);

export default HeaderCustom;
