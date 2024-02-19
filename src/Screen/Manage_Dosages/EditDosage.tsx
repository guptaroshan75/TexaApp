import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, } from 'react-native';
import EditDosageStyle from '../../Css/ManageDosagesStyle/EditDosageStyle'
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeImage from '../../Components/CustomeImage';
import axios from 'axios';
import { Api, Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { editDosage, getAllDosage } from '../../Redux/Features/DosageSlice';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CutomeTextNumber from '../../Components/CutomeTextNumber';

interface EditDosage {
    closeModal: () => void,
    checkVisible: any
}

const EditDosage: React.FC<EditDosage> = ({ closeModal, checkVisible, }) => {
    const [Modelname, setModelname] = useState<string>('');
    const [Modelnumber, setModelnumber] = useState<string>('');
    const [ProductNo, setProductNo] = useState<string>('');
    const [NumberOfPumps, setNumberOfPumps] = useState<string>('');
    const [NumberOfWashers, setNumberOfWashers] = useState<string>('');

    const [addFrontImage, setAddFrontImage] = useState<string>('');
    const [addBackImage, setaddBackImage] = useState<string>('');
    const [frontImageVisible, setFrontImageVisible] = useState(false);
    const [backImageVisible, setBackImageVisible] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_edit_dosage } = useSelector((state: RootState) => state.dosages);
    const dosageId: number = get_edit_dosage.data.id
    const userId = get_user ? get_user.id : '';

    // const parsedDosageId = parseInt(dosageId)
    const handleAddFrontImage = (imageURI: string) => {
        setAddFrontImage(imageURI);
        setFrontImageVisible(false);
    }

    const handleAddBackImage = (imageURI: string) => {
        setaddBackImage(imageURI);
        setBackImageVisible(false);
    };

    const handleCancelFrontImage = async (dosageId: number) => {
        setAddFrontImage('');
        setFrontImageVisible(false);
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('No');
                    },
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        { isLoading ? (<Loader loading={isLoading} />) : null }
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            try {
                                await axios.delete(`${Api}/delete-dosage-front-image/${dosageId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                dispatch(editDosage(dosageId))
                                setAddFrontImage('');
                            } catch (error) {
                                console.log('Delete image error:', error);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleCancelBackImage = async (dosageId: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('No');
                    },
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        { isLoading ? (<Loader loading={isLoading} />) : null }
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            try {
                                await axios.delete(`${Api}/delete-dosage-back-image/${dosageId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                dispatch(editDosage(dosageId))
                                setaddBackImage('');
                            } catch (error) {
                                console.log('Delete image error:', error);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
        setaddBackImage('');
        setBackImageVisible(false);
    };

    const handleUpdateDosage = async () => {
        const formData = new FormData();
        if (addFrontImage) {
            formData.append('front_image', {
                uri: addFrontImage,
                type: 'image/jpeg',
                name: 'front_image.jpg',
            });
        }

        if (addBackImage) {
            formData.append('back_image', {
                uri: addBackImage,
                type: 'image/jpeg',
                name: 'back_image.jpg',
            });
        }
        formData.append('user_id', String(userId));
        formData.append('model_name', Modelname);
        formData.append('model_no', Modelnumber);
        formData.append('product_no', ProductNo);
        formData.append('pupmps_no', NumberOfPumps);
        formData.append('washers_no', NumberOfWashers);

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/update-dosage/${dosageId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllDosage(userId));
            console.log('Update Dosage', response.data);
        } catch (error) {
            console.log('Update Dosage error:', error);
        }
    };

    const handleModelName = () => {
        setModelname(get_edit_dosage.data.model_name)
    }

    const handleModelNumber = () => {
        setModelnumber(get_edit_dosage.data.model_no)
    }

    const handleProductNo = () => {
        setProductNo(get_edit_dosage.data.product_no)
    }

    const handleNumberOfPumps = () => {
        if (get_edit_dosage && get_edit_dosage.data && get_edit_dosage.data.pupmps_no) {
            const pumps_Number = String(get_edit_dosage.data.pupmps_no);
            setNumberOfPumps(pumps_Number);
        }
    }

    const handleNumberOfWashers = () => {
        if (get_edit_dosage && get_edit_dosage.data && get_edit_dosage.data.washers_no) {
            const washers_Number = String(get_edit_dosage.data.washers_no);
            setNumberOfWashers(washers_Number);
        }
    }

    useEffect(() => {
        handleModelName()
        handleModelNumber()
        handleProductNo()
        handleNumberOfPumps()
        handleNumberOfWashers()
    }, [dispatch, get_edit_dosage, dosageId]);

    return (
        <View style={EditDosageStyle.container}>
            <TouchableOpacity style={EditDosageStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={EditDosageStyle.back} />
                </TouchableOpacity>

                <Text style={EditDosageStyle.headerText}> Edit Dosage </Text>
            </TouchableOpacity>

            <View style={EditDosageStyle.maincontainer}>
                <ScrollView>
                    <CustomTextInput title={'Model Name'} value={Modelname} placeholder={"Model Name"}
                        onChangeText={(Modelname) => setModelname(Modelname)}
                    />
                    <CustomTextInput title={'Model No'} value={Modelnumber} placeholder={"Model No"}
                        onChangeText={(Modelnumber) => setModelnumber(Modelnumber)}
                    />
                    <CustomTextInput title={'Product No'} value={ProductNo} placeholder={"Product No"}
                        onChangeText={(ProductNo) => setProductNo(ProductNo)}
                    />
                    <CutomeTextNumber title={'Pumps No'} value={NumberOfPumps}
                        placeholder={"Number of Pumps"}
                        onChangeText={(NumberOfPumps) => setNumberOfPumps(NumberOfPumps)}
                    />
                    <CutomeTextNumber title={'Washers No'} value={NumberOfWashers}
                        placeholder={"Number of Washers"}
                        onChangeText={(NumberOfWashers) => setNumberOfWashers(NumberOfWashers)}
                    />

                    <View style={EditDosageStyle.main}>
                        <TouchableOpacity style={EditDosageStyle.ImageContainer}
                            onPress={() => setFrontImageVisible(true)}
                        >
                            <Text style={EditDosageStyle.addimagecontainer}> Add Front Image </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addFrontImage || get_edit_dosage?.data?.front_image ? (
                            <View style={EditDosageStyle.imgcontainer}>
                                <View style={EditDosageStyle.imageshow}>
                                    <Image style={EditDosageStyle.selectedimg}
                                        source={{ uri: addFrontImage || `${Shop_Base_Url}/${get_edit_dosage?.data?.front_image}` }}
                                    />
                                    <TouchableOpacity style={EditDosageStyle.deleteButton}
                                        onPress={() => handleCancelFrontImage(dosageId)}
                                    >
                                        <Text style={EditDosageStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}

                        <CustomeImage isVisible={frontImageVisible} setIsVisible={setFrontImageVisible}
                            setSelectedImageURI={handleAddFrontImage}
                        />
                    </View>

                    <View style={EditDosageStyle.bottomimage}>
                        <TouchableOpacity style={EditDosageStyle.ImageContainer}
                            onPress={() => setBackImageVisible(true)}
                        >
                            <Text style={EditDosageStyle.addimagecontainer}> Add Back Image </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addBackImage || get_edit_dosage?.data?.back_image ? (
                            <View style={EditDosageStyle.imgcontainer}>
                                <View style={EditDosageStyle.imageshow}>
                                    <Image style={EditDosageStyle.selectedimg}
                                        source={{ uri: addBackImage || `${Shop_Base_Url}/${get_edit_dosage?.data?.back_image}` }}
                                    />
                                    <TouchableOpacity style={EditDosageStyle.deleteButton}
                                        onPress={() => handleCancelBackImage(dosageId)}
                                    >
                                        <Text style={EditDosageStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}

                        <CustomeImage isVisible={backImageVisible} setIsVisible={setBackImageVisible}
                            setSelectedImageURI={handleAddBackImage}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity style={EditDosageStyle.addtext} onPress={handleUpdateDosage}>
                    <Text style={EditDosageStyle.adddosagetext}> Update Dosage </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditDosage;