import { colors } from "../../../assets";

export default {
    intervention: {
        width: '100%',
        height: 90,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 5,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.theme_second,
    },

    viewTexts: {
        width: '50%',
    },
    
    textContent: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 25,
    },

    apiaryName: {
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        color: colors.theme_second,
    },

    date: {
        fontSize: 12,
        fontFamily: 'Montserrat Regular',
        color: colors.black,
    },

    button: {
        width: '67%',
        height: '40%',
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: colors.theme_second,    
    },

    textButton: {
        fontSize: 13,
        fontFamily: 'Montserrat-Bold',
        color: colors.theme_second,
    },

    statusIcon: {
        fontSize: 25,
        color: colors.theme_second,
        marginLeft: '12%',
    },

    statusIconWhite: {
        fontSize: 25,
        color: colors.white,
        marginLeft: '12%',
    },
};
