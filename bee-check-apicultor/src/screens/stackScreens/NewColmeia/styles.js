import {colors, constants} from '../../../../assets';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default {
  content: {
    margin: 10
  },

  header: {
    marginBottom: 15
  },

  iconImagemSelectPicker: {
    width: 27,
    height: 27
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },

  containerContent: {
    height: hp('85%'),
    backgroundColor: colors.white,
    marginTop: -45,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    width: '100%',
  },

  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },

  imageFormColmeia: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  addPhoto: {
    borderRadius: 25,
    backgroundColor: colors.theme_second,
    padding: 3,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    marginTop: -25,
    marginLeft: wp('73%')
  },

  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    width: '100%',
    height: 150,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
  },

  viewInputs: {
    width: '100%', 
    paddingHorizontal: hp('3.8%'), 
    marginTop: 40,
  },
};
