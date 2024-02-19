import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const SignStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    mainContent: {
        fontSize: responsiveFontSize(9.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#39A7FF',
        letterSpacing: 10,
        marginTop: responsiveHeight(0.6)
    },

    signup: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 20,
        marginTop: 8
    },

    inputView: {
        width: responsiveWidth(95),
        position: "relative",
    },

    inputText: {
        width: responsiveWidth(93),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 2,
    },

    psswordtextinput: {
        width: responsiveWidth(93),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 2,
    },

    signupBtn: {
        width: responsiveWidth(93),
        backgroundColor: "#39A7FF",
        borderRadius: responsiveHeight(1),
        height: responsiveHeight(7),
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveHeight(3.1),
        marginBottom: responsiveHeight(1.4),
        marginHorizontal: responsiveWidth(3.2)
    },

    signupText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "bold",
    },

    mainor: {
        position: 'relative',
        marginTop: 25,
        marginBottom: 25,
        marginHorizontal: responsiveHeight(5.7),
    },

    ortext: {
        marginTop: responsiveHeight(2.1),
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveHeight(2.5),
        position: 'absolute',
        bottom: -28,
        left: 120,
        backgroundColor: '#fff'
    },

    ortextborder: {
        borderColor: '#ebeae8',
        borderTopWidth: 1,
        width: 270,
    },

    forget: {
        color: '#39A7FF',
        marginTop: 2.8,
    },

    icon: {
        position: "absolute",
        right: responsiveHeight(1),
        top: responsiveHeight(3.7)
    },

    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: responsiveHeight(1.5),
        width: '100%',
        marginHorizontal: responsiveWidth(2.6)
    },

    textinputlabel: {
        marginLeft: responsiveHeight(2.2),
        fontSize: responsiveFontSize(2),
        color: "#1A1A18"
    },

    member: {
        fontSize: 14,
        fontWeight: '500',
    },

    inputViewTele: {
        width: responsiveWidth(97),
        position: "relative",
    },

    flagImg: {
        width: 33,
        height: 26,
        position: "absolute",
        left: responsiveHeight(3.8),
        top: responsiveHeight(3.9),
        zIndex: 999,
    },

    inputTextFlg: {
        width: responsiveWidth(93),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(9.5),
        paddingVertical: responsiveHeight(2.5),
        elevation: 2,
    },

    iconCountry: {
        position: "absolute",
        right: responsiveHeight(1),
        top: responsiveHeight(3.7),
        color: '#000',
    },

    sign: {
        fontSize: 14,
        fontWeight: '500',
        color: '#39A7FF'
    },

    mainsign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: responsiveHeight(1.7),
    },

    checkboxContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default SignStyle;