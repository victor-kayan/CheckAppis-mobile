import { colors, constants } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  map: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100%',
  },
  viewInfo: {
    width: '100%',
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: hp('18.5%'),
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  mapContainer: {
    flex: 1,
    position: 'relative'
  },
  welcomeName: {
    color: 'white',
    fontSize: wp('5%'),
    fontFamily: 'Montserrat Regular',
  },
  welcomeDay: {
    color: 'white',
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Bold',
  },
  welcomeView: {
    marginHorizontal: 20,
    marginTop: hp('8.5%'),
    position: 'absolute'
  },
  cardInfo: {
    borderRadius: 10,
    marginHorizontal: 4,
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: 'center'
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1, 
    opacity: 0.1,
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  titleCard: {
    color: colors.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('3.6%'),
  },
  qtdCard: {
    color: colors.theme_second,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginLeft: 40,
  },
  cardIcon: {
    width: '50%',
    height: '100%',
  },
  viewText: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  safeArea: {
    marginTop: 200,
  }
};
