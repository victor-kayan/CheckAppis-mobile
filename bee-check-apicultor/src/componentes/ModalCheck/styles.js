import { colors } from "../../../assets";

export default {
    containerContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    container: {
        width: '85%',
        height: 300,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 25,
        justifyContent: 'center',
    },

    viewText: {
        width: '80%',
        marginBottom: 20,
    },

    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        textAlign: 'center',
    },

    text: {
        fontFamily: 'Montserrat Regular',
        fontSize: 15,
        textAlign: 'center',
        color: colors.blackgrey,
    },

    textButton: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: colors.white
    },

    okButton: {
        width: '90%',
        borderRadius: 30,
        height: 40,
        backgroundColor: colors.theme_second,
        alignItems: 'center',
        justifyContent: 'center',
    }
};
