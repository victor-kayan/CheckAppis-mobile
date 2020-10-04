import { colors, constants } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  iconImagemSelectPicker: {
    width: 30,
    height: 30
  },
  imageColmeia: {
    borderRadius: 5
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
    color: colors.white
  },
  swiperBackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerContentHives: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -35,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    width: '100%',
  },
  title: {
    color: colors.theme_default,
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 30,
  },
  contentHive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    backgroundColor: colors.grey,
    width: '100%',
    height: '100%'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    transform: [{ rotate: '180deg' }],
    alignSelf: 'center',
    marginBottom: 10,
  },
  arrowUp: {
    borderTopWidth: 0,
    borderRightWidth: 30,
    borderBottomWidth: 30,
    borderLeftWidth: 30,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "white",
    borderLeftColor: 'transparent',
  },
  arrowRight: {
    borderTopWidth: 30,
    borderRightWidth: 0,
    borderBottomWidth: 30,
    borderLeftWidth: "white",
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: "white",
  },
  arrowDown: {
    borderTopWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 0,
    borderLeftWidth: 30,
    borderTopColor: "white",
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowLeft: {
    borderTopWidth: 30,
    borderRightWidth: "white",
    borderBottomWidth: 30,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: "white",
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowUpLeft: {
    borderTopWidth: 30,
    borderRightWidth: "white",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: "white",
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowUpRight: {
    borderTopWidth: 0,
    borderRightWidth: "white",
    borderBottomWidth: 30,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: "white",
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  arrowDownLeft: {
    borderTopWidth: 30,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: "white",
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: "white",
  },
  arrowDownRight: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 30,
    borderLeftWidth: "white",
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "white",
    borderLeftColor: 'transparent',
  },
  hive: {
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
  },
  imageApiary: {
    width: '30%',
    height: '100%',
  },
  contentText: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  contentArrow: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 30,
    color: colors.blackgrey,
  },
  hiveName: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },
  hiveDescription: {
    fontSize: 13,
    fontFamily: 'Montserrat Regular',
  },
  addHiveButton: {
    height: 60,
    width: 60,
    position: 'absolute',
    margin: 30,
    borderRadius: 30,
    elevation: 10,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    bottom: 10,
    right: 10,
  },
  plus: {
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 14,
  },
  textNull: {
    color: colors.blackgrey,
    fontSize: wp('3.8%'),
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  image: {
    marginTop: 20,
    width: wp('61.8%'),
    height: hp('30%'),
    alignSelf: 'center',
  },
};
