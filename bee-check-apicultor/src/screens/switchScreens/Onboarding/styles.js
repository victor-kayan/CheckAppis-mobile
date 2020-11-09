import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { constants, colors } from '../../../../assets';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = constants;

const defaultPadding = SCREEN_WIDTH*0.05;
const defaultBottomPosition = SCREEN_HEIGHT*0.06;
const smallScreenBottomPosition = SCREEN_HEIGHT*0.04;
const defaultRadius = 12;
const getInButtonHeight = 50;

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
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.3,
    marginTop: SCREEN_HEIGHT * 0.04 * -1
  },
  textContainer: {
    marginHorizontal: 8,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('5%'),
    marginTop: SCREEN_HEIGHT * 0.04,
    marginBottom: SCREEN_HEIGHT * 0.04,
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

  // Botão de pular
  nextButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: defaultPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Montserrat Regular',
    fontSize: 15,
    color: colors.theme_second
  },

  // Botão de entrar
  getInButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT > 700 
      ? ((SCREEN_HEIGHT * 0.3 + wp('10%')) - defaultBottomPosition) / 2
      : ((SCREEN_HEIGHT * 0.3 + wp('10%')) - smallScreenBottomPosition) / 2,
    height: getInButtonHeight,
    paddingLeft: defaultPadding * 2,
    paddingRight: defaultPadding * 2,
    borderRadius: getInButtonHeight / 2,
    backgroundColor: colors.theme_second,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  getInButtonText: {
    fontFamily: 'Montserrat Regular',
    fontSize: 16,
    color: colors.white
  }
});

export default styles;