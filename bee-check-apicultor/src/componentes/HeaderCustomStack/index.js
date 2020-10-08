import React from "react";
import { colors, images } from "../../../assets";
import {Left, Icon, Button, Body, Title, Right } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const HeaderCustomStack = ({
  iconRight,
  iconRight2,
  typeIconRight,
  typeIconRight2,
  handleIconRight,
  handleIconRight2,
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
    <View style = {{justifyContent: 'flex-end', flexDirection: 'row', padding: 20, position: 'absolute', width: '100%'}}>
        <TouchableOpacity onPress={handleIconRight}>
          <Icon
            style={{color: colors.white}}
            type={typeIconRight}
            name={iconRight}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIconRight2}>
          <Icon
            style={{color: colors.white, marginLeft: 10}}
            type={typeIconRight}
            name={iconRight2}
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

export default HeaderCustomStack;
