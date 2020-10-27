import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const constants = {
    // AsyncStorage keys
    ACCESS_TOKEN: 'token',
    FIRST_ACCESS_FLAG: 'firstAccessFlag',
    
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
}

export default constants;