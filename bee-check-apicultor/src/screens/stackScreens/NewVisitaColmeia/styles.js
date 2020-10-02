import { colors } from "../../../../assets";

export default {
  header: {
    marginBottom: 15
  },
  iconImagemSelectPicker: {
    width: 27,
    height: 27
  },
  pikerLisitColmeia: {
    height: 40,
    width: "90%"
  },
  textSubTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 30,
    MarginTop: 10,
    marginBottom: 20,
    color: colors.theme_second,
  },
  buttonSalveVisita: {
    marginTop: 20
  },
  buttonFinishVisita: {
    backgroundColor: "#2b580c",
    color: "white"
  },
  viewHives: {
    borderRadius: 35,
  },
  containerContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -85,
    alignItems: 'center', 
    width: '100%',
  },

  selectButton: {
    height: 50,
    width: '75%',
    margin: 30,
    marginTop: -25,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
  },

  iconButton: {
    fontSize: 25,
    color: colors.theme_second,
    marginLeft: 15,
  },

  viewTextIcon: {
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignSelf: 'center',
  },

  textWarn: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'center',
    margin: 30,
    color: colors.blackgrey,
  },

  viewWarn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },

  question: {
    fontFamily: 'Montserrat-Medium',
    marginRight: 15,
    fontSize: 14,
  },
  
  number: {
    fontFamily: 'Montserrat Regular',
    marginRight: 15,
  }
};
