import { colors, constants } from "../../../../assets";

export default {
  viewInformations: {
    position: "absolute",
    alignSelf: 'center',
    marginTop: constants.SCREEN_HEIGHT/3.7,
    alignItems: 'center',
    width: '100%'
  },
  checkappis: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
  },
  version: {
    fontFamily: 'Montserrat Regular',
    color: colors.white,
  },
  copyright: {
    fontFamily: 'Montserrat Regular',
    color: colors.white,
  },
  logo: {
    width: '70%',
    height: 95,
    margin: 20,
  },
  buttonPolitics: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
