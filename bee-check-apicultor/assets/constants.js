import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

const constants = {
    USER_LOGGED: 'user',
    ACCESS_TOKEN: 'token',
    USER_EMAIL: 'email',
    USER_PASSWORD: 'password',
    USER_NAME: 'name',
    USER_TELL: 'tell',
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
}

export default constants;