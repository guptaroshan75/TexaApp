import { View, TouchableOpacity, Text, ScrollView, Image, Alert, } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput'
import CustomeModelOfData from '../../Components/CustomeModelOfData';
import React, { useEffect, useState } from 'react';
import AddOneTimeAccessStyle from '../../Css/CreateOneTimeAccessStyle/AddOneTimeAccessStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getAlldata } from '../../Redux/Features/EquipmentsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '../../BaseUrl/BaseUrl';
import axios from 'axios';
import { getAllSubUSer } from '../../Redux/Features/SubUserSlice';

interface AddRaiseAQuery {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

const AddOneTimeAccess: React.FC<AddRaiseAQuery> = ({ checkVisible, closeModal }) => {
    const [selectedShopId, setSelectedShopId] = useState('');

    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_all_data } = useSelector((state: RootState) => state.equipments);
    const shopData = get_all_data.shop.map((item: any) => ({ id: item.id, name: item.shop_name }))
    const userId = get_user ? get_user.id : '';

    useEffect(() => {
        dispatch(getAlldata(userId))
    }, [dispatch])

    const handleShopSelect = (id: any) => {
        setSelectedShopId(id);
    };

    const handleAddSubUser = async () => {
        if (!fullName || !email || !password || !selectedShopId) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            Alert.alert('Error', 'Please Enter a Valid Email Address');
            return;
        }
        
        const formData = new FormData();
        formData.append('head_user_id', Number(userId));
        formData.append('shop_id', selectedShopId);
        formData.append('name', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('user_type', '1');

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/add-subUser`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllSubUSer(userId))
            console.log('Add Sub User', response.data);
        } catch (error) {
            console.log('Add Sub User error:', error);
        }
    };

    return (
        <View style={AddOneTimeAccessStyle.container}>
            <TouchableOpacity style={AddOneTimeAccessStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={AddOneTimeAccessStyle.back} />
                </TouchableOpacity>

                <Text style={AddOneTimeAccessStyle.headerText}> Add New Sub User </Text>
            </TouchableOpacity>

            <View style={AddOneTimeAccessStyle.maincontainer}>
                <ScrollView>
                    <CustomeModelOfData responses={shopData} loading={isLoading}
                        placeholder={'Select Shop Name'} lable={'Shop Name'}
                        setSelectedValue={handleShopSelect}
                    />

                    <CustomTextInput title={'Full Name'} value={fullName} placeholder={"Enter Your Name"}
                        onChangeText={(fullName) => setFullName(fullName)}
                    />

                    <CustomTextInput title={'Email-Id'} value={email} placeholder={"Enter Your Email-Id"}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <CustomTextInput title={'Password'} placeholder={"Enter Your Password"}
                        onChangeText={(password) => setPassword(password)} value={password} 
                    />
                </ScrollView>

                <TouchableOpacity style={AddOneTimeAccessStyle.addtext}
                    onPress={handleAddSubUser}
                >
                    <Text style={AddOneTimeAccessStyle.addSubUsertext}> Add Sub User </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddOneTimeAccess