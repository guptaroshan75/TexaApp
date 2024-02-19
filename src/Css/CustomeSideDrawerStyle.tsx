import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CustomeSideDrawerStyle = StyleSheet.create({
    container: {
        height: 170,
        backgroundColor: '#39A7FF',
        paddingLeft: responsiveWidth(5),
        paddingTop: responsiveHeight(3)
    },

    profileLogo: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginLeft: responsiveWidth(2),
    },

    profileName: {
        fontSize: responsiveFontSize(2.5),
        color: '#fff',
        fontWeight: '500'
    },

    profileEmail: {
        color: '#fff'
    },

    iconlogo: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 15,
        padding: 14,
        backgroundColor: '#f6f6f6'
    },

    icontext: {
        alignSelf: 'center',
        marginLeft: 8,
        color: '#000',
        fontWeight: '500'
    },

    footer: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#f6f6f6",
        padding: responsiveHeight(2.2),
    },

    logtext: {
        fontSize: responsiveFontSize(2),
        color: "#000",
        marginLeft: responsiveHeight(1.4)
    }
})

export default CustomeSideDrawerStyle;