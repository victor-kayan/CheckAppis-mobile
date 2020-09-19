import { colors, constants } from "../../../../assets";

export default {
  map: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100%'
  },
  mapContainer: {
    flex: 1,
    position: 'relative'
  },
  welcomeName: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat Regular',
  },
  welcomeDay: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'Montserrat-Bold',
  },
  welcomeView: {
    marginHorizontal: 20,
    marginTop: 70,
    position: 'absolute'
  },
  cardInfo: {
    width: "30%",
    height: 170,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scrollCard: {
    marginTop: 160,
    marginBottom: 10,
    position: 'absolute',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    resizeMode: 'cover',
    flex: 1, 
    opacity: 0.1,
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  titleCard: {
    color: colors.theme_second,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginLeft: 40,
  },
  qtdCard: {
    color: colors.theme_second,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginLeft: 40,
  },
  cardIcon: {
    width: '50%',
    height: '100%',
  },
  viewText: {
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  safeArea: {
    marginTop: 200,
  }
};
