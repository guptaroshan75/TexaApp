import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ForgotPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        marginTop: -70
    },

    mainContent: {
        fontSize: responsiveFontSize(9.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#39A7FF',
        letterSpacing: 10,
    },

    forgot: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 27,
        marginTop: 10
    },

    inputView: {
        width: responsiveWidth(100),
        position: "relative",
    },

    inputText: {
        width: responsiveWidth(90),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(2.3),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 3,
    },

    icon: {
        position: "absolute",
        right: responsiveHeight(5),
        top: responsiveHeight(3.8)
    },

    loginBtn: {
        backgroundColor: "#00aaf0",
        borderRadius: responsiveHeight(1.5),
        paddingVertical: 15,
        alignItems: "center",
        marginTop: responsiveHeight(1.4),
        marginBottom: responsiveHeight(1.4),
        width: responsiveWidth(90),
        marginHorizontal: responsiveHeight(2.3),
        elevation: 3,
    },

    loginText: {
        color: "#FFF",
        fontSize: responsiveFontSize(2.3),
    },

    title2: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: "400",
        marginBottom: responsiveHeight(4),
    },

    resettext: {
        fontSize: (responsiveFontSize(1.5))
    },
})

export default ForgotPasswordStyle;