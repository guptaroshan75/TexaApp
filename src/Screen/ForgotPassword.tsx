import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react';
import ForgotPasswordStyle from '../Css/ForgotPasswordStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '../BaseUrl/BaseUrl';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Loader from '../Components/Loader';
import AlertModel from '../Components/AlertModel';

interface ForgotPassword {
    navigation: any
}

const ForgotPassword: React.FC<ForgotPassword> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const closeModel = () => {
        setIsVisible(!isVisible)
    }

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Error', 'Email is required');
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            Alert.alert('Error', 'Please Enter a Valid Email Address');
            return;
        }

        const emailDomain = email.split('@')[1];
        if (emailDomain.toLowerCase().indexOf('.com') !== emailDomain.length - 4) {
            setIsVisible(true)
            return;
        }

        const userEmail = { email: email }
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(`${Api}/forget-password`, userEmail, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response && response.data.msg === 'User Not Found') {
                Alert.alert('Error', 'User Not Found');
                setLoading(false);
                return;
            }

            if (response && response.data && response.data.success === true) {
                const { email, otp } = response.data.data[0]
                console.log('Forgot Password', response);
                navigation.navigate('ChangePassword', { email, otp, msg: response.data.msg })
            }
        } catch (error) {
            console.log('Forgot Password', error);
        }
    }

    const backAction = () => {
        navigation.goBack();
        return true
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={ForgotPasswordStyle.container}>
            <Text style={ForgotPasswordStyle.mainContent}> TEXA </Text>
            <Text style={ForgotPasswordStyle.forgot}> RESET PASSWORD </Text>

            <View style={ForgotPasswordStyle.inputView}>
                <TextInput style={ForgotPasswordStyle.inputText} autoCapitalize='none'
                    value={email} placeholder="Enter Your Email-Id" autoCorrect={false}
                    onChangeText={(email) => setEmail(email)}
                />
                <MaterialCommunityIcons name={'email-check-outline'}
                    size={25} color="#aaa" style={ForgotPasswordStyle.icon}
                />
            </View>

            {loading && (
                <Loader loading={loading} />
            )}

            <TouchableOpacity onPress={handleForgotPassword}
                style={ForgotPasswordStyle.loginBtn}
            >
                <Text style={ForgotPasswordStyle.loginText}> RESET </Text>
            </TouchableOpacity>

            <AlertModel message={'Invalid Email-Id Address'}
                visible={isVisible} closeModel={closeModel}
            />
        </View>
    )
}

export default ForgotPassword;