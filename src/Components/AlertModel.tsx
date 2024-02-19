import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import React, { useState } from 'react'

interface AlertModel {
    visible: boolean;
    message: string;
    closeModel: () => void;
}

const AlertModel: React.FC<AlertModel> = ({ visible, message, closeModel }) => {

    return (
        <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={closeModel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent} >
                    <View style={{ marginBottom: responsiveHeight(2) }}>
                        <Text style={styles.modelHeader}> Warning !</Text>
                    </View>

                    <Text style={styles.modalText}> {message} </Text>

                    <TouchableOpacity onPress={closeModel}>
                        <View style={styles.modelbtn}>
                            <Text style={styles.modelokbtn}> OK </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AlertModel

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    modalContent: {
        backgroundColor: 'white',
        padding: responsiveHeight(2.3),
        borderRadius: responsiveHeight(1.5),
        elevation: responsiveHeight(0.5),
        marginLeft: responsiveHeight(1.5),
        marginRight: responsiveHeight(1.5),
        width: "90%",
    },

    modelHeader: {
        fontSize: responsiveFontSize(2.2),
        color: "red",
        fontWeight: "500"
    },

    modalText: {
        marginBottom: 0,
        fontSize: 17,
        color: "#202020"
    },

    modelbtn: {
        marginTop: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },

    modelokbtn: {
        fontSize: responsiveFontSize(2),
        color: "#00aaf0",
        borderWidth: 1,
        borderColor: '#00aaf0',
        paddingHorizontal: responsiveHeight(1.2),
        marginTop: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(0.8),
        borderRadius: responsiveHeight(5)
    }
})