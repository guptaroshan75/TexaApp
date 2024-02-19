import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const ManageDosageStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 125,
        elevation: 3,
        backgroundColor: '#39A7FF',
        display: 'flex',
        paddingTop: 10,
    },

    head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    profileLogo: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 15
    },

    toggle: {
        width: 30,
        height: 35,
        tintColor: '#fff'
    },

    headerText: {
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 10,
        color: '#fff'
    },

    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingLeft: responsiveHeight(2),
        paddingRight: responsiveHeight(2),
    },

    inputText: {
        width: responsiveWidth(95),
        height: responsiveHeight(6.5),
        marginVertical: responsiveHeight(2),
        marginHorizontal: responsiveHeight(1.2),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.3),
        padding: responsiveHeight(1.5),
        elevation: 2,
    },

    addShop: {
        marginHorizontal: responsiveHeight(1.9),
        width: responsiveWidth(92),
        backgroundColor: "#1189ad",
        borderRadius: responsiveHeight(1),
        height: responsiveHeight(6.4),
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(1.4),
        display: 'flex',
        flexDirection: 'row',
    },

    addText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "400",
        marginStart: 6
    },

    border: {
        width: '100%',
        borderBottomWidth: 2,
        marginBottom: 15,
        borderBottomColor: '#aaa'
    },

    statusButton: {
        width: responsiveWidth(5),
        height: responsiveHeight(2.7),
        borderRadius: responsiveHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: responsiveHeight(0.5),
        backgroundColor: 'green'
    },

    statusText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'green'
    },

    dosagetitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: "600",
        color: "#333",
        textAlign: 'center',
        marginBottom: 7
    },

    buttonStatus: {
        width: 22,
        height: 22,
        marginRight: 10,
        tintColor: 'green'
    },

    dosageData: {
        textAlign: 'center', 
        marginTop: 3
    },

})

export default ManageDosageStyle;