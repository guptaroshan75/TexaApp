import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, ScrollView, Alert, BackHandler } from 'react-native'
import { TouchableOpacity } from 'react-native';
import ProfileStyle from '../Css/ProfileStyle';
import CustomeSelectField from '../Components/CustomeSelectField';
import CustomeImage from '../Components/CustomeImage';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../Redux/Store';
import { getAllCountry } from '../Redux/Features/AllCountrySlice';
import { Api, Image_Base_Url, Shop_Base_Url } from '../BaseUrl/BaseUrl';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUsers } from '../Redux/Features/UserSlice';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../Components/Loader';

interface Profile {
    navigation: any,
}

interface CountryData {
    name: string;
    flag: string;
    calling_code: string;
    id: ''
}

const Profile: React.FC<Profile> = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleCountry, setIsVisibleCountry] = useState(false);
    const [isVisibleTelecode, setIsVisibleTelecode] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
    // const [selectedTelecode, setSelectedTelecode] = useState<CountryData | null>(null);

    const toast = useToast();
    const [profileImage, setProfileImage] = useState<string>('');

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [countryCode, setCountryCode] = useState<string>('')
    const [countryName, setCountryName] = useState<string>('')
    const [countryImage, setCountryImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, allCountry } = useSelector((state: RootState) => state.countries);
    const { get_user } = useSelector((state: RootState) => state.user);
    const userId = get_user ? get_user.id : '';

    const usercode = get_user ? get_user.country.calling_code : ''
    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';
    const fetchImage = get_user ? get_user.profile_photo_path : ''

    const handleProfileImage = (imageURI: string) => {
        setProfileImage(imageURI);
        setIsVisible(false);
    };

    const handleName = () => {
        setName(get_user?.name)
    }

    const handleEmail = () => {
        setEmail(get_user?.email)
    }

    const handlePhoneNumber = () => {
        if (get_user && get_user.phone) {
            const phoneNumber = String(get_user.phone);
            setPhone(phoneNumber);
        }
    }

    const handleCountryCode = () => {
        setCountryCode(get_user.calling_code)
    }

    const handleCountryName = () => {
        setCountryName(get_user.country.name)
    }

    const handleCountryImage = () => {
        setCountryImage(get_user.country.flag)
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

    useEffect(() => {
        handleName()
        handleCountryImage()
        handleEmail()
        handlePhoneNumber()
        handleCountryCode()
        handleCountryName()
        dispatch(getAllCountry())
    }, [dispatch, get_user, userId])

    const handleCountryPress = () => {
        setIsVisibleCountry(true);
        setIsVisibleTelecode(false);
    };

    const handleTelecodePress = () => {
        setIsVisibleTelecode(true);
        setIsVisibleCountry(false);
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setIsVisibleCountry(false);
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        if (!phone || phone.length < 10) {
            Alert.alert('Error', 'Please Enter A Valid Phone Number (At Least 10 Digits)');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('country_id', selectedCountry ? selectedCountry.id : get_user.country.id);
        // formData.append('calling_code', selectedTelecode ? selectedTelecode.calling_code :
        //     countryCode ? `+${countryCode}` : `+${usercode}`
        // );
        formData.append('calling_code', selectedCountry ? selectedCountry.calling_code :
            countryCode ? `+${countryCode}` : `+${usercode}`
        );

        if (profileImage) {
            formData.append('image', {
                uri: profileImage,
                type: 'image/jpeg',
                name: 'image.jpg',
            })
        }
        // else {
        //     formData.append('image', {
        //         uri: userImage,
        //         type: 'image/jpeg',
        //         name: 'image.jpg',
        //     });
        // }
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/user_update/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(getUsers());
            setLoading(false);
            toast.show("Profile Update Successfully", {
                type: 'success'
            });
            console.log('Update Profile', response.data);
        } catch (error) {
            setLoading(false);
            console.log('Update Profile error:', error);
        }
    };

    return (
        <ScrollView>
            <TouchableOpacity style={ProfileStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Image source={require('../Images/back.png')} style={ProfileStyle.back} />
                </TouchableOpacity>

                <Text style={ProfileStyle.headerText}> Complete Your Profile </Text>
            </TouchableOpacity>

            <View style={ProfileStyle.main}>
                <TouchableOpacity style={ProfileStyle.profile} onPress={() => setIsVisible(true)}>
                    {profileImage || fetchImage ? (
                        <Image style={ProfileStyle.profileLogo}
                            source={profileImage ? { uri: profileImage } :
                                { uri: `${Shop_Base_Url}/${fetchImage}` }
                            }
                        />
                    ) : (
                        <Image style={ProfileStyle.profileLogo}
                            source={{ uri: userImage }}
                        />
                    )}
                    <Text style={ProfileStyle.editProfile}> Edit Profile </Text>
                </TouchableOpacity>
            </View>

            <CustomeImage isVisible={isVisible} setIsVisible={setIsVisible}
                setSelectedImageURI={handleProfileImage}
            />

            <View style={ProfileStyle.inputView}>
                <TextInput style={ProfileStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    value={name} onChangeText={(name) => setName(name)}
                />

                <TextInput style={ProfileStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    value={email} editable={false} onChangeText={(email) => setEmail(email)}
                />

                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={ProfileStyle.countrydropdown}
                        onPress={handleCountryPress}
                    >
                        <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                            {selectedCountry && selectedCountry.flag ? (
                                <Image source={{ uri: `${Image_Base_Url}/${selectedCountry.flag}` }}
                                    style={ProfileStyle.flagimg}
                                />
                            ) : (
                                <Image source={{ uri: `${Image_Base_Url}/${countryImage}` }}
                                    style={ProfileStyle.flagimg}
                                />
                            )}
                            <Text style={ProfileStyle.dropdownText}>
                                {selectedCountry ? selectedCountry.name : `${countryName}`}
                            </Text>
                        </View>

                        <FontAwesome5 name="caret-down" size={responsiveFontSize(2)}
                            color="black" style={ProfileStyle.dropdownIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{ width: "100%" }}>
                    <TouchableOpacity style={ProfileStyle.country_code} onPress={handleTelecodePress}>
                        <Text style={ProfileStyle.phonenumber}>
                            {selectedCountry ? `+${selectedCountry.calling_code}` :
                                countryCode ? `+${countryCode}` : `+${usercode}`}
                        </Text>
                        {/* <Text style={ProfileStyle.phonenumber}>
                            {selectedTelecode ? `+${selectedTelecode.calling_code}` :
                                countryCode ? `+${countryCode}` : `+${usercode}`}
                        </Text> */}
                    </TouchableOpacity>

                    {/* <View style={{ flex: 1 }}>
                        <CustomeSelectField isVisibleCode={isVisibleTelecode} allCountry={allCountry}
                            setIsVisibleCode={setIsVisibleTelecode} onSelectCountry={handleTelecodeSelect}
                            onClose={() => setIsVisibleTelecode(false)} loading={isLoading}
                        />
                    </View> */}

                    <TextInput style={ProfileStyle.couontry_code_text} value={phone?.toString()}
                        placeholder="Enter Phone Number" keyboardType="phone-pad" maxLength={10}
                        onChangeText={(phone) => setPhone(phone)}
                    />
                </View>

                <CustomeSelectField isVisibleCode={isVisibleCountry} allCountry={allCountry}
                    setIsVisibleCode={setIsVisibleCountry} onSelectCountry={handleCountrySelect}
                    onClose={() => setIsVisibleCountry(false)} loading={isLoading}
                />
            </View>

            {loading && (
                <Loader loading={loading} />
            )}

            <TouchableOpacity style={ProfileStyle.addProfile} onPress={handleUpdateProfile}>
                <Text style={[ProfileStyle.addText]}> Update Profile </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Profile