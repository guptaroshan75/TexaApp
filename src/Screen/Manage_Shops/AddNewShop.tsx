import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, TextInput, Alert } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AddShopStyle from '../../Css/ManageShopsStyle/AddShopStyle';
import CustomeSelectField from '../../Components/CustomeSelectField';
import CustomeCheckBoxField from '../../Components/CustomeCheckBoxField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/Store';
import { getAllCountry } from '../../Redux/Features/AllCountrySlice';
import { getAllApplication } from '../../Redux/Features/AllApplicationSlice';
import Loader from '../../Components/Loader';
import CustomeMultiImage from '../../Components/CustomeMultiImage';
import axios from 'axios';
import { Api } from '../../BaseUrl/BaseUrl';
import { getAllShop } from '../../Redux/Features/ShopSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddNewShop {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

interface CountryData {
    calling_code: string;
}

interface ApplicationType {
    id: number,
    application_type: string;
    products: { id: number; product_name: string }[];
}

const AddNewShop: React.FC<AddNewShop> = ({ checkVisible, closeModal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [customeCheckOpen, setCustomeCheckOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const [isVisibleCountry, setIsVisibleCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
    const [selectedApplicationType, setSelectedApplicationType] = useState<ApplicationType | null>(null);
    const [selectedAppTypeName, setSelectedAppTypeName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, allCountry } = useSelector((state: RootState) => state.countries);
    const { get_user } = useSelector((state: RootState) => state.user);

    const { applications } = useSelector((state: RootState) => state.allApplications);
    const applicationTypes: ApplicationType[] = applications?.applicationType || [];

    const [Shopname, setShopname] = useState<string>('');
    const [Contactperson, setContactperson] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [Contactnumber, setContactnumber] = useState<string>('');
    const [selectedShopImages, setSelectedShopImages] = useState<string[]>([]);
    const userId = get_user.id
    const usercode = get_user ? get_user.country.calling_code : ''

    const handleCountryPress = () => {
        setIsVisibleCountry(true);
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setIsVisibleCountry(false);
    };

    const handleDelete = (id: number) => {
        const updatedSelectedValues = selectedValues.filter((value) => value !== id);
        setSelectedValues(updatedSelectedValues);
    };

    useEffect(() => {
        dispatch(getAllCountry())
        dispatch(getAllApplication())
    }, [dispatch])

    const handleApplicationTypeSelect = (applicationType: ApplicationType) => {
        setSelectedApplicationType(applicationType);
        setCustomeCheckOpen(true);
        setSelectedAppTypeName(applicationType.application_type)
    };

    const handleAddShop = async () => {
        setLoading(true);
        const formData = new FormData();
        selectedShopImages.forEach((image, index) => {
            formData.append(`images[${index}]`, {
                uri: image,
                type: 'image/jpeg',
                name: `image_${index}.jpg`,
            });
        });

        const products: Record<string, Record<string, number>> = {};

        applicationTypes.forEach((applicationType) => {
            const selectedProducts = applicationType.products.filter((product) =>
                selectedValues.includes(product.id)
            );

            const productObject: Record<string, number> = {};

            selectedProducts.forEach((product, index) => {
                productObject[index] = product.id;
            });

            products[applicationType.id] = productObject;
        });

        for (const key in products) {
            if (Object.prototype.hasOwnProperty.call(products, key)) {
                const innerObject = products[key];
                for (const innerKey in innerObject) {
                    if (Object.prototype.hasOwnProperty.call(innerObject, innerKey)) {
                        const productId = innerObject[innerKey];
                        formData.append(`products[${key}][${innerKey}]`, productId);
                    }
                }
            }
        }

        if (!Contactnumber || Contactnumber.length < 10) {
            Alert.alert('Error', 'Please Enter A Valid Phone Number (At Least 10 Digits)');
            setLoading(false);
            return;
        }

        if (!Shopname || !Contactperson || !email) {
            Alert.alert('Error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            Alert.alert('Error', 'Please Enter a Valid Email Address');
            setLoading(false);
            return;
        }

        const emailDomain = email.split('@')[1];
        if (emailDomain.toLowerCase().indexOf('.com') !== emailDomain.length - 4) {
            setLoading(false);
            return;
        }

        formData.append('user_id', String(userId));
        formData.append('shop_name', Shopname);
        formData.append('shop_contact_person', Contactperson);
        formData.append('email', email);
        formData.append('country_code', selectedCountry ? selectedCountry.calling_code : `${usercode}`);
        formData.append('phone', Contactnumber);

        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(`${Api}/add-shop`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            closeModal()
            dispatch(getAllShop(userId));
            console.log('Add Shop', response.data);
        } catch (error) {
            setLoading(false);
            console.log('Add Shop error:', error);
        }
    };

    const setSelectedImage = (imageURIs: any) => {
        setSelectedShopImages(imageURIs);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...selectedShopImages];
        updatedImages.splice(index, 1);
        setSelectedShopImages(updatedImages);
    };

    return (
        <View style={AddShopStyle.container}>
            <TouchableOpacity style={AddShopStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={AddShopStyle.back} />
                </TouchableOpacity>

                <Text style={AddShopStyle.headerText}> Add New Shop </Text>
            </TouchableOpacity>

            <View style={AddShopStyle.maincontainer}>
                <ScrollView>
                    <CustomTextInput title={'Shop Name'} value={Shopname} placeholder='Shop Name'
                        onChangeText={(Shopname) => setShopname(Shopname)}
                    />
                    <CustomTextInput title={'Contact Person Name'} value={Contactperson} placeholder='Contact Person Name'
                        onChangeText={(Contactperson) => setContactperson(Contactperson)}
                    />
                    <CustomTextInput title={'Shop Email'} value={email} placeholder={"Shop Email"}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <View style={AddShopStyle.inputViewTele}>
                        <Text style={AddShopStyle.nametitle}> Contact Person Number </Text>

                        <View style={{ width: "100%" }}>
                            <TouchableOpacity style={AddShopStyle.country_code} onPress={handleCountryPress}>
                                <Text style={AddShopStyle.phonenumber}>
                                    {selectedCountry ? `+${selectedCountry.calling_code}` : `+${usercode}`}
                                </Text>
                            </TouchableOpacity>

                            <View style={{ flex: 1 }}>
                                <CustomeSelectField isVisibleCode={isVisibleCountry} loading={isLoading}
                                    allCountry={allCountry} setIsVisibleCode={setIsVisibleCountry}
                                    onSelectCountry={handleCountrySelect}
                                    onClose={() => setIsVisibleCountry(false)}
                                />
                            </View>

                            <TextInput style={AddShopStyle.couontry_code_text} value={Contactnumber}
                                placeholder="Contact Person Number" keyboardType="phone-pad" maxLength={10}
                                onChangeText={(Contactnumber) => setContactnumber(Contactnumber)}
                            />
                        </View>
                    </View>

                    <Text style={AddShopStyle.appType}> Application Type </Text>

                    {applicationTypes.length > 0 ? (
                        applicationTypes.map((applicationType, index) => (
                            <View key={index}>
                                <TouchableOpacity style={AddShopStyle.ImageContainer}
                                    onPress={() => handleApplicationTypeSelect(applicationType)}
                                >
                                    <Text style={AddShopStyle.addSeleect}>
                                        {applicationType.application_type}
                                    </Text>
                                    <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                                </TouchableOpacity>

                                <View style={AddShopStyle.selectItem}>
                                    {applicationType.products.map((product: any) => (
                                        selectedValues.includes(product.id) && (
                                            <View key={product.id} style={{ width: "48%" }}>
                                                <View style={AddShopStyle.selectedStyle}>
                                                    <Text style={AddShopStyle.textSelectedStyle}>
                                                        {product.product_name}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handleDelete(product.id)}>
                                                        <AntDesign color="red" name="delete" size={17} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Loader loading={isLoading} />
                    )}

                    <CustomeCheckBoxField customeCheckOpen={customeCheckOpen}
                        setCustomeCheckOpen={setCustomeCheckOpen} setSelectedValues={setSelectedValues}
                        selectedValues={selectedValues} selectedApplicationType={selectedApplicationType}
                        selectedAppTypeName={selectedAppTypeName}
                    />

                    <View style={AddShopStyle.main}>
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Text style={AddShopStyle.addimagecontainer}>Add Shop Images</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomeMultiImage isVisible={isVisible} setIsVisible={setIsVisible}
                        setSelectedImageURI={setSelectedImage}
                    />

                    <View style={AddShopStyle.imgcontainer}>
                        {selectedShopImages.map((imageUri, index) => (
                            <View key={index} style={AddShopStyle.imageshow}>
                                <Image source={{ uri: imageUri }} style={AddShopStyle.selectedimg} />
                                <TouchableOpacity style={AddShopStyle.deleteButton}
                                    onPress={() => handleRemoveImage(index)}
                                >
                                    <AntDesign name={'closecircle'} size={25} color="#00aaf0"
                                        style={AddShopStyle.deleteButton}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {loading && (
                    <Loader loading={loading} />
                )}

                <TouchableOpacity style={AddShopStyle.addtext} onPress={handleAddShop}>
                    <Text style={AddShopStyle.addshoptext}> Add Shop </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddNewShop