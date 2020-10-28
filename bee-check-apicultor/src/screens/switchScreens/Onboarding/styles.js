import { StyleSheet } from 'react-native';

import { constants, colors } from '../../../../assets';
const { SCREEN_WIDTH } = constants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },

  pageContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: SCREEN_WIDTH * 0.05,
    paddingLeft: SCREEN_WIDTH * 0.05,
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
  }

  
});

export default styles;