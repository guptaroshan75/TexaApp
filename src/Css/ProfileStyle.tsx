import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const ProfileStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 58,
        elevation: 3,
        backgroundColor: '#39A7FF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    back: {
        width: 30,
        height: 25,
        tintColor: '#fff'
    },

    headerText: {
        fontSize: 20,
        fontWeight: '400',
        marginLeft: 10,
        color: '#fff'
    },

    profile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },

    editProfile: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 3
    },

    main: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
    },

    profileLogo: {
        width: 110,
        height: 110,
        borderRadius: 100,
    },

    ImageContainer: {
        marginVertical: responsiveHeight(1.3),
        marginHorizontal: responsiveHeight(2),
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.9),
        paddingLeft: responsiveHeight(1.7),
        borderWidth: 1,
        borderColor: "#797979",
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    addimagecontainer: {
        fontSize: 16,
        color: "#797979",
        padding: responsiveHeight(0.2)
    },

    inputView: {
        width: responsiveWidth(95),
        marginRight: 20,
        position: "relative",
    },

    inputText: {
        width: responsiveWidth(93),
        height: responsiveHeight(7.5),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(2),
        elevation: 4,
    },

    addProfile: {
        marginHorizontal: responsiveHeight(1.9),
        width: responsiveWidth(92),
        backgroundColor: "#39A7FF",
        borderRadius: responsiveHeight(1),
        height: responsiveHeight(6.4),
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveHeight(2.7),
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

    shopData: {
        textAlign: 'center',
        marginTop: 3
    },

    flagimg: {
        width: responsiveWidth(10), 
        height: responsiveHeight(3), 
        marginRight: responsiveHeight(1.5),
    },

    dropdownText: {
        flex: 1,
        fontSize: responsiveFontSize(2),
        marginLeft: 12
    },

    dropdownIcon: {
        marginLeft: responsiveWidth(2),
    },

    countrydropdown: {
        width: responsiveWidth(93),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(2.2),
        elevation: responsiveHeight(0.2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    inputTextNum: {
        width: responsiveWidth(93),
        height: responsiveHeight(8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.5),
        backgroundColor: 'white',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(9.5),
        elevation: 2,
    },

    search: {
        paddingHorizontal: responsiveHeight(1.9),
        borderWidth: 1,
        borderColor: '#b5b1b1',
        width: responsiveWidth(92),
        borderRadius: responsiveHeight(0.7),
        height: responsiveHeight(7),
        marginTop: responsiveHeight(1.3),
        marginBottom: responsiveHeight(1.4),
        marginHorizontal: responsiveHeight(1.9),
    },

    couontry_code_text: {
        height: responsiveHeight(7.5),
        width: responsiveWidth(92),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.9),
        backgroundColor: '#fff',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(9.5),
        elevation: 3,
    },

    country_code: {
        height: responsiveHeight(7.5),
        position: "absolute",
        left: 11.5,
        fontWeight: "500",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: responsiveHeight(1.5),
        borderTopLeftRadius: responsiveHeight(1.5),
        borderBottomLeftRadius: responsiveHeight(1.5),
        backgroundColor: 'white',
        padding: responsiveHeight(1.5),
        borderRightWidth: 1,
        borderRightColor: "#ddd",
    },

    phonenumber: {
        color: "#202020",
        fontSize: 17,
    },
})

export default ProfileStyle;