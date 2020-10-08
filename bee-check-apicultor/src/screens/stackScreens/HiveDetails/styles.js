import { colors } from "../../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  header: {
    marginBottom: 15
  },
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  content: {
    margin: 10
  },
  imageFormColmeia: {
    imageFormColmeia: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    },
  },
  buttonSelectFoto: {
    backgroundColor: colors.theme_second,
    marginTop: 20
  },
  iconButtonSelectFoto: {
    color: colors.colorIcons,
    marginLeft: 15
  },
  itemFotoColmeia: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonSalveEditcao: {
    alignSelf: "flex-end",
    marginEnd: 10,
    marginTop: 20
  },


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
    width: '100%',
    height: '100%',
    borderRadius: 25,
    resizeMode: 'cover',
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

  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 175,
    height: 175,
    borderRadius: 25,
    marginTop: 40,
    borderWidth: 3,
    borderColor: colors.theme_second,
    backgroundColor: colors.theme_second,
  },

  changePhoto: {
    borderRadius: 25,
    backgroundColor: colors.theme_second,
    padding: 3,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    top: -25,
    alignSelf: 'center',
  },

  viewInformations: {
    width: '100%', 
    paddingHorizontal: 20, 
    marginTop: 10,
    alignItems: 'center',
  },
};
