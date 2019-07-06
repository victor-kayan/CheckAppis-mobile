import { StyleSheet } from "react-native";
import { colors } from "../../../assets";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  alertContainer: {
    height: 120,
    width: "100%",
    borderColor: colors.black,
    borderRadius: 5,
    backgroundColor: colors.white
  }
});

export default styles;
