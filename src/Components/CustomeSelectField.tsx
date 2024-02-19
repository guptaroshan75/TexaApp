import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View, Image, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Image_Base_Url } from '../BaseUrl/BaseUrl';
import Loader from './Loader';

interface CustomeSelectField {
    isVisibleCode: boolean;
    allCountry: { name: string; image: any; code: string; }[];
    setIsVisibleCode: React.Dispatch<React.SetStateAction<boolean>>;
    onSelectCountry: (country: any) => void;
    onClose: () => void;
    loading: any,
}

const CustomeSelectField: React.FC<CustomeSelectField> = ({
    setIsVisibleCode, isVisibleCode, onSelectCountry, onClose, allCountry, loading
}) => {
    const [search, setSearch] = useState('');

    const handleSelection = (value: any) => {
        if (onSelectCountry) {
            onSelectCountry(value);
        }
        onClose();
    };

    useEffect(() => {
        if (!isVisibleCode) {
            setSearch('');
        }
    }, [isVisibleCode]);

    const toggleButton = () => {
        setIsVisibleCode(!isVisibleCode);
    }

    const filteredCountries = allCountry?.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal visible={isVisibleCode} animationType='slide' transparent={true}
            style={{ width: '100%', marginBottom: 0, marginLeft: 0 }} onTouchCancel={toggleButton}
        >
            <TouchableWithoutFeedback onPress={toggleButton}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={styles.modelContainer}>
                        <TextInput style={styles.search} autoCapitalize='none'
                            autoCorrect={false} placeholder='Search...'
                            value={search} onChangeText={(text) => setSearch(text)}
                        />

                        {loading ? (
                            <Loader loading={loading} />
                        ) : (
                            <ScrollView>
                                {filteredCountries?.map((country: any, index: any) => (
                                    <TouchableOpacity key={index} style={styles.inputViewTele}
                                        onPress={() => handleSelection(country)}
                                    >
                                        <View>
                                            <Image style={styles.flagImg}
                                                source={{ uri: `${Image_Base_Url}/${country.flag}` }}
                                            />
                                        </View>

                                        <View style={{ alignItems: 'center', flex: 1}}>
                                            <Text style={styles.inputTextFlg}> {country.name} </Text>
                                        </View>

                                        <View>
                                            <Text> {`(+${country.calling_code})`} </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}

                        <TouchableOpacity style={styles.closeBtn} onPress={toggleButton}>
                            <Text style={[styles.closeText]}> Close </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
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

    flagImg: {
        width: 33,
        height: 26,
    },

    inputTextFlg: {
        textAlign: 'center',
        paddingVertical: responsiveHeight(2.5),
        // width: responsiveWidth(50),
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: responsiveWidth(2),
        // flexWrap: 'wrap',
    },

    inputViewTele: {
        marginHorizontal: responsiveHeight(1.9),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#b5b1b1',
    },

    modelContainer: {
        position: 'absolute',
        bottom: 0,
        height: 450,
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
});

export default CustomeSelectField;