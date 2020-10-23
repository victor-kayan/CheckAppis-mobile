import { colors } from "../../../../assets";
import { Row } from "native-base";
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

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },

  textDivider: {
    fontWeight: "400",
    fontSize: 12,
    marginLeft: 15
  },
  
  container: {
    backgroundColor: colors.white,
  },

  userProfile: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 30
  },

  userName: {
    fontSize: 20,
    fontWeight: "500",
  },

  heyText: {
    fontSize: 18
  },

  cardInformation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 8,
    marginBottom: 5
  },

  textInformation: {
    color: "gray",
  },

  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grey,
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 20,
  },

  userImage: {
    width: 50,
    height: 50
  },

  cardInformation: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: wp('85%'),
    height: hp('20%'),
    borderRadius: 15,
    marginTop: -70,
    elevation: 10,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.9,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    flexDirection: 'row',
  },

  name: {
    color: colors.theme_default,
    fontSize: wp('4.3%'),
    fontFamily: 'Montserrat-Bold',
  },

  email: {
    color: 'black',
    fontSize: wp('3.2%'),
    fontFamily: 'Montserrat Regular',
  },

  lineInformation: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },

  viewCompleteInformations: {
    width: wp('85%'),
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 50,
  },

  textInformationLine: {
    color: 'black',
    fontSize: wp('3.8%'),
    fontFamily: 'Montserrat Regular',
  }
};
