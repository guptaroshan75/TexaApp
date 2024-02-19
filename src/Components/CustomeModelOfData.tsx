import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loader from './Loader';

interface CustomeModelOfData {
    lable: any,
    responses: any,
    loading: any,
    setSelectedValue: (name: string, id: any) => void;
    placeholder: any,
}

const CustomeModelOfData: React.FC<CustomeModelOfData> = ({
    responses, loading, setSelectedValue, placeholder, lable
}) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [searchData, setSearchData] = useState('');

    const toggleButton = () => {
        setIsVisible(!isVisible);
    }

    useEffect(() => {
        if (!isVisible) {
            setSearchData('');
        }
    }, [isVisible]);

    const handleSelectValue = (value: any) => {
        if (setSelectedValue) {
            setSelectedItem(value.name)
            setIsVisible(false);
            setSelectedValue(value.id, value.name);
        }
    };

    const filterResponses = (searchText: string) => {
        setSearchData(searchText);
    };

    const filteredResponses = responses && responses?.filter((item: any) =>
        item.name.toLowerCase().includes(searchData.toLowerCase())
    );

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
                                onChangeText={filterResponses}
                                value={searchData}
                            />

                            {loading ? (
                                <Loader loading={loading} />
                            ) : (
                                <ScrollView>
                                    {filteredResponses?.map((item: any, index: any) => (
                                        <View key={index}>
                                            <TouchableOpacity style={styles.inputViewTele}
                                                onPress={() => handleSelectValue(item)}
                                            >
                                                <Text style={styles.inputTextFlg}>
                                                    {item.name}
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

export default CustomeModelOfData

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
        padding: responsiveWidth(2.5),
        textAlign: 'center',
        justifyContent: 'center',
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