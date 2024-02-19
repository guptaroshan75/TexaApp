import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface AgreeCheckBox {
    rememberMe: any,
    setRememberMe: any,
}
const AgreeCheckBox: React.FC<AgreeCheckBox> = ({ setRememberMe, rememberMe }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
        >
            <MaterialCommunityIcons size={24} style={{ marginRight: 5 }}
                name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                color={rememberMe ? '#39A7FF' : '#000'}

            />
            <Text>{rememberMe ? 'Remember Me' : 'Remember Me'}</Text>
        </TouchableOpacity>
    )
}

export default AgreeCheckBox;

const styles = StyleSheet.create({
    checkboxContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: responsiveWidth(2.5)
    },
})