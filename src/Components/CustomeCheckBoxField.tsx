import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Modal } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface CustomeCheckSelectField {
    customeCheckOpen: boolean
    setCustomeCheckOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>
    selectedValues: number[],
    selectedApplicationType: any,
    selectedAppTypeName: any,
}

const CustomeCheckBoxField: React.FC<CustomeCheckSelectField> = ({
    customeCheckOpen, setCustomeCheckOpen, setSelectedValues, selectedValues, selectedApplicationType,
    selectedAppTypeName
}) => {
    const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState<number[]>(selectedValues);

    useEffect(() => {
        setSelectedItems(selectedValues);
        if (!customeCheckOpen) {
            setSearch('');
        }
    }, [selectedValues, customeCheckOpen]);

    const handleCheckedField = (id: number) => {
        let selectedCheckedItems = [...selectedItems];
        if (selectedCheckedItems.includes(id)) {
            selectedCheckedItems = selectedCheckedItems.filter((itemId) => itemId !== id);
        } else {
            selectedCheckedItems.push(id);
        }
        setSelectedItems(selectedCheckedItems);
        setSelectedValues(selectedCheckedItems);
    };

    const toggleButton = () => {
        setCustomeCheckOpen(!customeCheckOpen);
    };

    const handleModalClose = () => {
        if (customeCheckOpen) {
            setCustomeCheckOpen(false);
        }
    };

    const handleModalInnerPress = () => {
    };

    const filteredProducts = selectedApplicationType
        ? selectedApplicationType?.products.filter((product: any) =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <Modal animationType='slide' transparent={true} visible={customeCheckOpen}
            style={{ width: '90%', marginBottom: 0, marginLeft: responsiveHeight(2.4) }}
            onTouchCancel={toggleButton}
        >
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <TouchableWithoutFeedback onPress={handleModalInnerPress}>
                        <View style={styles.modelContainer}>
                            <Text style={styles.mainName}> {selectedAppTypeName} </Text>

                            <TextInput style={styles.inputText} autoCapitalize='none' autoCorrect={false}
                                value={search} placeholder="Search Products"
                                onChangeText={(search) => setSearch(search)}
                            />

                            <ScrollView style={{ maxHeight: 300 }}>
                                {selectedApplicationType && (
                                    <ScrollView>
                                        <View style={styles.container}>
                                            {filteredProducts.map((product: any, index: any) => (
                                                <View style={{ width: '48%' }} key={index}>
                                                    <TouchableOpacity style={styles.checkboxWrapper}
                                                        onPress={() => handleCheckedField(product.id)}
                                                    >
                                                        <View style={styles.mainCheckBox}>
                                                            <CheckBox
                                                                value={selectedItems.includes(product.id)}
                                                                onValueChange={() => handleCheckedField(product.id)}
                                                            />
                                                        </View>
                                                        <Text style={styles.selectItem}>{product.product_name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                )}
                            </ScrollView>

                            <View style={styles.okBtn}>
                                <TouchableOpacity onPress={toggleButton}>
                                    <Text style={[styles.okText]}> OK </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default CustomeCheckBoxField

const styles = StyleSheet.create({
    modelContainer: {
        position: 'absolute',
        top: 125,
        borderRadius: 18,
        paddingTop: 20,
        paddingBottom: 18,
        marginHorizontal: responsiveWidth(4),
        backgroundColor: '#fff',
    },

    mainName: {
        textAlign: 'center',
        color: '#000',
        fontSize: 17
    },

    inputText: {
        width: responsiveWidth(75),
        height: responsiveHeight(6.2),
        marginVertical: responsiveHeight(2),
        marginHorizontal: responsiveHeight(3.6),
        backgroundColor: '#fff',
        borderRadius: responsiveHeight(1.3),
        padding: responsiveHeight(1.5),
        elevation: 3,
    },

    okBtn: {
        alignItems: "flex-end",
        marginHorizontal: responsiveHeight(1.9),
        justifyContent: 'center'
    },

    okText: {
        borderWidth: 1,
        borderColor: '#b5b1b1',
        width: responsiveWidth(20),
        borderRadius: responsiveHeight(3),
        padding: responsiveWidth(2.5),
        textAlign: 'center',
        justifyContent: 'center',
        color: '#39A7FF',
        fontSize: responsiveFontSize(2.1),
    },

    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        width: "100%",
        justifyContent: 'space-between',
        marginTop: 8
    },

    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
        marginHorizontal: responsiveWidth(4.3)
    },

    mainCheckBox: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    selectItem: {
        flex: 1,
        color: "#000",
    },
})