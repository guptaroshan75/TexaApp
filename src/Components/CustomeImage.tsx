import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CustomeImage {
    isVisible: any,
    setIsVisible: any,
    setSelectedImageURI: (imageURI: any) => void;
}

const CustomeImage: React.FC<CustomeImage> = ({
    setIsVisible, isVisible, setSelectedImageURI
}) => {
    const takeImage = async () => {
        setIsVisible(false);
        const takePhoto = await launchCamera({
            mediaType: 'photo',
            quality: 0,
        });

        if (!takePhoto.didCancel && takePhoto.assets && takePhoto.assets.length > 0) {
            setSelectedImageURI(takePhoto.assets[0].uri);
        }
    };

    const selectImage = async () => {
        setIsVisible(false)
        const selectGallery = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0,
        })
        if (!selectGallery.didCancel && selectGallery.assets && selectGallery.assets.length > 0) {
            setSelectedImageURI(selectGallery.assets[0].uri);
        }
    }

    return (
        <ReactNativeModal animationIn={'slideInUp'}
            style={{ width: '100%', marginBottom: 0, marginLeft: 0 }}
            onBackdropPress={() => setIsVisible(false)} isVisible={isVisible}
        >
            <View style={styles.modelContainer}>
                <TouchableOpacity style={styles.mainModel} onPress={takeImage}>
                    <MaterialCommunityIcons name={'camera'}
                        size={25} color="#aaa" style={styles.iconModal}
                    />
                    <Text style={styles.iconText}> Take Photo </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainModel} onPress={selectImage}>
                    <MaterialCommunityIcons name={'image-size-select-actual'}
                        size={25} color="#aaa" style={styles.iconModal}
                    />
                    <Text style={styles.iconText}> Select From Gallery </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeBtn} onPress={() => setIsVisible(false)}>
                    <Text style={[styles.closeText]}> Close </Text>
                </TouchableOpacity>
            </View>
        </ReactNativeModal>
    )
}

export default CustomeImage

const styles = StyleSheet.create({
    modelContainer: {
        position: 'absolute',
        bottom: 0,
        height: 210,
        borderTopRightRadius: 25,
        paddingTop: 35,
        backgroundColor: '#fff',
        width: '100%',
        borderTopStartRadius: 25
    },

    mainModel: {
        flexDirection: 'row',
        marginBottom: 16,
        marginLeft: 8,
        alignItems: 'center'
    },

    iconModal: {
        position: "absolute",
        left: responsiveHeight(1),
        color: '#39A7FF'
    },

    iconText: {
        left: responsiveHeight(5),
        fontSize: 20,
        marginLeft: 6,
        color: '#000',
        fontWeight: '300'
    },

    selectedImage: {
        width: '80%',
        height: 150,
        resizeMode: 'cover',
        marginTop: 20,
        borderRadius: 10,
    },

    closeBtn: {
        borderWidth: 1,
        borderColor: '#b5b1b1',
        width: responsiveWidth(92),
        borderRadius: responsiveHeight(0.7),
        height: responsiveHeight(7),
        alignItems: "center",
        justifyContent: "center",
        marginTop: responsiveHeight(1.3),
        marginBottom: responsiveHeight(1.4),
        marginHorizontal: responsiveHeight(1.9),
    },

    closeText: {
        color: '#39A7FF',
        fontSize: responsiveFontSize(2.1),
    },
})
