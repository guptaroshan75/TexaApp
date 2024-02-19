import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Modal } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Loader from './Loader';

interface QueryProductModel {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    response: any[],
    loading: any,
    handleProductSelect: any,
    selectedProducts: any[]
}

const QueryProductModel: React.FC<QueryProductModel> = ({
    isVisible, setIsVisible, response, handleProductSelect, selectedProducts, loading
}) => {
    const [search, setSearch] = useState('');
    const [filteredResponse, setFilteredResponse] = useState<any[]>([]);

    const handleCheckBox = (productId: number) => {
        const isSelected = selectedProducts.includes(productId);
        if (isSelected) {
            const updatedProducts = selectedProducts.filter((id: number) => id !== productId);
            handleProductSelect(updatedProducts);
        } else {
            handleProductSelect([...selectedProducts, productId]);
        }
    }

    useEffect(() => {
        setFilteredResponse(
            response.filter((product: any) =>
                product.product_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [response, search]);

    const toggleButton = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}
            style={{ width: '90%', marginBottom: 0, marginLeft: responsiveHeight(2.4) }}
            onTouchCancel={toggleButton}
        >
            <TouchableWithoutFeedback onPress={toggleButton}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={styles.modelContainer}>
                        <TextInput style={styles.inputText} autoCapitalize='none' autoCorrect={false}
                            value={search} placeholder="Search Products"
                            onChangeText={(search) => setSearch(search)}
                        />

                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <ScrollView style={{ maxHeight: 310 }}>
                                <View style={styles.container}>
                                    {filteredResponse?.map((product: any, index: any) => (
                                        <View style={{ width: '100%' }} key={index}>
                                            <TouchableOpacity style={styles.checkboxWrapper}
                                                onPress={() => handleCheckBox(product.id)}
                                            >
                                                <Text style={styles.selectItem}>
                                                    {product.product_name}
                                                </Text>
                                                <View style={styles.mainCheckBox}>
                                                    <CheckBox
                                                        value={selectedProducts.includes(product.id)}
                                                        onValueChange={() => handleCheckBox(product.id)}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        )}

                        <TouchableOpacity style={styles.okBtn} onPress={toggleButton}>
                            <Text style={[styles.okText]}> OK </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default QueryProductModel

const styles = StyleSheet.create({
    modelContainer: {
        position: 'absolute',
        top: 225,
        height: '40%',
        borderRadius: 18,
        paddingTop: 18,
        marginHorizontal: responsiveWidth(5),
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
        marginHorizontal: responsiveHeight(2.9),
        justifyContent: 'flex-end'
    },

    okText: {
        width: responsiveWidth(20),
        height: responsiveHeight(6),
        textAlign: 'center',
        marginBottom: responsiveHeight(2.3),
        paddingTop: responsiveHeight(1.5),
        color: '#39A7FF',
        fontSize: responsiveFontSize(2.1),
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: responsiveHeight(3),
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
        marginHorizontal: responsiveWidth(6.3)
    },

    mainCheckBox: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    selectItem: {
        flex: 1,
        color: "#000",
        marginLeft: 10,
        fontSize: 20
    },
})