import { View, TouchableOpacity, Text, ScrollView, Image, TextInput, Alert } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeImage from '../../Components/CustomeImage';
import CustomeModelOfData from '../../Components/CustomeModelOfData';
import React, { useEffect, useState } from 'react';
import AddRaiseAQueryStyle from '../../Css/RaiseAQueryStyle/AddRaiseAQueryStyle';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { getAlldata } from '../../Redux/Features/EquipmentsSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getAllApplicationTypeQuery, getAllQuery } from '../../Redux/Features/RaiseQuerySlice';
import { getAllApplicationTypeQueryProduct } from '../../Redux/Features/RaiseQuerySlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAllApplication } from '../../Redux/Features/AllApplicationSlice';
import QueryProductModel from '../../Components/QueryProductModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Api } from '../../BaseUrl/BaseUrl';

interface AddRaiseAQuery {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

const AddRaiseAQuery: React.FC<AddRaiseAQuery> = ({ checkVisible, closeModal }) => {
    const [isQueryModelOpen, setIsQueryModelOpen] = useState(false);

    const [selectedShopId, setSelectedShopId] = useState('');
    const [selectedAppId, setSelectedAppId] = useState('');
    const [selectedApplicationType, setSelectedApplicationType] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [prevSelectedAppId, setPrevSelectedAppId] = useState('');

    const [query_title, setQueryTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [addFirstLable, setAddFirstLable] = useState<string>('');
    const [addSecondLable, setaddSecondLable] = useState<string>('');
    const [firstLableVisible, setFirstLableVisible] = useState(false);
    const [secondLableVisible, setSecondLableVisible] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_all_data } = useSelector((state: RootState) => state.equipments);
    const { applicationsQuery, applicationsQueryProduct } = useSelector((state: RootState) => state.query);
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const userId = get_user ? get_user.id : '';
    const countryId = get_user ? get_user?.country_id : '';

    const ApplicationType = applicationsQuery?.data.map((item: any) =>
        ({ id: item.id, name: item.application_type }))
    const shopData = get_all_data?.shop.map((item: any) => ({ id: item.id, name: item.shop_name }))
    const applicationProduct = applicationsQueryProduct?.data

    const handleApplicationTypeSelect = (id: any, name: string) => {
        setSelectedApplicationType(name);

        if (id !== selectedAppId) {
            setSelectedProducts([]);
            setSelectedAppId(id);
            setIsQueryModelOpen(true);
        } else {
            setIsQueryModelOpen(!isQueryModelOpen);
        }
    };

    const handleProductSelect = (products: never[]) => {
        setSelectedProducts(products);
    };

    const handleDelete = (id: number) => {
        const updatedSelectedValues = selectedProducts.filter((value: any) => value !== id);
        setSelectedProducts(updatedSelectedValues);
    };

    useEffect(() => {
        dispatch(getAlldata(userId))
        if (selectedAppId !== prevSelectedAppId) {
            setPrevSelectedAppId(selectedAppId);
            dispatch(getAllApplicationTypeQueryProduct({ selectedShopId, selectedAppId }));
        }
        dispatch(getAllApplication())
        dispatch(getAllApplicationTypeQuery(selectedShopId))
    }, [dispatch, selectedShopId, selectedAppId, prevSelectedAppId])

    const handleApplicationType = () => {
        Alert.alert(
            'Error',
            'Please Select Shop Name',
            [
                {
                    text: 'CANCEL',
                    onPress: () => {
                        console.log('No Pressed');
                    }
                },
                {
                    text: 'OK',
                }
            ]
        )
    }

    // Front Image Handlers
    const handleAddFrontImage = (imageURI: string) => {
        setAddFirstLable(imageURI);
        setFirstLableVisible(false);
    };

    const handleCancelFrontImage = () => {
        setAddFirstLable('');
    };

    // Back Image Handlers
    const handleAddBackImage = (imageURI: string) => {
        setaddSecondLable(imageURI);
        setSecondLableVisible(false);
    };

    const handleCancelBackImage = () => {
        setaddSecondLable('');
    };

    const handleAddQuery = async () => {
        if (!query_title || !description || !selectedShopId || !selectedAppId) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const actualProductNames = selectedProducts.map(productId => {
            const selectedProduct = applicationProduct.find((product: any) => product.id === productId);
            return selectedProduct ? selectedProduct.product_name : '';
        });

        const productNames: Record<string, string> = {};
        actualProductNames.forEach((productName, index) => {
            productNames[index.toString()] = productName;
        });

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('shop_id', selectedShopId);
        formData.append('country_id', countryId);
        formData.append('query_title', query_title);
        formData.append('description', description);

        Object.entries(productNames).forEach(([key, value]) => {
            formData.append(`product_name[${key}]`, value);
        });

        if (addFirstLable) {
            formData.append('front_image', {
                uri: addFirstLable,
                type: 'image/jpeg',
                name: 'front_image.jpg',
            });
        }

        if (addSecondLable) {
            formData.append('back_image', {
                uri: addSecondLable,
                type: 'image/jpeg',
                name: 'back_image.jpg',
            });
        }

        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(`${Api}/query`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllQuery(userId))
            console.log('Add Raise A Query', response.data);
        } catch (error) {
            console.log('Add Raise A Query error:', error);
        }
    };

    return (
        <View style={AddRaiseAQueryStyle.container}>
            <TouchableOpacity style={AddRaiseAQueryStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')}
                        style={AddRaiseAQueryStyle.back}
                    />
                </TouchableOpacity>

                <Text style={AddRaiseAQueryStyle.headerText}> Raise a Query </Text>
            </TouchableOpacity>

            <View style={AddRaiseAQueryStyle.maincontainer}>
                <ScrollView>
                    <CustomeModelOfData lable={'Shop name'} responses={shopData} loading={isLoading}
                        placeholder={'Select Shop Name'} setSelectedValue={setSelectedShopId}
                    />

                    {selectedShopId ? (
                        <CustomeModelOfData lable={'Application Type'} loading={isLoading}
                            placeholder={'Select Application Type'} responses={ApplicationType}
                            setSelectedValue={handleApplicationTypeSelect}
                        />
                    ) : (
                        <View style={AddRaiseAQueryStyle.inputView}>
                            <Text style={AddRaiseAQueryStyle.textinputlabel}> Application Type </Text>
                            <TouchableOpacity style={AddRaiseAQueryStyle.textFieldIconOfCus}
                                onPress={handleApplicationType}
                            >
                                <Text> Select Application Type </Text>
                                <MaterialIcons name={'arrow-drop-down'}
                                    size={25} color="#aaa" style={AddRaiseAQueryStyle.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    {selectedApplicationType ? (
                        <QueryProductModel loading={isLoading} response={applicationProduct}
                            isVisible={isQueryModelOpen} setIsVisible={setIsQueryModelOpen}
                            handleProductSelect={handleProductSelect} selectedProducts={selectedProducts}
                        />
                    ) : null}

                    <View style={AddRaiseAQueryStyle.selectItem}>
                        {applicationProduct.map((product: any) => (
                            selectedProducts.includes(product.id) && (
                                <View key={product.id} style={{ width: "48%" }}>
                                    <View style={AddRaiseAQueryStyle.selectedStyle}>
                                        <Text style={AddRaiseAQueryStyle.textSelectedStyle}>
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

                    <CustomTextInput title={'Query Title'} value={query_title} placeholder={"Brand Name"}
                        onChangeText={(query_title) => setQueryTitle(query_title)}
                    />

                    <TextInput style={AddRaiseAQueryStyle.inputText} autoCapitalize='none'
                        autoCorrect={false} value={description} placeholder={'Describe Your Query'}
                        onChangeText={(description) => setDescription(description)}
                    />

                    <View style={AddRaiseAQueryStyle.main}>
                        <TouchableOpacity style={AddRaiseAQueryStyle.ImageContainer}
                            onPress={() => setFirstLableVisible(true)}
                        >
                            <Text style={AddRaiseAQueryStyle.addimagecontainer}>
                                Add Lable Image 1
                            </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addFirstLable ? (
                            <View style={AddRaiseAQueryStyle.imgcontainer}>
                                <View style={AddRaiseAQueryStyle.imageshow}>
                                    <Image source={{ uri: addFirstLable }}
                                        style={AddRaiseAQueryStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddRaiseAQueryStyle.deleteButton}
                                        onPress={() => { handleCancelFrontImage() }}
                                    >
                                        <Text style={AddRaiseAQueryStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={firstLableVisible} setIsVisible={setFirstLableVisible}
                            setSelectedImageURI={handleAddFrontImage}
                        />
                    </View>

                    <View style={AddRaiseAQueryStyle.bottomimage}>
                        <TouchableOpacity style={AddRaiseAQueryStyle.ImageContainer}
                            onPress={() => setSecondLableVisible(true)}
                        >
                            <Text style={AddRaiseAQueryStyle.addimagecontainer}>
                                Add Lable Image 2
                            </Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addSecondLable ? (
                            <View style={AddRaiseAQueryStyle.imgcontainer}>
                                <View style={AddRaiseAQueryStyle.imageshow}>
                                    <Image source={{ uri: addSecondLable }}
                                        style={AddRaiseAQueryStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddRaiseAQueryStyle.deleteButton}
                                        onPress={() => { handleCancelBackImage() }}
                                    >
                                        <Text style={AddRaiseAQueryStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={secondLableVisible} setIsVisible={setSecondLableVisible}
                            setSelectedImageURI={handleAddBackImage}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity style={AddRaiseAQueryStyle.addtext}
                    onPress={handleAddQuery}
                >
                    <Text style={AddRaiseAQueryStyle.addQuerytext}> Submit Query </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddRaiseAQuery;