import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AgreeCheckBox from './AgreeCheckBox';
import LoginStyle from '../Css/LoginStyle';
import { loginUser } from '../Redux/Features/AuthSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThunkDispatch } from '@reduxjs/toolkit';
import Loader from '../Components/Loader';
import { useToast } from 'react-native-toast-notifications';

interface login {
    navigation: any
}

const Login: React.FC<login> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const toast = useToast();

    useEffect(() => {
        retrieveCredentials();
    }, []);

    const retrieveCredentials = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('storedEmail');
            const storedPassword = await AsyncStorage.getItem('storedPassword');

            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPassword(storedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            console.error('Error retrieving stored credentials:', error);
        }
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        if (rememberMe) {
            try {
                await AsyncStorage.setItem('storedEmail', email);
                await AsyncStorage.setItem('storedPassword', password);
                setLoading(false);
            } catch (error) {
                console.error('Error storing credentials:', error);
            }
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            Alert.alert('Error', 'Please Enter a Valid Email Address');
            setLoading(false);
            return;
        }

        const userObj = {
            email: email, password: password,
        }

        try {
            const response: any = await dispatch(loginUser(userObj))
            console.log(response.payload);
            setLoading(true);
            if (response.payload && response?.payload?.response?.data?.success === false) {
                Alert.alert('Error', 'Incorrect email or password. Please try again.');
                setLoading(false);
                return;
            }
            if (response.payload && response?.payload?.success === true) {
                const { token } = response.payload.data
                await AsyncStorage.setItem('token', token);
                setLoading(false);
                props.navigation.navigate('DrawerNavigator', { screen: 'Home' });
                toast.show("Login Successfully", {
                    type: 'success'
                });
            }
        } catch (error) {
            console.log('Login error:', error);
        }
    }

    return (
        <>
            <View style={LoginStyle.container}>
                <ScrollView>
                    <Text style={LoginStyle.mainContent}> TEXA </Text>
                    <Text style={LoginStyle.login}> LOGIN HERE </Text>
                    <View style={LoginStyle.inputView}>
                        <TextInput style={LoginStyle.inputText} autoCapitalize='none' autoCorrect={false}
                            value={email} placeholder="Enter Your Email"
                            onChangeText={(email) => setEmail(email)}
                        />
                        <MaterialCommunityIcons name={'email-check-outline'}
                            size={25} color="#aaa" style={LoginStyle.icon}
                        />
                    </View>

                    <View style={LoginStyle.inputView}>
                        <TextInput placeholder="Enter Your Password" style={LoginStyle.psswordtextinput}
                            autoCapitalize='none' autoCorrect={false}
                            value={password} secureTextEntry={!showPassword}
                            onChangeText={(password) => setPassword(password)}
                        />
                        <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'}
                            size={25} color="#aaa" style={LoginStyle.icon}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </View>

                    <View style={LoginStyle.bottom}>
                        <AgreeCheckBox setRememberMe={setRememberMe} rememberMe={rememberMe} />
                        <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
                            <Text style={LoginStyle.forget}>
                                Forget Password ?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {loading && (
                        <Loader loading={loading} />
                    )}

                    <TouchableOpacity style={LoginStyle.loginBtn}>
                        <Text style={[LoginStyle.loginText]} onPress={handleSignIn}> LOGIN HERE </Text>
                    </TouchableOpacity>


                    <View style={LoginStyle.mainor}>
                        <TouchableOpacity style={LoginStyle.ortextborder} >
                            <Text style={LoginStyle.ortext}> or </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
                        <View style={LoginStyle.mainsign}>
                            <Text style={LoginStyle.member}> Not a member? </Text>
                            <Text style={LoginStyle.sign}> Sign UP </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
};

export default Login;

