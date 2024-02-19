import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const ViewShopStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 58,
        elevation: 3,
        backgroundColor: '#39A7FF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerText: {
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 10,
        color: '#fff'
    },

    back: {
        width: 30,
        height: 25,
        tintColor: '#fff'
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

    shopContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    shoptitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: "600",
        color: "#333",
        textAlign: 'center',
        marginBottom: 7
    },

    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: responsiveHeight(1),
        elevation: 7
    },

    fontImage: {
        color: '#000',
        fontSize: 21,
        fontWeight: '500'
    },

    productlist: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: "600",
        marginVertical: responsiveHeight(0.6),
        color: "#333",
        textAlign: 'center',
    },

    imageList: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: "600",
        marginBottom: responsiveHeight(2),
        color: "#333",
        textAlign: 'center',
    },

    viewImage: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: responsiveHeight(1)
    },

    imges:{
        width: responsiveWidth(24), 
        height: responsiveHeight(13),
        marginHorizontal: responsiveWidth(1), 
    }
})

export default ViewShopStyle;