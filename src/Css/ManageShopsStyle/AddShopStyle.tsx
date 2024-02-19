import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveScreenWidth } from "react-native-responsive-dimensions";

const AddShopStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 58,
        elevation: 3,
        backgroundColor: '#39A7FF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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

    container: {
        flex: 1,
        backgroundColor: "#00aaf0",
    },

    maincontainer: {
        flex: 1,
        backgroundColor: "white",
    },

    main: {
        marginTop: responsiveHeight(1.4),
        marginBottom: responsiveHeight(2.2),
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
    },

    addtext: {
        paddingVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveWidth(3.5),
        backgroundColor: '#00aaf0',
        borderRadius: responsiveHeight(1.5),
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    addshoptext: {
        color: 'white',
        padding: 2,
        fontSize: responsiveFontSize(2.4),
    },

    addimagecontainer: {
        marginVertical: responsiveHeight(2.2),
        textAlign: "center",
        color: '#000',
        fontSize: 21,
    },

    nametitle: {
        marginLeft: responsiveHeight(1.5),
        marginBottom: responsiveHeight(1.5),
        fontSize: responsiveFontSize(2.2),
        color: "#1A1A18",
    },

    inputViewTele: {
        marginTop: responsiveHeight(1.5),
        width: responsiveWidth(95),
    },

    appType: {
        color: '#000',
        fontSize: 17,
        marginTop: responsiveHeight(2.5),
        marginBottom: responsiveHeight(1.4),
        marginLeft: responsiveHeight(1.4),
    },

    ImageContainer: {
        marginVertical: responsiveHeight(1.3),
        marginHorizontal: responsiveHeight(1.8),
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(2.1),
        paddingLeft: responsiveHeight(1.7),
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'white',
        elevation: 3
    },

    addSeleect: {
        color: "#000",
        padding: responsiveHeight(0.2)
    },

    selectItem: {
        marginTop: 5,
        display: "flex",
        width: "100%",
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: "wrap",
        marginHorizontal: responsiveWidth(-3)
    },

    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveHeight(1.5),
        backgroundColor: '#fff',
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        paddingHorizontal: responsiveHeight(1.8),
        marginLeft: responsiveHeight(2.5),
        paddingVertical: responsiveHeight(1.5),
        elevation: 2.7,
    },

    textSelectedStyle: {
        marginRight: responsiveHeight(0.5),
        fontSize: responsiveFontSize(1.8),
        flex: 1,
        color: "#000",
    },

    selectedImage: {
        width: '30%',
        height: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: responsiveScreenWidth(25.4)
    },

    imageContainer: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
    },

    removeIconContainer: {
        position: 'absolute',
        top: -12,
        right: 145,
        backgroundColor: '#000',
        borderRadius: 100,
        padding: 2,
    },

    imgcontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: responsiveHeight(1),
        marginHorizontal: responsiveWidth(4)
    },

    selectedimg: {
        width: responsiveWidth(25),
        height: responsiveHeight(13)
    },

    deleteButton: {
        backgroundColor: '#000',
        borderRadius: 100,
        position: "absolute",
        top: -6,
        right: -5,
    },

    imageshow: {
        marginBottom: 10,
        marginHorizontal: responsiveWidth(2)
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
        backgroundColor: '#fff',
        padding: responsiveHeight(1.5),
        borderRightWidth: 1,
        borderRightColor: "#ddd",
        elevation: 1
    },

    phonenumber: {
        fontSize: 17,
    },
})

export default AddShopStyle;