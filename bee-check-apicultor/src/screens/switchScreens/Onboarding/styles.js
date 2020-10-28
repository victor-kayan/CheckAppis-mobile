import { StyleSheet } from 'react-native';

import { constants, colors } from '../../../../assets';
const { SCREEN_WIDTH, SCREEN_HEIGHT } = constants;

const defaultPadding = 24;
const defaultRadius = 12;

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
    paddingRight: SCREEN_WIDTH * 0.05, // Distânciamento de 10% das
    paddingLeft: SCREEN_WIDTH * 0.05,  // margens laterais da tela
  },
  imageContainer: {

  },
  pageImage: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 0.9
  },
  textContainer: {
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
    bottom: SCREEN_HEIGHT > 700 ? '-5%' : '-3%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: defaultPadding / 2,
    marginBottom: defaultPadding * 3,
    height: defaultPadding,
  },
  dot: {
    borderRadius: defaultRadius,
    backgroundColor: colors.theme_second,
    marginHorizontal: defaultRadius / 2
  }
});

export default styles;