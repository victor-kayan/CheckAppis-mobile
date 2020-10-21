import colors from '../../../assets/colors';
import constants from '../../../assets/constants';

export default {
  container: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    elevation: 5,
    marginBottom: 8,
    width: constants.SCREEN_WIDTH / 2,
  },
  header: {
    backgroundColor: colors.theme_second,
    padding: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    color: '#FFF',
    fontFamily: 'Montserrat Regular',
    fontSize: 12
  },
  addressContainer: {
    padding: 8,
    justifyContent: 'center'
  },
  address: {
    fontFamily: 'Montserrat Regular',
  }
}