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
    position: "absolute",
    height: '80%',
    backgroundColor: colors.white,
    marginTop: constants.SCREEN_HEIGHT/3.6,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    width: '100%',
  },
  title: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Montserrat Regular',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  containerContent: {
    position: "absolute",
    height: '80%',
    backgroundColor: colors.grey,
    marginTop: 100,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    width: '100%',
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
};
