import {colors} from '../../../../assets';

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
    height: 200,
    width: "94%",
    margin: 20,
    borderRadius: 25
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: '88%',
    height: 220,
    marginTop: 190,
    borderRadius: 25,
    elevation: 10,
    shadowColor: colors.theme_primary,
    shadowOpacity: 0.9,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
  },
};
