import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ViewQueryStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 58,
        elevation: 3,
        backgroundColor: '#39A7FF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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

    queryContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    querytitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
        color: "#fff",
        textAlign: 'center',
        marginBottom: 7,
        backgroundColor: "#00aaf0", 
        paddingVertical:responsiveWidth(2), 
        width: responsiveWidth(83)
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
        marginHorizontal: responsiveWidth(29.5), 
    }
})

export default ViewQueryStyle;