import { colors } from "../../../../assets";

export default {
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    opacity: 0.1
  },
  content: {
    height: '45%',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    width: "100%",
  },
  contentImage: {
    height: '55%',
    backgroundColor: colors.theme_second,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: "100%",
  },
  welcome: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
    marginBottom: 5,
    marginLeft: 30,
    marginTop: 170,
    position: 'absolute',
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Montserrat Regular',
    color: colors.white,
    marginLeft: 30,
    marginTop: 210,
    position: 'absolute',
  },
  notText: {
    fontSize: 12,
    fontFamily: 'Montserrat Regular',
    color: colors.blackgrey,
    textAlign: 'center',
    marginTop: 270,
  },
  forgotText: {
    fontSize: 12,
    fontFamily: 'Montserrat Regular',
    color: colors.blackgrey,
    textAlign: 'center',
    marginTop: 40,
  },
  viewInput: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
  },
  iconInput: {
    marginRight: -25,
    color: colors.blackgrey,
    fontSize: 20,
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1,
    width: '100%', 
    opacity: 0.1,
  },
  iconInputi: {
    marginRight: -31,
    color: colors.blackgrey,
    fontSize: 19,
    marginLeft: -3,
  },
  loginView: {
    position: "absolute",
    height: 300,
    width: '88%',
    backgroundColor: 'white',
    marginTop: 330,
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 30,
    elevation: 10,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    alignSelf: 'center',
    paddingBottom: 70,
  },
  loginButton: {
    height: 50,
    width: 150,
    position: 'absolute',
    marginTop: 275,
    alignSelf: 'center',
  },
  accessText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: colors.theme_primary,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25
  },
  cardContainer: {
    flex: 1,
    marginTop: 90
  },
  logoName: {
    flexDirection: "row"
  },
  textLogoBee: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 35
  },
  textLogoCheck: {
    fontSize: 35,
    marginHorizontal: 8,
    color: colors.theme_primary,
    fontWeight: "bold"
  },
  icon: {
    color: colors.colorIcons
  },
  input: {
    color: colors.blackgrey,
    borderBottomWidth: 1,
    width: '85%',
    borderBottomColor: colors.blackgrey,
    fontFamily: 'Montserrat Regular',
    fontSize: 15,
    justifyContent: 'center',
    paddingLeft: 40,
    paddingBottom: 5,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: colors.theme_primary,
    marginTop: 30,
    marginHorizontal: 15,
    borderRadius: 10
  },
  textButton: {
    fontWeight: "900",
    fontSize: 20,
    color: colors.black
  },
  spinnerButton: {
    marginLeft: 8,
    alignSelf: 'center',
    marginBottom: 18,
  }
};
