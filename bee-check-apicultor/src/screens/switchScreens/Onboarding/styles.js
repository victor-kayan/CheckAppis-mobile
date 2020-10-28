import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { constants, colors } from '../../../../assets';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = constants;

const defaultPadding = SCREEN_WIDTH*0.05;
const defaultBottomPosition = SCREEN_HEIGHT*0.06;
const smallScreenBottomPosition = SCREEN_HEIGHT*0.04;
const defaultRadius = 12;
const nextButtonHeight = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },

  // Conteúdo
  pageContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: defaultPadding, // Distânciamento de 10% das
    paddingLeft: defaultPadding,  // margens laterais da tela
  },
  imageContainer: {

  },
  pageImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.35
  },
  textContainer: {
    marginTop: SCREEN_HEIGHT * 0.04,
    marginHorizontal: 8,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('5%'),
    marginBottom: 5,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
  },

  // Pontos de paginação
  dotsRootContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT > 700 ? defaultBottomPosition : smallScreenBottomPosition,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 17,
  },
  dot: {
    borderRadius: defaultRadius,
    backgroundColor: colors.theme_second,
    marginHorizontal: defaultRadius / 2
  },

  // Botão de pular/entrar
  nextButton: {
    position: 'absolute',
    right: 0,
    top: SCREEN_HEIGHT > 700 
      ? defaultBottomPosition - nextButtonHeight/4
      : smallScreenBottomPosition - nextButtonHeight/4,
    height: nextButtonHeight,
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  nextButtonText: {
    fontFamily: 'Montserrat Regular',
    fontSize: 15,
    color: colors.theme_second
  },
  getInButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT > 700 
      ? defaultBottomPosition - nextButtonHeight/6
      : smallScreenBottomPosition - nextButtonHeight/6,
    height: nextButtonHeight,
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: colors.theme_second
  },
  getInButtonText: {
    fontFamily: 'Montserrat Regular',
    fontSize: 15,
    color: colors.white
  }
});

export default styles;