import { colors, constants } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  iconImagemSelectPicker: {
    width: 30,
    height: 30
  },
  header: {
    marginBottom: 15
  },
  pikerLisitApiario: {
    height: 40,
    width: "90%"
  },
  button: {
    width: '80%',
    height: 60,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.theme_second,
    alignSelf: 'center',
  },
  textButton: {
    color: colors.theme_second,
    fontSize: 14,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -35,
    alignItems: 'center',
    width: '100%',
  },
  containerContent: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  informations: {
    fontSize: 19,
    fontFamily: 'Montserrat-Bold',
  },
  hiveName: {
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
  },
  viewInformations: {
    width: '80%',
    height: 70,
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.theme_second,
    marginBottom: 20,
    marginTop: 25,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  cardInformation: {
    width: '80%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: hp('6%')
  },
  icons: {
    fontSize: 30,
    color: colors.theme_second,
    marginRight: 20,
  },
  iconsCheck: {
    fontSize: 30,
    color: colors.theme_second,
  },
  title: {
    color: colors.theme_second,
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
  },
  description: {
    color: colors.black,
    fontSize: 13,
    fontFamily: 'Montserrat Regular',
  },
  viewPrescription: {
    width: '70%',
  },
};
