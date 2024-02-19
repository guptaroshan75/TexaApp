import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Modal, Alert, ScrollView, BackHandler } from 'react-native'
import { CardBase } from '@rneui/base/dist/Card/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import ManageDosageStyle from '../../Css/ManageDosagesStyle/ManageDosageStyle';
import AddDosage from './AddDosage';
import EditDosage from './EditDosage';
import ViewDosage from './ViewDosage';
import CustomeTextLable from '../../Components/CustomeTextLable';
import { getUsers } from '../../Redux/Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { deleteDosage, editDosage } from '../../Redux/Features/DosageSlice';
import { getAllDosage, viewSingleDosage } from '../../Redux/Features/DosageSlice';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import Loader from '../../Components/Loader';

interface ManageDosages {
    navigation: any,
}

interface Dosage {
    id: number;
    model_name: string;
    model_no: string;
    product_no: string;
}

const ManageDosages: React.FC<ManageDosages> = (props) => {
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [editAble, setEditAble] = useState(false);
    const [viewAble, setViewAble] = useState(false);
    const [filteredDosages, setFilteredDosages] = useState<Dosage[]>([]);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_all_Dosage } = useSelector((state: RootState) => state.dosages);
    const userId = get_user ? get_user.id : '';

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAllDosage(userId))
    }, [dispatch, userId])

    useEffect(() => {
        setFilteredDosages(get_all_Dosage);
    }, [get_all_Dosage]);

    const filterDosages = (searchTerm: any) => {
        if (!searchTerm) {
            setFilteredDosages(get_all_Dosage);
        } else {
            const filtered: any = get_all_Dosage.filter(
                (dosage) =>
                    dosage.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    dosage.product_no.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredDosages(filtered);
        }
    };

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
        setEditAble(item)
        setViewAble(item)
    }

    const handleDelete = (dosageId: number) => {
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
                            await dispatch(deleteDosage(dosageId))
                            await dispatch(getAllDosage(userId))
                            setFilteredDosages(get_all_Dosage);
                        } catch (error) {
                            console.error('Error deleting equipment:', error);
                        };
                    }
                }
            ]
        )
    }

    const handleViewDosage = (dosageId: number) => {
        dispatch(viewSingleDosage(dosageId));
        setViewAble(true);
    };

    const handleEditDosage = (dosageId: number) => {
        dispatch(editDosage(dosageId));
        setEditAble(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    };

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

    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

    return (
        <>
            <View style={ManageDosageStyle.headder}>
                <View style={ManageDosageStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../../Images/menu.png')} style={ManageDosageStyle.toggle} />
                    </TouchableOpacity>

                    <Text style={ManageDosageStyle.headerText}> Manage Dosages </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={ManageDosageStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={ManageDosageStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TextInput style={ManageDosageStyle.inputText} autoCapitalize='none' autoCorrect={false}
                    onChangeText={(search) => {
                        setSearch(search);
                        filterDosages(search);
                    }} placeholder='Search By Model Name or Product No'
                />
            </View>

            <TouchableOpacity style={ManageDosageStyle.addShop} onPress={() => setIsVisible(true)}>
                <FontAwesome6 name={'plus'} size={16} color="#fff" />
                <Text style={[ManageDosageStyle.addText]}> Add New Dosage </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false}
                visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
            >
                <AddDosage closeModal={closeModal} checkVisible={checkVisible} />
            </Modal>

            <Loader loading={isLoading} />

            {filteredDosages.length === 0 ? (
                <Text style={ManageDosageStyle.dosageData}> No Dosage Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {filteredDosages.map((dosage: any, index) => (
                        <CardBase key={index}>
                            <Text style={ManageDosageStyle.dosagetitle}>Dosage Details</Text>
                            <CustomeTextLable lable={'Model Name :'} value={dosage.model_name} />
                            <CustomeTextLable lable={'Model No :'} value={dosage.model_no} />
                            <CustomeTextLable lable={'Product No :'} value={dosage.product_no} />
                            <CustomeTextLable lable={'Pumps No :'} value={dosage.pupmps_no} />
                            <CustomeTextLable lable={'Washers No :'} value={dosage.washers_no} />
                            <Text style={ManageDosageStyle.border}> </Text>

                            <View style={{
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                            >
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <TouchableOpacity style={ManageDosageStyle.statusButton}>
                                        <AntDesign name={'check'} size={15} color="white" />
                                    </TouchableOpacity>
                                    <Text style={ManageDosageStyle.statusText}> Active </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => handleEditDosage(dosage.id)}>
                                        <Image style={ManageDosageStyle.buttonStatus}
                                            source={require('../../Images/edit.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleDelete(dosage.id)}>
                                        <Image style={ManageDosageStyle.buttonStatus}
                                            source={require('../../Images/delete.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleViewDosage(dosage.id)}>
                                        <Image style={ManageDosageStyle.buttonStatus}
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
                <EditDosage closeModal={() => setEditAble(false)}
                    checkVisible={(item: any) => setEditAble(item)}
                />
            </Modal>

            <Modal animationType="slide" transparent={false}
                visible={viewAble} onRequestClose={() => { setViewAble(false) }}
            >
                <ViewDosage checkVisible={checkVisible} isLoading={isLoading} />
            </Modal>
        </>
    )
}

export default ManageDosages