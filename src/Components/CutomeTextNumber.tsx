import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

interface CutomeTextNumber {
    value: string,
    placeholder: string,
    title: string,
    onChangeText: (text: string) => void;
}

const CutomeTextNumber: React.FC<CutomeTextNumber> = (props) => {
    const handleTextChange = (text: string) => {
        props.onChangeText(text); 
    };

    return (
        <View style={styles.inputView}>
            <Text style={styles.textinputlabel}>{props.title}</Text>
            <TextInput style={styles.inputText} autoCapitalize='none' onChangeText={handleTextChange}
                autoCorrect={false} defaultValue={props.value} placeholder={props.placeholder} 
                keyboardType='numeric'
            />
        </View>
    );
};

export default CutomeTextNumber;

const styles = StyleSheet.create({
    inputText: {
        width: responsiveWidth(92),
        height: responsiveHeight(7.4),
        marginVertical: responsiveHeight(0.4),
        marginHorizontal: responsiveHeight(1.9),
        backgroundColor: '#fff',
        borderRadius: responsiveHeight(1.5),
        padding: responsiveHeight(1.6),
        elevation: responsiveHeight(0.4),
    },

    textinputlabel: {
        marginLeft: responsiveHeight(2.2),
        marginBottom: responsiveHeight(1),
        fontSize: responsiveFontSize(2.2),
        color: "#1A1A18",
    },

    inputView: {
        marginTop: responsiveHeight(1.5),
        width: responsiveWidth(95),
    },

})
