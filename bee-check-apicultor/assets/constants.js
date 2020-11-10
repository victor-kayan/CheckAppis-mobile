import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const constants = {
    // AsyncStorage keys
    ACCESS_TOKEN: 'token',
    HAS_ACCESSED_BEFORE: 'hasAccessedBefore',
    
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
}

export default constants;