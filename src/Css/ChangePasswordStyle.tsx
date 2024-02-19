import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ChangePasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: responsiveHeight(8),
        // paddingBottom: 20
    },

    mainContent: {
        fontSize: responsiveFontSize(9.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#39A7FF',
        letterSpacing: 10,
    },

    changepassword: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000',
        marginBottom: 20,
        marginTop: 10
    },

    inputView: {
        width: responsiveWidth(90),
        position: "relative",
        marginHorizontal: responsiveHeight(2.4),
    },

    inputText: {
        width: responsiveWidth(90),
        height: responsiveHeight(7.5),
        marginVertical: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 4,
    },

    psswordtextinput: {
        width: responsiveWidth(90),
        height: responsiveHeight(7.5),
        marginVertical: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.5),
        elevation: 4,
    },

    changepasswordbtn: {
        width: responsiveWidth(90),
        backgroundColor: "#39A7FF",
        borderRadius: responsiveHeight(1.5),
        height: responsiveHeight(7),
        alignItems: "center",
        marginHorizontal: responsiveHeight(2.4),
        justifyContent: "center",
        marginVertical: responsiveHeight(1.5),
    },

    changepasswordText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "bold",
    },

    icon: {
        position: "absolute",
        right: responsiveHeight(2),
        top: responsiveHeight(3.4)
    },
})

export default ChangePasswordStyle;