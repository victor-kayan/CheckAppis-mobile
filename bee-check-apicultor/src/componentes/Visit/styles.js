import { colors } from "../../../assets";

export default {
visit: {
  width: '90%',
  height: 90,
  backgroundColor: colors.white,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
  marginHorizontal: 20,
  borderRadius: 15,
  borderWidth: 2,
  borderColor: colors.theme_second,
  alignSelf: 'center',
},
contentText: {
  width: '70%',
  height: '100%',
  justifyContent: 'center',
  paddingLeft: 25,
},
contentArrow: {
  width: '30%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  alignContent: 'space-between',
},
arrow: {
  fontSize: 30,
  color: colors.theme_second,
},
statusIcon: {
  fontSize: 25,
  color: colors.theme_second,
  marginRight: 25,
},
statusIconFailed: {
  fontSize: 25,
  color: colors.red,
  marginRight: 25,
},
apiaryName: {
  fontSize: 13,
  fontFamily: 'Montserrat-Bold',
  color: colors.theme_second
},
apiaryDescription: {
  fontSize: 13,
  fontFamily: 'Montserrat Regular',
},
touchStyle: {
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
}
};
