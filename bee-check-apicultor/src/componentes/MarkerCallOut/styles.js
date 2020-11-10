import colors from '../../../assets/colors';
import constants from '../../../assets/constants';

export default {
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 5,
    marginBottom: 8,
    width: constants.SCREEN_WIDTH / 2,
  },
  header: {
    backgroundColor: colors.theme_second,
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  description: {
    color: '#FFF',
    fontFamily: 'Montserrat Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  addressContainer: {
    padding: 8,
    justifyContent: 'center'
  },
  address: {
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
  }
}