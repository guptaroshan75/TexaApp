import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import SignStyle from '../Css/SignStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/Features/AuthSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomeSelectField from '../Components/CustomeSelectField';
import { getAllCountry } from '../Redux/Features/AllCountrySlice';
import { Image_Base_Url } from '../BaseUrl/BaseUrl';
import { RootState } from '../Redux/Store'
import { ThunkDispatch } from '@reduxjs/toolkit';
import { BackHandler } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Loader from '../Components/Loader';

interface SignUp {
    navigation: any
}

interface CountryData {
    id: number | null;
    name: string;
    flag: number;
    code: string;
}

const SignUp: React.FC<SignUp> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [isSelected, setSelection] = useState<boolean>(false);
    const [isVisibleCountry, setIsVisibleCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { allCountry } = useSelector((state: RootState) => state.countries);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        dispatch(getAllCountry())
    }, [dispatch])

    const handleCountryPress = () => {
        setIsVisibleCountry(true);
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setIsVisibleCountry(false);
    };

    const toggleSelection = () => {
        setSelection(!isSelected);
    };

    const backAction = () => {
        Alert.alert('Exit App!', 'Exiting This Application', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const handleSignUp = async () => {
        setLoading(true);
        if (!email || !password || !name) {
            Alert.alert('Error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        if (!isSelected) {
            Alert.alert('Error', 'Please Checked I Agree to the Terms and Condition');
            setLoading(false);
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            Alert.alert('Error', 'Please Enter a Valid Email Address');
            setLoading(false);
            return;
        }

        const userObj = {
            name: name, email: email, password: password,
            country_id: selectedCountry ? selectedCountry.id : null
        }

        try {
            const response: any = await dispatch(registerUser(userObj))
            const msg = response?.payload?.response?.data?.message?.email[0]
            if (msg) {
                Alert.alert('Error', msg);
                setLoading(false);
                return;
            }
            if (response.payload && response.payload.success === true) {
                setLoading(false);
                props.navigation.navigate('Login');
                toast.show("User Created Successfully", {
                    type: 'success'
                });
            }
        } catch (error) {
            setLoading(false);
            console.log('Registration error:', error);
        }
    }

    return (
        <View style={SignStyle.container}>
            <Text style={SignStyle.mainContent}> TEXA </Text>
            <Text style={SignStyle.signup}> SIGN UP HERE </Text>
            <View style={SignStyle.inputView}>
                <TextInput style={SignStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    value={name} placeholder="Enter Your Name"
                    onChangeText={(name) => setName(name)}
                />
                <Entypo name={'users'}
                    size={25} color="#aaa" style={SignStyle.icon}
                />
            </View>

            <View style={SignStyle.inputView}>
                <TextInput style={SignStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    value={email} placeholder="Enter Your Email"
                    onChangeText={(email) => setEmail(email)}
                />
                <MaterialCommunityIcons name={'email-check-outline'}
                    size={25} color="#aaa" style={SignStyle.icon}
                />
            </View>

            <View style={SignStyle.inputView}>
                <TextInput placeholder="Enter Your Password" style={SignStyle.psswordtextinput}
                    autoCapitalize='none' autoCorrect={false}
                    value={password} secureTextEntry={!showPassword}
                    onChangeText={(password) => setPassword(password)}
                />
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'}
                    size={25} color="#aaa" style={SignStyle.icon}
                    onPress={() => setShowPassword(!showPassword)}
                />
            </View>

            <TouchableOpacity onPress={handleCountryPress}>
                <View style={SignStyle.inputViewTele}>
                    {selectedCountry && selectedCountry.flag ? (
                        <Image style={SignStyle.flagImg}
                            source={{ uri: `${Image_Base_Url}/${selectedCountry.flag}` }}
                        />
                    ) : (
                        <Image style={SignStyle.flagImg}
                            source={require('../Images/Indian.png')}
                        />
                    )}
                    {selectedCountry && selectedCountry.name ? (
                        <Text style={SignStyle.inputTextFlg}>
                            {selectedCountry.name}
                        </Text>
                    ) : (
                        <Text style={SignStyle.inputTextFlg}>
                            {'India'}
                        </Text>
                    )}
                    <MaterialIcons name={'arrow-drop-down'}
                        size={25} color="#aaa" style={SignStyle.iconCountry}
                    />
                </View>
            </TouchableOpacity>

            <View style={SignStyle.bottom}>
                <TouchableOpacity onPress={toggleSelection} style={SignStyle.checkboxContainer}>
                    <MaterialCommunityIcons size={24} style={{ marginRight: 5 }}
                        name={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        color={isSelected ? '#39A7FF' : '#000'}
                    />
                    <Text> {isSelected ?
                        'I agree to the Terms and Conditions' : 'I agree to the Terms and Conditions'}
                    </Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <Loader loading={loading} />
            )}

            <TouchableOpacity style={SignStyle.signupBtn} onPress={handleSignUp}>
                <Text style={SignStyle.signupText}> REGISTER NOW </Text>
            </TouchableOpacity>

            <View style={SignStyle.mainor}>
                <TouchableOpacity style={SignStyle.ortextborder}>
                    <Text style={SignStyle.ortext}> or </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <View style={SignStyle.mainsign}>
                    <Text style={SignStyle.member}> Already have an account? </Text>
                    <Text style={SignStyle.sign} onPress={() => props.navigation.navigate("Login")}>
                        Sign IN
                    </Text>
                </View>
            </TouchableOpacity>

            <CustomeSelectField loading={loading} isVisibleCode={isVisibleCountry}
                setIsVisibleCode={setIsVisibleCountry} onSelectCountry={handleCountrySelect}
                onClose={() => setIsVisibleCountry(false)} allCountry={allCountry}
            />
        </View>
    )
}

export default SignUp