import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, Modal, ScrollView, Alert, BackHandler } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native';
import ManageEquipmentStyle from '../../Css/ManageEquipmentStyle/ManageEquipmentStyle';
import AddEquipments from './AddEquipments';
import { getUsers } from '../../Redux/Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { deleteEquipment, editEquipment, getAllEquipmentdata } from '../../Redux/Features/EquipmentsSlice';
import { viewSingleEquipment } from '../../Redux/Features/EquipmentsSlice';
import { CardBase } from '@rneui/base/dist/Card/Card';
import CustomeTextLable from '../../Components/CustomeTextLable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditEquipments from './EditEquipments';
import ViewEquipments from './ViewEquipments';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import Loader from '../../Components/Loader';

interface ManageEquipments {
    navigation: any
}

interface Equipment { }

const ManageEquipments: React.FC<ManageEquipments> = (props) => {
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [editAble, setEditAble] = useState(false);
    const [viewAble, setViewAble] = useState(false);
    const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_all_Equipment } = useSelector((state: RootState) => state.equipments);
    const userId = get_user ? get_user.id : '';

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAllEquipmentdata(userId))
    }, [dispatch, userId])

    useEffect(() => {
        setFilteredEquipments(get_all_Equipment);
    }, [get_all_Equipment]);

    const filterEquipments = (searchTerm: any) => {
        if (!searchTerm) {
            setFilteredEquipments(get_all_Equipment);
        } else {
            const filtered: any = get_all_Equipment.filter(
                (equipment) =>
                    equipment.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    equipment.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    equipment.machine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    equipment.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    equipment.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredEquipments(filtered);
        }
    };

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
        setEditAble(item)
        setViewAble(item)
    }

    const closeModal = () => {
        setIsVisible(false);
    };

    const handleViewEquipment = (equipmentId: number) => {
        dispatch(viewSingleEquipment(equipmentId));
        setViewAble(true);
    };

    const handleEditEquipment = (equipmentId: number) => {
        dispatch(editEquipment(equipmentId));
        setEditAble(true);
    };

    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

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

    const handleDelete = (equipmentId: number) => {
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
                            await dispatch(deleteEquipment(equipmentId));
                            await dispatch(getAllEquipmentdata(userId));
                            setFilteredEquipments(get_all_Equipment);
                        } catch (error) {
                            console.error('Error deleting equipment:', error);
                        };
                    }
                }
            ]
        )
    }

    return (
        <>
            <View style={ManageEquipmentStyle.headder}>
                <View style={ManageEquipmentStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../../Images/menu.png')}
                            style={ManageEquipmentStyle.toggle}
                        />
                    </TouchableOpacity>

                    <Text style={ManageEquipmentStyle.headerText}> Manage Equipment </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={ManageEquipmentStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={ManageEquipmentStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TextInput style={ManageEquipmentStyle.inputText} autoCapitalize='none'
                    value={search} placeholder="Search By Model Name" autoCorrect={false}
                    onChangeText={(search) => {
                        setSearch(search);
                        filterEquipments(search);
                    }}
                />
            </View>

            <TouchableOpacity style={ManageEquipmentStyle.addShop} onPress={() => setIsVisible(true)}>
                <FontAwesome6 name={'plus'} size={16} color="#fff" />
                <Text style={[ManageEquipmentStyle.addText]}> Add New Equipment </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false}
                visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
            >
                <AddEquipments closeModal={closeModal} checkVisible={checkVisible} />
            </Modal>

            <Loader loading={isLoading} />

            {filteredEquipments.length === 0 ? (
                <Text style={ManageEquipmentStyle.equipmentData}> No Equipments Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {filteredEquipments.map((equipment: any, index) => (
                        <CardBase key={index}>
                            <Text style={ManageEquipmentStyle.equipmenttitle}>Equipments Details</Text>
                            <CustomeTextLable lable={'Shop Name :'} value={equipment?.shop_name} />
                            <CustomeTextLable lable={'Dosage Name :'}
                                value={equipment?.dosage || equipment?.other_dosage}
                            />
                            <CustomeTextLable lable={'Equipments :'} value={equipment?.equipment} />
                            <CustomeTextLable lable={'Brand Name :'} value={equipment?.brand_name} />
                            <CustomeTextLable lable={'Machine Name :'} value={equipment?.machine_name} />
                            <CustomeTextLable lable={'Model Name:'} value={equipment?.model_name} />
                            <Text style={ManageEquipmentStyle.border}> </Text>

                            <View style={{
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'space-between'
                            }} >
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <TouchableOpacity style={ManageEquipmentStyle.statusButton}>
                                        <AntDesign name={'check'} size={15} color="white" />
                                    </TouchableOpacity>
                                    <Text style={ManageEquipmentStyle.statusText}> Active </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => handleEditEquipment(equipment.id)}>
                                        <Image style={ManageEquipmentStyle.buttonStatus}
                                            source={require('../../Images/edit.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleDelete(equipment.id)}>
                                        <Image style={ManageEquipmentStyle.buttonStatus}
                                            source={require('../../Images/delete.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleViewEquipment(equipment.id)}>
                                        <Image style={ManageEquipmentStyle.buttonStatus}
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
                <EditEquipments closeModal={() => setEditAble(false)}
                    checkVisible={(item: any) => setEditAble(item)}
                />
            </Modal>

            <Modal animationType="slide" transparent={false}
                visible={viewAble} onRequestClose={() => { setViewAble(false) }}
            >
                <ViewEquipments checkVisible={checkVisible} isLoading={isLoading} />
            </Modal>
        </>
    )
}

export default ManageEquipments