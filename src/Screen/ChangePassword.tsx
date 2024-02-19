import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ChangePasswordStyle from '../Css/ChangePasswordStyle';
import AlertModel from '../Components/AlertModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '../BaseUrl/BaseUrl';
import axios from 'axios';
import Loader from '../Components/Loader';
import { useToast } from 'react-native-toast-notifications';

interface ChangePassword {
    route: any,
    navigation: any
}

const ChangePassword: React.FC<ChangePassword> = ({ route, navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isOpenModelMessage, setIsOpenModelMessage] = useState<string>('');
    const [otpCode, setOtpCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { email, msg, otp } = route.params
    const toast = useToast();

    const closeModel = () => {
        setIsVisible(!isVisible)
    }

    const handleMessage = () => {
        setEmailMessage(email)
    }

    useEffect(() => {
        handleMessage()
        if (msg) {
            setIsOpenModelMessage(msg);
            setIsVisible(true);
            return;
        }
    }, [])

    const handleChangePassword = async () => {
        setLoading(true);

        const changePassword = {
            email: email, otp: otpCode, password: password, cpassword: confirmPassword,
        }

        if (password === '') {
            setIsOpenModelMessage('Password is required');
            setIsVisible(true);
            setLoading(false)
            return
        }

        if (confirmPassword === '') {
            setIsOpenModelMessage('Confirm password is required');
            setIsVisible(true);
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setIsOpenModelMessage('Password do not match');
            setIsVisible(true);
            setLoading(false)
            return;
        }

        if (otpCode === '') {
            setIsOpenModelMessage('OTP is required');
            setIsVisible(true);
            setLoading(false)
            return
        }

        if (otpCode === otp) {
            setIsOpenModelMessage('OTP not match');
            setIsVisible(true);
            setLoading(false)
            return
        }

        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(`${Api}/update-password`, changePassword, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success === true) {
                setLoading(false);
            } else {
                setLoading(false);
                setIsOpenModelMessage(response.data.msg);
                setIsVisible(true);
                return;
            }
            console.log("Change Password SuccessFully", response.data)
            toast.show("Change Password SuccessFully", {
                type: 'success'
            });
            navigation.navigate('Login');
        } catch (error) {
            console.log('Change Password', error);
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
        <>
            <AlertModel message={isOpenModelMessage}
                visible={isVisible} closeModel={closeModel}
            />

            <ScrollView style={ChangePasswordStyle.container}>
                <Text style={ChangePasswordStyle.mainContent}> TEXA </Text>
                <Text style={ChangePasswordStyle.changepassword}> CHANGE PASSWORD </Text>

                <View style={ChangePasswordStyle.inputView}>
                    <TextInput style={ChangePasswordStyle.inputText} autoCapitalize='none'
                        value={emailMessage} placeholder="Enter Your Email" autoCorrect={false}
                        onChangeText={(emailMessage) => setEmailMessage(emailMessage)}
                        editable={false}
                    />
                    <MaterialCommunityIcons name={'email-check-outline'}
                        size={25} color="#aaa" style={ChangePasswordStyle.icon}
                    />
                </View>

                <View style={ChangePasswordStyle.inputView}>
                    <TextInput style={ChangePasswordStyle.inputText} autoCapitalize='none' maxLength={4}
                        value={otpCode} placeholder="Enter Your 4 - Digit OTP" autoCorrect={false}
                        onChangeText={(otpCode) => setOtpCode(otpCode)} keyboardType='numeric'
                    />
                </View>

                <View style={ChangePasswordStyle.inputView}>
                    <TextInput placeholder="Enter Your New Password" autoCorrect={false}
                        autoCapitalize='none' style={ChangePasswordStyle.psswordtextinput}
                        value={password} secureTextEntry={!showPassword}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'}
                        size={25} color="#aaa" style={ChangePasswordStyle.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                </View>

                <View style={ChangePasswordStyle.inputView}>
                    <TextInput placeholder="Enter Your Confirm Password" autoCorrect={false}
                        autoCapitalize='none' style={ChangePasswordStyle.psswordtextinput}
                        value={confirmPassword} secureTextEntry={!showPasswordConfirm}
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                    <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'}
                        size={25} color="#aaa" style={ChangePasswordStyle.icon}
                        onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    />
                </View>

                {loading && (
                    <Loader loading={loading} />
                )}

                <TouchableOpacity style={ChangePasswordStyle.changepasswordbtn}
                    onPress={handleChangePassword}
                >
                    <Text style={[ChangePasswordStyle.changepasswordText]}> RESET </Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

export default ChangePassword