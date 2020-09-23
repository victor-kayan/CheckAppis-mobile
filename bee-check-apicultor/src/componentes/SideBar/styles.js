import { colors, constants } from "../../../assets";
import { Platform } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default {
    container: {
        backgroundColor: "#fff", 
        height: '100%'
    },
    drawerCover: {
        alignSelf: "stretch",
        height: constants.SCREEN_HEIGHT / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    text: {
        fontSize: wp('3.3%'),
        marginLeft: 20,
        fontFamily: 'Montserrat-Medium',
    },
    textDivider: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 12,
        marginLeft: 20
    },
    badgeText: {
        fontSize: Platform.OS === "ios" ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: Platform.OS === "android" ? -3 : undefined
    },
    logo: {
        height: '29%',
        width: '70%',
        alignSelf: 'center',
        position: 'absolute',
        opacity: 0.9,
    },
    icon: {
        height: 30, 
        width: 30
    },
    separator: {
        backgroundColor: 'white', 
        borderBottomColor: colors.blackgrey, 
        borderBottomWidth: 1,
        width: '93%', 
        alignSelf: 'flex-end', 
        height: 15, 
        marginBottom: 8
    }
};
