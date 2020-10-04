import { colors, constants } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default {
  viewInformations: {
    position: "absolute",
    alignSelf: 'center',
    marginTop: constants.SCREEN_HEIGHT/4.2,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  checkappis: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
  },
  version: {
    fontFamily: 'Montserrat Regular',
    color: colors.white,
    fontSize: wp('4%')
  },
  copyright: {
    fontFamily: 'Montserrat Regular',
    color: colors.white,
    fontSize: wp('4%'),
  },
  ifrn: {
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
    fontSize: wp('3.5%'),
    marginBottom: 30,
  },
  logo: {
    width: wp('61.3%'),
    height: hp('10.5%'),
    margin: 20,
  },
  buttonPolitics: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.white,
    alignSelf: 'center',
  },
  textButton: {
    color: colors.white,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginRight: 20,
  },
};
