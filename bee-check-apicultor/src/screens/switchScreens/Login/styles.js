import { colors } from "../../../../assets";

export default {
  backgroundImage: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    resizeMode: "cover"
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
    color: colors.white, 
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
    marginLeft: 8
  }
};
