import React, { useState } from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CustomeMultiImage {
    isVisible: any,
    setIsVisible: any,
    setSelectedImageURI: (imageURIs: any) => void;
}

const CustomeMultiImage: React.FC<CustomeMultiImage> = ({
    setIsVisible, isVisible, setSelectedImageURI,
}) => {
    // const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
    // const [cameraPermission, setCameraPermission] = useState(false);

    const takeImage = async () => {
        // if (Platform.OS === 'android') {
        //     const cameraGranted: any = await requestCameraPermission();
        //     setCameraPermission(cameraGranted);
        //     if (!cameraPermission) {
        //         showPermissionAlert('Camera');
        //         return;
        //     }
        // }

        setIsVisible(false)
        const takePhoto = await launchCamera({
            mediaType: 'photo',
            quality: 0,
        })
        if (!takePhoto.didCancel && takePhoto.assets && takePhoto.assets.length > 0) {
            const newImageURI = takePhoto.assets[0].uri;
            setSelectedImageURI((imageURIs: any) => {
                return [...(imageURIs || []), newImageURI];
            });
        }
    }

    const selectImage = async () => {
        // if (Platform.OS === 'android') {
        //     const galleryGranted: any = await requestGalleryPermission();
        //     setGalleryPermission(galleryGranted);
        //     if (!galleryPermission) {
        //         showPermissionAlert('Gallery');
        //         return;
        //     }
        // }
        setIsVisible(false)
        const selectGallery = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0,
            selectionLimit: 20
        })
        if (!selectGallery.didCancel && selectGallery.assets && selectGallery.assets.length > 0) {
            const selectedImages = selectGallery.assets.map((image) => image.uri);
            setSelectedImageURI((imageURIs: any) => {
                return [...(imageURIs || []), ...selectedImages];
            });
        }
    }

    // const requestCameraPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //             title: 'Camera Permission',
    //             message: 'App needs access to your camera.',
    //             buttonPositive: 'OK',
    //         });
    //         return granted === PermissionsAndroid.RESULTS.GRANTED;
    //     } catch (err) {
    //         console.warn(err);
    //         return false;
    //     }
    // };

    // const requestGalleryPermission = async () => {
    //     try {
    //         const gallerygranted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
    //             title: 'Gallery Permission',
    //             message: 'App needs access to your gallery.',
    //             buttonPositive: 'OK',
    //         }
    //         );
    //         return gallerygranted === PermissionsAndroid.RESULTS.GRANTED;
    //     } catch (err) {
    //         console.warn(err);
    //         return false;
    //     }
    // };

    // const showPermissionAlert = (permissionType: string) => {
    //     Alert.alert(
    //         `Permission Denied`,
    //         `Please Grant ${permissionType} Permission in Settings to proceed.`,
    //         [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    //     );
    // };

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

export default CustomeMultiImage

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
