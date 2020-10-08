import { colors } from "../../../../assets";

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
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
    marginTop: 30,
    marginHorizontal: 20,
  },
  contentArrow: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentIcon: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  apiary: {
    fontSize: 60,
    color: colors.theme_second,
  },
  arrow: {
    fontSize: 30,
    color: colors.theme_second,
  },
  option: {
    width: '90%',
    height: 100,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.theme_second,
  },
  name: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 13,
    fontFamily: 'Montserrat Regular',
  },
  contentText: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
  },
  apiaryIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    resizeMode: 'cover',  
  },
};
