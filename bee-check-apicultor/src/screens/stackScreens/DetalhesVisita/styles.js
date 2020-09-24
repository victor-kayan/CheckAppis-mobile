import { colors, constants } from "../../../../assets";

export default {
  cardItem: {
    justifyContent: "space-between"
  },
  label: {
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 3
  },
  labelColmeias: {
    marginHorizontal: 10,
    fontSize: 13
  },
  labelQuadros: {
    marginHorizontal: 10,
    fontSize: 13,
    marginTop: 3
  },
  badge_text: {
    fontSize: 14
  },
  badge_success: {
    backgroundColor: colors.success
  },
  badge_error: {
    backgroundColor: colors.erorr
  },
  viewContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -35,
    alignItems: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35, 
    width: '100%',
  },
  scroll: {
    padding: 10,
    width: '100%',
    marginTop: 30,
  },
  cardInformation: {
    width: '85%',
    height: 210,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    marginVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.theme_second,
    alignSelf: 'center',
  },
  cardInformationMore: {
    width: '85%',
    height: 210,
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 10,
    marginVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.theme_second,
    alignSelf: 'center',
  },
  apiaryName: {
    color: colors.theme_default,
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    margin: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  lineCardInformation: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    marginVertical: 7,
  },
  lineHeader: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  lineBody: {
    width: '40%',
  },
  textLineHeader: {
    fontFamily: 'Montserrat-Bold',
    marginLeft: 12,
  },
  textBodyLine: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  icons: {
    color: colors.theme_second,
    marginLeft: 8,
  },
  titleInformation: {
    fontFamily: 'Montserrat-Bold',
  },
  descriptionInformation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.blackgrey
  },
  titles: {
    marginLeft: 12,
  },
  headerInformation: {
    width: '90%',
    flexDirection: 'row',
  },
  dataInformations: {
    borderLeftWidth: 2,
    borderLeftColor: colors.theme_second,
    width: '83%',
    marginTop: 15,
    marginHorizontal: 20,
    padding: 8,
  },
  lineDataInformations: {
    flexDirection: 'row',
    marginLeft: 12,
    marginVertical: 3,
    width: '100%',
    alignContent: 'space-between',
  },
  textLineDataInformations: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.black,
    alignSelf: 'flex-start'
  },
  infoLineDataInformations: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: colors.black,
    alignSelf: 'flex-end',
  },
  size: {
    width: '80%',
  },
  sizeData: {
    width: '20%'
  },
  detailsButton: {
    height: 50,
    width: '85%',
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  contentDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  },
};
