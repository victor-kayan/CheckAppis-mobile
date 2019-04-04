import { StyleSheet } from "react-native";
import colors  from "./colors";

const stylesTheme = StyleSheet.create({
  //colors
  color_theme_default: {
    color: colors.theme_default
  },
  color_theme_primary: {
    color: colors.theme_primary
  },
  color_theme_second: {
    color: colors.theme_second
  },
  color_theme_dark: {
    color: colors.black
  },
  color_theme_light: {
    color: colors.white
  },

  //  backgroundColor
  backgroundColor_theme_default: {
    backgroundColor: colors.theme_default
  },
  backgroundColor_theme_primary: {
    backgroundColor: colors.theme_primary
  },
  backgroundColor_theme_second: {
    backgroundColor: colors.theme_second
  },
  backgroundColor_theme_dark: {
    backgroundColor: colors.black
  },
  backgroundColor_theme_dark: {
    backgroundColor: colors.black
  },
  backgroundColor_theme_light: {
    backgroundColor: colors.white
  },

  //icones
  icon24: {
    fontSize: 24
  },
  icon27: {
    fontSize: 27
  },

  iconActionButton: {
    fontSize: 20,
    height: 22
  },

  //header cards
  headerCard: {
    backgroundColor: colors.theme_second,
    marginBottom: 15
  },
  headerCardIconThem_default: {
    color: colors.theme_default
  },
  headerCardTitledark: {
    color: colors.black
  },

  //spinner
  spinnerTextStyleTheme_default: {
    color: colors.theme_default
  },

  //button
  button: {
    borderRadius: 10
  },
  button_full: {
      width: '100%',
  },

});

export default stylesTheme ;
