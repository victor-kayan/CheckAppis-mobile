import { colors, constants } from "../../../../assets";

export default {
    cardItem : {
        justifyContent: "space-between"
    },
    text : { 
        marginHorizontal: "5%", fontSize: 12
    },
    badge_text: {
        fontSize: 15,
    },
    badge_success: {  
        backgroundColor: colors.success
    },
    badge_error: {
        backgroundColor: colors.erorr
    },
    itemContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -35,
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35, 
        width: '100%',
    },
    contentHiveDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    title: {
        color: colors.theme_default,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginVertical: 20,
        marginHorizontal: 20,
    }

}