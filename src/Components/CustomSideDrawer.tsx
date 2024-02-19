import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import CustomeSideDrawerStyle from '../Css/CustomeSideDrawerStyle'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { getUsers } from '../Redux/Features/UserSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Api, Shop_Base_Url } from '../BaseUrl/BaseUrl';

interface CustomSideDrawer {
    navigation: any
}

const CustomSideDrawer: React.FC<CustomSideDrawer> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are You Sure You Want To LogOut',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const token = await AsyncStorage.getItem('token');
                            const response = await axios.get(`${Api}/logout`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            setLoading(false);
                            await AsyncStorage.removeItem('token');
                            props.navigation.navigate('LoginScreenNavigator', { screen: 'Login' });
                            console.log('User logged out successfully.', response);
                        } catch (error) {
                            console.error('Error logging out:', error);
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );

    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const userName = get_user ? get_user.name : '';
    const userEmail = get_user ? get_user.email : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={CustomeSideDrawerStyle.container}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={CustomeSideDrawerStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={CustomeSideDrawerStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}

                        <Loader loading={isLoading} />
                        <View>
                            <Text style={CustomeSideDrawerStyle.profileName}> {userName} </Text>
                            <Text style={CustomeSideDrawerStyle.profileEmail}> {userEmail} </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {loading && (
                <Loader loading={loading} />
            )}

            <TouchableOpacity style={CustomeSideDrawerStyle.footer} onPress={handleLogout}>
                <View style={{ flexDirection: "row", }}>
                    <MaterialCommunityIcons name="logout" size={responsiveHeight(3.3)} color="#000" />
                    <Text style={CustomeSideDrawerStyle.logtext}> Log Out </Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default CustomSideDrawer
