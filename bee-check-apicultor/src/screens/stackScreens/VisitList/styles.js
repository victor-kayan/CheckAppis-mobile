import { colors, constants } from "../../../../assets";

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
  containerContentVisits: {
    position: "absolute",
    height: '80%',
    backgroundColor: 'white',
    marginTop: constants.SCREEN_HEIGHT/3.6,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
  },
  title: {
    color: colors.black,
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  contentVisit: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    backgroundColor: colors.grey,
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
visit: {
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
visitName: {
  fontSize: 13,
  fontFamily: 'Montserrat-Bold',
},
visitDescription: {
  fontSize: 13,
  fontFamily: 'Montserrat Regular',
},
addVisitButton: {
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
  marginTop: constants.SCREEN_HEIGHT/1.17,
  marginLeft: constants.SCREEN_WIDTH/1.3,
},
plus: {
  color: colors.white,
  textAlign: 'center',
  alignSelf: 'center',
  marginTop: 13,
}
};
