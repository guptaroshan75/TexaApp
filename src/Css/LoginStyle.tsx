import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    mainContent: {
        fontSize: responsiveFontSize(9),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#39A7FF',
        letterSpacing: 10,
        marginTop: responsiveHeight(13)
    },

    login: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 27,
        marginTop: 10
    },

    inputView: {
        width: responsiveWidth(95),
        marginRight: 20,
        position: "relative",
    },

    inputText: {
        width: responsiveWidth(95),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.2),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 2,
    },

    psswordtextinput: {
        width: responsiveWidth(95),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.2),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 2,
    },

    loginBtn: {
        width: responsiveWidth(95),
        backgroundColor: "#39A7FF",
        marginHorizontal: responsiveHeight(1.2),
        borderRadius: responsiveHeight(1),
        height: responsiveHeight(7),
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveHeight(3.8),
        marginBottom: responsiveHeight(1.4)
    },

    loginText: {
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
        marginTop: 2,
        marginRight: responsiveWidth(2.5)
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
        width: '100%'
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

    sign: {
        fontSize: 14,
        fontWeight: '500',
        color: '#39A7FF',
    },

    mainsign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
})

export default LoginStyle;