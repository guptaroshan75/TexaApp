import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

const AddEquipmentStyle = StyleSheet.create({
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

    container: {
        flex: 1,
        backgroundColor: "#00aaf0",
    },

    maincontainer: {
        flex: 1,
        backgroundColor: "white",
    },

    main: {
        marginTop: responsiveHeight(1.2),
    },

    bottomimage: {
        marginBottom: responsiveHeight(1.5)
    },

    addtext: {
        paddingVertical: responsiveHeight(1.5), 
        marginHorizontal: responsiveWidth(3.5),
        backgroundColor: '#00aaf0',
        elevation: 3, 
        borderRadius: responsiveHeight(1.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2)
    },

    addEquipmenttext: {
        color: 'white', 
        padding: 2,
        fontSize: responsiveFontSize(2.4), 
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
        fontSize: responsiveFontSize(2.1), 
        color: "#797979",
        padding: responsiveHeight(0.2)
    },

    textFieldIcon: {
        marginVertical: responsiveHeight(2),
        marginHorizontal: responsiveHeight(1.9),
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

    textFieldDropdown: {
        marginTop: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.9),
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(2.1),
        paddingLeft: responsiveHeight(1.2),
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'white',
        elevation: 3
    },

    textinputlabel: {
        marginLeft: responsiveHeight(1.8),
        fontSize: responsiveFontSize(2.1),
        color: "#1A1A18",
    },

    textinputdropdown: {
        marginLeft: responsiveHeight(1.6),
        fontSize: responsiveFontSize(2.1),
        color: "#1A1A18",
    },

    inputView: {
        marginTop: responsiveHeight(1.5),
        width: responsiveWidth(100),
    },

    icon: {
        position: "absolute",
        right: responsiveHeight(1.3),
        top: responsiveHeight(1.8),
        color: '#000',
    },

    imgcontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: responsiveHeight(1),
        marginHorizontal: responsiveWidth(4)
    },

    selectedimg: {
        width: responsiveWidth(43),
        height: responsiveHeight(16),
        marginHorizontal: responsiveWidth(22.5)
    },

    deleteButton: {
        backgroundColor: '#00aaf0',
        borderRadius: 100,
        width: responsiveWidth(6.5),
        height: responsiveWidth(6.5),
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: -11,
        right: 69,
    },

    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: responsiveFontSize(1.8)
    },

    imageshow: {
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveWidth(2),
    },
})

export default AddEquipmentStyle;