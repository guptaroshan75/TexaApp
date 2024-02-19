import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, Alert, BackHandler } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native';
import ShopsStyle from '../../Css/ManageShopsStyle/ShopsStyle';
import { Modal } from 'react-native';
import AddNewShop from './AddNewShop';
import { getUsers } from '../../Redux/Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import EditShops from './EditShops';
import { CardBase } from '@rneui/base/dist/Card/Card';
import CustomeTextLable from '../../Components/CustomeTextLable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewShops from './ViewShops';
import { deleteShop, editShop, getAllShop, viewSingleShop } from '../../Redux/Features/ShopSlice';
import { ScrollView } from 'react-native';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';

interface Shops {
    navigation: any
}

interface Shop { }

const Shops: React.FC<Shops> = (props) => {
    const [editAble, setEditAble] = useState(false);
    const [viewAble, setViewAble] = useState(false);
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [filteredShop, setFilteredShop] = useState<Shop[]>([]);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_all_Shop } = useSelector((state: RootState) => state.allshops);
    const userId = get_user ? get_user.id : '';

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAllShop(userId))
    }, [dispatch, userId])

    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
        setEditAble(item)
        setViewAble(item)
    }

    const handleViewShop = (shopId: number) => {
        dispatch(viewSingleShop(shopId));
        setViewAble(true);
    };

    const handleEditShop = (shopId: string) => {
        dispatch(editShop(shopId));
        setEditAble(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        setFilteredShop(get_all_Shop);
    }, [get_all_Shop]);

    const filterShops = (searchTerm: any) => {
        if (!searchTerm) {
            setFilteredShop(get_all_Shop);
        } else {
            const filtered: any = get_all_Shop.filter(
                (shop) =>
                    shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    shop.shop_contact_person.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredShop(filtered);
        }
    };

    const handleDelete = (shopId: number) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this record?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => {
                        console.log('No Pressed');
                    }
                },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            await dispatch(deleteShop(shopId))
                            await dispatch(getAllShop(userId))
                            setFilteredShop(get_all_Shop);
                        } catch (error) {
                            console.error('Error deleting equipment:', error);
                        };
                    }
                }
            ]
        )
    }

    const backAction = () => {
        props.navigation.goBack();
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
            <View style={ShopsStyle.headder}>
                <View style={ShopsStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../../Images/menu.png')} style={ShopsStyle.toggle} />
                    </TouchableOpacity>

                    <Text style={ShopsStyle.headerText}> Manage Shops </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={ShopsStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={ShopsStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TextInput style={ShopsStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    value={search} placeholder="Search By Shop Name or Contact Person"
                    onChangeText={(search) => {
                        setSearch(search);
                        filterShops(search);
                    }}
                />
            </View>

            <TouchableOpacity style={ShopsStyle.addShop} onPress={() => setIsVisible(true)}>
                <FontAwesome6 name={'plus'} size={16} color="#fff" />
                <Text style={[ShopsStyle.addText]}> Add New Shop </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false}
                visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
            >
                <AddNewShop closeModal={closeModal} checkVisible={checkVisible} />
            </Modal>

            {filteredShop.length === 0 ? (
                <Text style={ShopsStyle.shopData}> No Shop Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {filteredShop.map((shop: any, index) => (
                        <CardBase key={index}>
                            <Text style={ShopsStyle.shoptitle}> Shops Details </Text>
                            <CustomeTextLable lable={'Shop Name :'} value={shop.shop_name} />
                            <CustomeTextLable lable={'Contact Person :'} value={shop.shop_contact_person} />
                            <CustomeTextLable lable={'Email :'} value={shop.email} />
                            <CustomeTextLable lable={'Phone Number :'}
                                value={`(+${shop.country_code}) ${shop.phone}`}
                            />
                            <Text style={ShopsStyle.border}> </Text>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <TouchableOpacity style={ShopsStyle.statusButton}>
                                        <AntDesign name={'check'} size={15} color="white" />
                                    </TouchableOpacity>
                                    <Text style={ShopsStyle.statusText}> Active </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => handleEditShop(shop.id)}>
                                        <Image style={ShopsStyle.buttonStatus}
                                            source={require('../../Images/edit.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleDelete(shop.id)}>
                                        <Image style={ShopsStyle.buttonStatus}
                                            source={require('../../Images/delete.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleViewShop(shop.id)}>
                                        <Image style={ShopsStyle.buttonStatus}
                                            source={require('../../Images/eye.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardBase>
                    ))}
                </ScrollView>
            )}

            <Modal animationType="slide" transparent={false}
                visible={editAble} onRequestClose={() => { setEditAble(false) }}
            >
                <EditShops closeModal={() => setEditAble(false)}
                    checkVisible={(item: any) => setEditAble(item)}
                />
            </Modal>

            <Modal animationType="slide" transparent={false}
                visible={viewAble} onRequestClose={() => { setViewAble(false) }}
            >
                <ViewShops checkVisible={checkVisible} isLoading={isLoading} />
            </Modal>
        </>
    )
}

export default Shops