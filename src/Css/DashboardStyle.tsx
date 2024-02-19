import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const DashboardStyle = StyleSheet.create({
    headder: {
        width: '100%',
        height: 60,
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
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#fff'
    },

    container: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 0,
        borderRadius: 10,
        margin: 13,
        paddingTop: 18,
        paddingLeft: 15,
        paddingBottom: 7,
    },

    shopping: {
        fontSize: 30,
        color: '#5272F2',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 12,
        height: 60,
        width: 60,
        backgroundColor: '#d4664f',
        borderRadius: 50,
        position: 'relative',
    },

    equipment: {
        fontSize: 30,
        color: '#752fff',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 12,
        height: 60,
        width: 60,
        backgroundColor: '#5752e3',
        borderRadius: 50,
        position: 'relative',
    },

    dosages: {
        fontSize: 30,
        color: '#5272F2',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 12,
        height: 60,
        width: 60,
        backgroundColor: '#fdbe01',
        borderRadius: 50,
        position: 'relative',
    },

    queries: {
        fontSize: 30,
        color: '#5272F2',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 12,
        height: 60,
        width: 60,
        backgroundColor: '#379fff',
        borderRadius: 50,
        position: 'relative',
    },

    icon: {
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
        position: 'absolute',
        top: 14,
        left: 14
    },

    border: {
        borderLeftWidth: 1,
        height: 58,
        marginStart: 15,
        marginBottom: 11,
        borderColor: '#e2e5eb'
    },

    title: {
        fontSize: responsiveFontSize(2.4),
        color: "#000",
        marginBottom: responsiveHeight(1),
        maxWidth: responsiveWidth(50),
        fontFamily: 'Poppins-Regular',
        overflow: 'hidden',
        marginStart: 10,
    },

    total: {
        fontSize: responsiveFontSize(2.2),
        color: "#000",
        fontFamily: 'Poppins-Regular',
        marginStart: 11,

    },
})

export default DashboardStyle