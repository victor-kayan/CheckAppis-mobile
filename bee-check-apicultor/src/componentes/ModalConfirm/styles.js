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
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 25,
        justifyContent: 'center',
        padding: 30,
    },

    viewButtons: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },

    viewText: {
        width: '100%',
    },

    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
    },

    text: {
        fontFamily: 'Montserrat Regular',
        fontSize: 15,
        color: colors.blackgrey,
    },

    textButton: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: colors.white
    },

    textButtonCancel: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: colors.theme_second
    },

    okButton: {
        width: '47%',
        borderRadius: 30,
        height: 40,
        backgroundColor: colors.theme_second,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButton: {
        width: '47%',
        borderRadius: 30,
        height: 40,
        borderWidth: 2,
        borderColor: colors.theme_second,
        alignItems: 'center',
        justifyContent: 'center',
    },

    gif: {
        height: 200,
        width: 200,
        marginBottom: 20,
    }
};
