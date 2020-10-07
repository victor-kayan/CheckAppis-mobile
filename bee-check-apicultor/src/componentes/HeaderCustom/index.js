import React from "react";
import { colors, images } from "../../../assets";
import {Left, Icon, Button, Body, Title, Right } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
      height: '35%',
     }}
    androidStatusBarColor={colors.colorAndroidBarraStatus}
  >
    <LinearGradient
      colors={[colors.theme_default, colors.theme_second]}
      style={{ height: '100%'}}
    >
    <ImageBackground source={images.headers.hive} style = {{resizeMode: 'cover', flex: 1, opacity: 0.1}}/>
    <View style = {{justifyContent: 'space-between', flexDirection: 'row', padding: 20, position: 'absolute', width: '100%'}}>
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
     <View style = {{width: '70%', position: 'absolute', marginTop: 55}}>
      <Text style={{
        color: colors.white, 
        fontFamily: "Montserrat-Bold", 
        fontSize: 22, 
        marginTop: 10, 
        marginLeft: 20, 
        marginBottom: 5}}>{title}</Text>
      <Text style={{
        color: colors.white, 
        fontFamily: "Montserrat Regular", 
        fontSize: 13, 
        marginLeft: 20, }}>{description}</Text>
      </View>
      </LinearGradient>
  </View>
);

export default HeaderCustom;
