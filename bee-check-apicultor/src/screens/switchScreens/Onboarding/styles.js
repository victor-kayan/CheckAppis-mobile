import { StyleSheet } from 'react-native';

import { constants, colors } from '../../../../assets';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = constants;

const defaultPadding = SCREEN_WIDTH*0.05;
const defaultBottomPosition = SCREEN_HEIGHT*0.06;
const smallScreenBottomPosition = SCREEN_HEIGHT*0.04;
const defaultRadius = 12;
const nextButtonHeight = 60;

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
    height: SCREEN_WIDTH * 0.9
  },
  textContainer: {
    marginTop: SCREEN_HEIGHT * 0.1
  },
  title: {
    textAlign: 'center'
  },
  description: {
    textAlign: 'center'
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
    bottom: SCREEN_HEIGHT > 700 
      ? defaultBottomPosition - nextButtonHeight/4
      : smallScreenBottomPosition - nextButtonHeight/4,
    height: nextButtonHeight,
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: colors.theme_second
  },
  nextButtonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: colors.white
  }
});

export default styles;