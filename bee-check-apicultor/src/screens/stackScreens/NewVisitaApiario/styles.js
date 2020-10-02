import { colors } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  header: {
    marginBottom: 15
  },

  iconImagemSelectPicker: {
    width: 30,
    height: 30
  },

  pikerLisitApiario: {
    height: 40,
    width: "90%"
  },

  textSubTitle: {
    color: colors.theme_default,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  buttonSalveVisita: {
    marginTop: 20
  },

  containerContentForm: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -35,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    width: '100%',
  },

  textForm: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },

  visitButton: {
    height: 50,
    margin: 30,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
};
