import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loader from './Loader';

interface CustomeEditShowMachineType {
    responses: any,
    lable: any,
    loading: any,
    setSelectedValue: (name: string) => void;
    placeholder: any,
    selectedShowValue: any
}

const CustomeEditShowMachineType: React.FC<CustomeEditShowMachineType> = ({
    responses, loading, lable, placeholder, setSelectedValue, selectedShowValue
}) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const toggleButton = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        if (selectedShowValue) {
            setSelectedItem(selectedShowValue);
        }
    }, [selectedShowValue]);;

    const handleSelectValue = (value: any) => {
        if (setSelectedItem) {
            setSelectedItem(value);
            setIsVisible(false);
            setSelectedValue(value)
        }
    };    

    return (
        <>
            <View style={styles.inputView}>
                <Text style={styles.textinputlabel}> {lable} </Text>
                <TouchableOpacity style={styles.textFieldIcon} onPress={toggleButton}>
                    <Text> {selectedItem || placeholder} </Text>
                    <MaterialIcons name={'arrow-drop-down'}
                        size={25} color="#aaa" style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <Modal visible={isVisible} animationType='fade' transparent
                style={{ width: '100%', marginBottom: 0, marginLeft: 0 }}
                onTouchCancel={() => setIsVisible(false)}
            >
                <TouchableWithoutFeedback onPress={toggleButton}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={styles.modelContainer}>
                            <TextInput style={styles.search} autoCapitalize='none'
                                autoCorrect={false} placeholder='Search...'
                            />

                            {loading ? (
                                <Loader loading={loading} />
                            ) : (
                                <ScrollView>
                                    {responses.map((item: any, index: any) => (
                                        <View key={index}>
                                            <TouchableOpacity style={styles.inputViewTele}
                                                onPress={() => handleSelectValue(item)}
                                            >
                                                <Text style={styles.inputTextFlg}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}

                            <TouchableOpacity style={styles.closeBtn}
                                onPress={toggleButton}
                            >
                                <Text style={[styles.closeText]}> Close </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default CustomeEditShowMachineType

const styles = StyleSheet.create({
    inputViewTele: {
        marginHorizontal: responsiveHeight(1.9),
        width: responsiveWidth(92),
        position: "relative",
        display: 'flex',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#b5b1b1',
    },

    inputTextFlg: {
        color: '#000',
        paddingVertical: responsiveHeight(2.3),
        paddingHorizontal: responsiveHeight(2),
    },

    search: {
        paddingHorizontal: responsiveHeight(1.9),
        borderWidth: 1,
        borderColor: '#b5b1b1',
        width: responsiveWidth(92),
        borderRadius: responsiveHeight(0.7),
        height: responsiveHeight(7),
        marginTop: responsiveHeight(1.3),
        marginHorizontal: responsiveHeight(1.9),
    },

    modelContainer: {
        position: 'absolute',
        bottom: 0,
        height: 420,
        borderTopRightRadius: 25,
        paddingTop: 23,
        backgroundColor: '#fff',
        width: '100%',
        borderTopStartRadius: 25
    },

    closeBtn: {
        alignItems: "flex-end",
        marginHorizontal: responsiveHeight(1.9),
        justifyContent: 'center'
    },

    closeText: {
        borderWidth: 1,
        borderColor: '#b5b1b1',
        width: responsiveWidth(20),
        borderRadius: responsiveHeight(0.7),
        textAlign: 'center',
        justifyContent: 'center',
        padding: responsiveWidth(2.5),
        color: '#39A7FF',
        fontSize: responsiveFontSize(2.1),
    },

    textFieldIcon: {
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
});