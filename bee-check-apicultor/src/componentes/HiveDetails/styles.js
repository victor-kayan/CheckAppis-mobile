import { colors, constants } from "../../../assets";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  hiveDetails: {
    width: '90%',
    margin: 18,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.theme_second,
    alignSelf: 'center',
    padding: 20,
    marginHorizontal: 35,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
  },

  viewImage: {
    height: 70,
    width: 70,
    borderRadius: 15,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },

  viewName: {
    justifyContent: 'center',
    width: '65%'
  },

  hiveName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },

  hiveDescription: {
    fontSize: 13,
    fontFamily: 'Montserrat Regular',
    color: colors.blackgrey
  },

  body: {
    borderLeftWidth: 2,
    borderLeftColor: colors.theme_second,
    marginVertical: 20,
    marginLeft: 35,
    padding: 10,
  },

  bodyIn: {
    width: '100%',
    paddingLeft: 8,
    marginBottom: 10,
  },

  bodyObs: {
    width: '90%',
    paddingLeft: 8,
  },

  line: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'space-between',
    marginVertical: 2,
  },

  textTitle: {
    fontFamily: 'Montserrat Regular',
    fontSize: 13,
    textAlign: 'left'
  },

  textData: {
    fontFamily: 'Montserrat Regular',
    fontSize: 13,
    textAlign: 'right'
  },
  textDataObs: {
    fontFamily: 'Montserrat Regular',
    fontSize: 13,
  },

  textObs: {
    fontFamily: 'Montserrat-Bold'
  },

  size: {
    width: '80%',
  },

  sizeData: {
    width: '20%',
  },
};
