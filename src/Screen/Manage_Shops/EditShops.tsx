import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, TextInput, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeSelectField from '../../Components/CustomeSelectField';
import CheckBox from '@react-native-community/checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/Store';
import { getAllCountry } from '../../Redux/Features/AllCountrySlice';
import { getAllApplication } from '../../Redux/Features/AllApplicationSlice';
import Loader from '../../Components/Loader';
import CustomeMultiImage from '../../Components/CustomeMultiImage';
import axios from 'axios';
import EditShopStyle from '../../Css/ManageShopsStyle/EditShopStyle';
import { Api, Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import { editShop, getAllShop } from '../../Redux/Features/ShopSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface EditShops {
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

const EditShops: React.FC<EditShops> = ({ checkVisible, closeModal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState<number[]>([]);
    const [isVisibleCountry, setIsVisibleCountry] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
    const [selectedApplicationType, setSelectedApplicationType] = useState<ApplicationType | null>(null);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, allCountry } = useSelector((state: RootState) => state.countries);
    const { get_user } = useSelector((state: RootState) => state.user);
    const { get_edit_shop } = useSelector((state: RootState) => state.allshops);

    const [Shopname, setShopname] = useState<string>('');
    const [Contactperson, setContactperson] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [Contactnumber, setContactnumber] = useState<string>('');
    const [selectedShopImages, setSelectedShopImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const userId = get_user.id
    const shopId = get_edit_shop.shop.id
    const usercode = get_user ? get_user.country.calling_code : ''
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedProductData, setSelectedProductData] = React.useState<{ [key: string]: string[] }>({});

    const handleModalClose = () => {
        if (isModalVisible) {
            setIsModalVisible(false);
        }
        setSelectedApplicationType(null);
    };

    const handleShopname = () => {
        setShopname(get_edit_shop.shop.shop_name)
    }

    const handleContactpersone = () => {
        setContactperson(get_edit_shop.shop.shop_contact_person)
    }

    const handleEmail = () => {
        setEmail(get_edit_shop.shop.email)
    }

    const handleContactNumber = () => {
        if (get_edit_shop && get_edit_shop.shop && get_edit_shop.shop.phone) {
            const phoneNumber = String(get_edit_shop.shop.phone);
            setContactnumber(phoneNumber);
        }
    }

    const handleCountryPress = () => {
        setIsVisibleCountry(true);
    };

    const handleCountrySelect = (country: any) => {
        setSelectedCountry(country);
        setIsVisibleCountry(false);
    };

    const handleApplicationTypeSelect = (applicationType: ApplicationType) => {
        setSelectedApplicationType(applicationType);
        setIsModalVisible(true);
    };

    const applicationTypes = get_edit_shop.applicationType?.map((type: any) => ({
        label: type.application_type,
        value: type.id.toString(),
        products: type.products.map((product: any) => ({
            label: product.product_name,
            value: product.id.toString(),
        })),
    })) || [];

    useEffect(() => {
        if (get_edit_shop && get_edit_shop.shop_product) {
            const newSelectedProducts: string[] = [];
            const newSelectedProductData: { [key: string]: string[] } = {};

            get_edit_shop.shop_product.forEach((item: any) => {
                const key = Object.keys(item)[0];
                const products = item[key].map((productId: number) => productId.toString());

                newSelectedProducts.push(key);
                newSelectedProductData[key] = products;
            });
            setSelectedProductData(newSelectedProductData);
        }
    }, [get_edit_shop]);

    const handleModalInnerPress = () => {};

    const handleUpdateShop = async () => {
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

        applicationTypes.forEach((applicationType: any) => {
            const selectedProducts = applicationType.products.filter((product: any) =>
                selectedValues.includes(product.id)
            );

            const productObject: Record<string, number> = {};

            selectedProducts.forEach((product: any, index: any) => {
                productObject[index] = product.id;
            });

            products[applicationType.id] = productObject;
        });

        if (selectedProductData) {
            Object.keys(selectedProductData).forEach((key) => {
                const products = selectedProductData[key];
                products.forEach((product, index) => {
                    formData.append(`products[${key}][${index}]`, product);
                });
            });
        }

        formData.append('user_id', userId);
        formData.append('shop_name', Shopname);
        formData.append('shop_contact_person', Contactperson);
        formData.append('email', email);
        formData.append('country_code', selectedCountry ? selectedCountry.calling_code : `${usercode}`);
        formData.append('phone', Contactnumber);
        formData.append('status', 'true');

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/update-shop/${shopId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            closeModal()
            dispatch(getAllShop(userId));
            console.log('Update Shop', response.data);
        } catch (error) {
            setLoading(false);
            console.log('Update Shop error:', error);
        }
    };

    const setSelectedImage = (imageURIs: string[]) => {
        setSelectedShopImages(imageURIs);
    };

    const handlEditShopImage = async (imageId: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('No');
                    },
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        { isLoading ? (<Loader loading={isLoading} />) : null }
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            try {
                                await axios.delete(`${Api}/delete-shop-image/${imageId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                dispatch(editShop(shopId))
                            } catch (error) {
                                console.log('Delete image error:', error);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...selectedShopImages];
        updatedImages.splice(index, 1);
        setSelectedShopImages(updatedImages);
    };

    useEffect(() => {
        dispatch(getAllCountry())
        dispatch(getAllApplication())
        handleShopname()
        handleContactpersone()
        handleEmail()
        handleContactNumber()
    }, [dispatch, shopId]);

    const handleCheckboxChange = (productId: any, applicationTypeId: any) => {
        setSelectedProductData((prevSelectedData) => {
            const updatedData = { ...prevSelectedData };

            if (!updatedData[applicationTypeId]) {
                updatedData[applicationTypeId] = [productId];
            } else {
                const index = updatedData[applicationTypeId].indexOf(productId);
                if (index === -1) {
                    updatedData[applicationTypeId].push(productId);
                } else {
                    updatedData[applicationTypeId].splice(index, 1);
                }
            }

            return updatedData;
        });
    };

    const handleDelete = (applicationTypeId: any, productId: any) => {
        setSelectedProductData((prevSelectedData) => {
            const updatedData = { ...prevSelectedData };
            const index = updatedData[applicationTypeId].indexOf(productId);
            if (index !== -1) {
                updatedData[applicationTypeId].splice(index, 1);
            }
            return updatedData;
        });
    };

    return (
        <View style={EditShopStyle.container}>
            <TouchableOpacity style={EditShopStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={EditShopStyle.back} />
                </TouchableOpacity>

                <Text style={EditShopStyle.headerText}> Edit Shop </Text>
            </TouchableOpacity>

            <View style={EditShopStyle.maincontainer}>
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

                    <View style={EditShopStyle.inputViewTele}>
                        <Text style={EditShopStyle.nametitle}> Contact Person Number </Text>

                        <View style={{ width: "100%" }}>
                            <TouchableOpacity style={EditShopStyle.country_code} onPress={handleCountryPress}>
                                <Text style={EditShopStyle.phonenumber}>
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

                            <TextInput style={EditShopStyle.couontry_code_text} value={Contactnumber}
                                placeholder="Contact Person Number" keyboardType="phone-pad" maxLength={10}
                                onChangeText={(Contactnumber) => setContactnumber(Contactnumber)}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={EditShopStyle.appType}> Application Type </Text>

                        {applicationTypes.length > 0 ? (
                            applicationTypes.map((applicationType: any, index) => (
                                <View key={index}>
                                    <TouchableOpacity style={EditShopStyle.ImageContainer}
                                        onPress={() => handleApplicationTypeSelect(applicationType.value)}
                                    >
                                        <Text style={EditShopStyle.addSeleect}>
                                            {applicationType.label}
                                        </Text>
                                        <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                                    </TouchableOpacity>

                                    <Modal animationType='slide' transparent={true}
                                        visible={isModalVisible && selectedApplicationType === applicationType.value}
                                        style={{ width: '90%', marginBottom: 0, marginLeft: responsiveHeight(2.4) }}

                                    >
                                        <TouchableWithoutFeedback onPress={handleModalClose}>
                                            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                                <TouchableWithoutFeedback onPress={handleModalInnerPress}>
                                                    <View style={EditShopStyle.modelContainer}>
                                                        <Text style={EditShopStyle.mainName}> {applicationType.label} </Text>

                                                        <TextInput style={EditShopStyle.inputTextmodel} autoCapitalize='none'
                                                            autoCorrect={false} placeholder="Search Products"
                                                            value={searchTerm} onChangeText={(text) => setSearchTerm(text)}
                                                        />

                                                        <ScrollView style={{ maxHeight: 300 }}>
                                                            {selectedApplicationType && (
                                                                <ScrollView>
                                                                    <View style={EditShopStyle.modelContainertext}>
                                                                        {applicationType.products.filter((produts: any) =>
                                                                            produts.label.toLowerCase().includes(searchTerm.toLowerCase())
                                                                        ).map((product: any, index: any) => (
                                                                            <View style={{ width: '48%' }} key={index}>
                                                                                <TouchableOpacity style={EditShopStyle.checkboxWrapper}
                                                                                    onPress={() => handleCheckboxChange(product.value, applicationType.value)}
                                                                                >
                                                                                    <View style={EditShopStyle.mainCheckBox}>
                                                                                        <CheckBox
                                                                                            value={selectedProductData[applicationType.value]?.includes(product.value)}
                                                                                            onValueChange={() => handleCheckboxChange(product.value, applicationType.value)}
                                                                                        />
                                                                                    </View>
                                                                                    <Text style={EditShopStyle.selectItem}>{product.label}</Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        ))}
                                                                    </View>
                                                                </ScrollView>
                                                            )}
                                                        </ScrollView>

                                                        <View style={EditShopStyle.okBtn}>
                                                            <TouchableOpacity onPress={handleModalClose}>
                                                                <Text style={[EditShopStyle.okText]}>
                                                                    OK
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Modal>

                                    {selectedProductData[applicationType.value]?.length > 0 && (
                                        <View style={EditShopStyle.selectItem}>
                                            {selectedProductData[applicationType.value].map((productId) => {
                                                const product = applicationType.products.find((selectProduct: any) =>
                                                    selectProduct.value === productId
                                                );
                                                return (
                                                    <View key={product.id} style={{ width: "48%" }}>
                                                        <View style={EditShopStyle.selectedStyle}>
                                                            <Text style={EditShopStyle.textSelectedStyle}>
                                                                {product.label}
                                                            </Text>
                                                            <TouchableOpacity onPress={() => handleDelete(applicationType.value, productId)}>
                                                                <AntDesign color="red" name="delete" size={17} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            ))) : (
                            <Loader loading={isLoading} />
                        )}
                    </View>

                    <View style={EditShopStyle.main}>
                        <TouchableOpacity onPress={() => setIsVisible(true)}>
                            <Text style={EditShopStyle.addimagecontainer}>Add Shop Images</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomeMultiImage isVisible={isVisible} setIsVisible={setIsVisible}
                        setSelectedImageURI={setSelectedImage}
                    />

                    <View style={EditShopStyle.imgcontainer}>
                        {selectedShopImages.map((imageUri, index) => (
                            <View key={index} style={EditShopStyle.imageshow}>
                                <Image source={{ uri: `${imageUri}` }} style={EditShopStyle.selectedimg} />
                                <TouchableOpacity style={EditShopStyle.deleteButton}
                                    onPress={() => handleRemoveImage(index)}
                                >
                                    <AntDesign name={'closecircle'} size={18} color="#00aaf0" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {get_edit_shop.image.map((imageUri: any, index: any) => (
                            <View key={index} style={EditShopStyle.imageshow}>
                                <Image source={{ uri: `${Shop_Base_Url}/${imageUri.image}` }}
                                    style={EditShopStyle.selectedimg}
                                />
                                <TouchableOpacity style={EditShopStyle.deleteButton}
                                    onPress={() => handlEditShopImage(imageUri.id)}
                                >
                                    <AntDesign name={'closecircle'} size={18} color="#00aaf0" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity style={EditShopStyle.addtext} onPress={handleUpdateShop}>
                    <Text style={EditShopStyle.addshoptext}> Update Shop </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditShops;