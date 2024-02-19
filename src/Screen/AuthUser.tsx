import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../Redux/Store';
import { getUsers } from '../Redux/Features/UserSlice';

interface AuthUser {
    navigation: any
}

const AuthUser: React.FC<AuthUser> = ({ navigation }) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { token } = useSelector((state: RootState) => state.authUser);
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);

    console.log(token);

    useEffect(() => {
        checkLoggedInStatus();
    }, []);

    const checkLoggedInStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            if (token) {
                dispatch(getUsers())
                navigation.navigate('DrawerNavigator');
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 401) {
                await AsyncStorage.removeItem('token');
                navigation.navigate('Login');
            }
            console.error('Error checking login status:', error);
        }
    };
    
    return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Loading Screen........</Text>
        </View>
    )
}

export default AuthUser;
