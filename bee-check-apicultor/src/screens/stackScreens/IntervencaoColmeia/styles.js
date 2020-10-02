import { colors, constants } from "../../../../assets";

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
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -35,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    width: '100%',
  },
  title: {
    color: colors.theme_second,
    fontSize: 14,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 25,
    marginHorizontal: 30,
    marginBottom: 25,
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    backgroundColor: colors.grey,
    width: '100%',
    height: '100%'
  },
  image: {
    marginTop: 50,
    width: 300,
    height: 280,
  },
  textNull: {
    color: colors.blackgrey,
    fontSize: 15,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
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
};
