import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

interface CustomeTextLable {
    lable: string,
    value: string,
}
const CustomeTextLable: React.FC<CustomeTextLable> = (props) => {
    return (
        <View>
            <View style={styles.nameContainer}>
                <Text style={styles.nametitle}> {props.lable} </Text>
                <Text style={styles.namevalue}> {props.value} </Text>
            </View>
        </View>
    )
}

export default CustomeTextLable;

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: responsiveHeight(1)
    },

    nametitle: {
        marginRight: responsiveHeight(1),
        fontSize: responsiveFontSize(1.9),
        color: "#000",
    },

    namevalue: {
        flex: 1,
        fontSize: responsiveFontSize(1.8),
    },
})