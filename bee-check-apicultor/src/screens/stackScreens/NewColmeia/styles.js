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
    paddingHorizontal: 30,
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
    width: 170,
    height: 170,
    margin: 20,
    borderRadius: 170
  },
  addPhoto: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.theme_second,
    padding: 3,
    paddingHorizontal: 4,
    marginBottom: 55,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: 190,
    height: 190,
    marginTop: -90,
    borderRadius: 190,
    elevation: 10,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.9,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
  },
};
