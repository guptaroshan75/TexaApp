import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, } from 'react-native';
import AddDosageStyle from '../../Css/ManageDosagesStyle/AddDosageStyle'
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeImage from '../../Components/CustomeImage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { Api } from '../../BaseUrl/BaseUrl';
import { getAllDosage } from '../../Redux/Features/DosageSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CutomeTextNumber from '../../Components/CutomeTextNumber';

interface AddDosage {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

const AddDosage: React.FC<AddDosage> = ({ checkVisible, closeModal }) => {
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
    const { get_user } = useSelector((state: RootState) => state.user);
    const userId = get_user ? get_user.id : '';

    // Front Image Handlers
    const handleAddFrontImage = (imageURI: string) => {
        setAddFrontImage(imageURI);
        setFrontImageVisible(false);
    };

    const handleCancelFrontImage = () => {
        setAddFrontImage('');
    };

    // Back Image Handlers
    const handleAddBackImage = (imageURI: string) => {
        setaddBackImage(imageURI);
        setBackImageVisible(false);
    };

    const handleCancelBackImage = () => {
        setaddBackImage('');
    };

    const handleAddDosage = async () => {
        if (!Modelname || !Modelnumber || !ProductNo || !NumberOfPumps || !NumberOfWashers) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('user_id', String(userId));
        formData.append('model_name', Modelname);
        formData.append('model_no', Modelnumber);
        formData.append('product_no', ProductNo);
        formData.append('pupmps_no', NumberOfPumps);
        formData.append('washers_no', NumberOfWashers);

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
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/add-dosage`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllDosage(userId));
            console.log('Add Dosage', response.data);
        } catch (error) {
            console.log('Add Dosage error:', error);
        }
    };

    return (
        <View style={AddDosageStyle.container}>
            <TouchableOpacity style={AddDosageStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={AddDosageStyle.back} />
                </TouchableOpacity>

                <Text style={AddDosageStyle.headerText}> Add New Dosage </Text>
            </TouchableOpacity>

            <View style={AddDosageStyle.maincontainer}>
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

                    <View style={AddDosageStyle.main}>
                        <TouchableOpacity style={AddDosageStyle.ImageContainer}
                            onPress={() => setFrontImageVisible(true)}
                        >
                            <Text style={AddDosageStyle.addimagecontainer}> Add Front Image </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addFrontImage ? (
                            <View style={AddDosageStyle.imgcontainer}>
                                <View style={AddDosageStyle.imageshow}>
                                    <Image source={{ uri: addFrontImage }}
                                        style={AddDosageStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddDosageStyle.deleteButton}
                                        onPress={() => { handleCancelFrontImage() }}
                                    >
                                        <Text style={AddDosageStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={frontImageVisible} setIsVisible={setFrontImageVisible}
                            setSelectedImageURI={handleAddFrontImage}
                        />
                    </View>

                    <View style={AddDosageStyle.bottomimage}>
                        <TouchableOpacity style={AddDosageStyle.ImageContainer}
                            onPress={() => setBackImageVisible(true)}
                        >
                            <Text style={AddDosageStyle.addimagecontainer}> Add Back Image </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addBackImage ? (
                            <View style={AddDosageStyle.imgcontainer}>
                                <View style={AddDosageStyle.imageshow}>
                                    <Image source={{ uri: addBackImage }}
                                        style={AddDosageStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddDosageStyle.deleteButton}
                                        onPress={() => { handleCancelBackImage() }}
                                    >
                                        <Text style={AddDosageStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={backImageVisible} setIsVisible={setBackImageVisible}
                            setSelectedImageURI={handleAddBackImage}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity style={AddDosageStyle.addtext} onPress={handleAddDosage}>
                    <Text style={AddDosageStyle.adddosagetext}>Add Dosage</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddDosage;