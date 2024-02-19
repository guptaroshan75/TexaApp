import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, Modal, Alert, ScrollView, BackHandler } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native';
import CreateOneTimeStyle from '../../Css/CreateOneTimeAccessStyle/CreateOneTimeStyle';
import AddOneTimeAccess from './AddOneTimeAccess';
import { getUsers } from '../../Redux/Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CardBase } from '@rneui/base/dist/Card/Card'
import { deleteSubUser, getAllSubUSer } from '../../Redux/Features/SubUserSlice';
import CustomeTextLable from '../../Components/CustomeTextLable';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import Loader from '../../Components/Loader';

interface CreateOneTime {
    navigation: any
}

interface OneTime { }

const CreateOneTime: React.FC<CreateOneTime> = (props) => {
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [filteredOneTime, setFilteredOneTime] = useState<OneTime[]>([]);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_subUser } = useSelector((state: RootState) => state.subuser);
    const userId = get_user ? get_user.id : '';
    console.log(get_subUser);

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAllSubUSer(userId))
    }, [dispatch, userId])

    const closeModal = () => {
        setIsVisible(false);
    };

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
    }

    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

    useEffect(() => {
        setFilteredOneTime(get_subUser);
    }, [get_subUser]);

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

    const filterOneTime = (searchTerm: any) => {
        if (!searchTerm) {
            setFilteredOneTime(get_subUser);
        } else {
            const filtered: any = get_subUser.filter(
                (sub_user) =>
                    sub_user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub_user.shop.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOneTime(filtered);
        }
    };

    const handleDelete = (subUserId: number) => {
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
                            await dispatch(deleteSubUser(subUserId))
                            await dispatch(getAllSubUSer(userId))
                            setFilteredOneTime(get_subUser);
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
            <View style={CreateOneTimeStyle.headder}>
                <View style={CreateOneTimeStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../../Images/menu.png')}
                            style={CreateOneTimeStyle.toggle}
                        />
                    </TouchableOpacity>

                    <Text style={CreateOneTimeStyle.headerText}> Sub User List </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={CreateOneTimeStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={CreateOneTimeStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>

                </View>

                <TextInput style={CreateOneTimeStyle.inputText} autoCapitalize='none'
                    autoCorrect={false} value={search} placeholder="Search By Email"
                    onChangeText={(search) => {
                        setSearch(search);
                        filterOneTime(search);
                    }}
                />
            </View>

            <TouchableOpacity style={CreateOneTimeStyle.addShop} onPress={() => setIsVisible(true)}>
                <FontAwesome6 name={'plus'} size={16} color="#fff" />
                <Text style={[CreateOneTimeStyle.addText]}> Add New Sub User </Text>
            </TouchableOpacity>

            {/* {isLoading ? (
                <Text style={CreateOneTimeStyle.shopData}> No Sub User Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {get_subUser.map((subUser, index) => (
                        <CardBase key={index}>
                            <Text style={CreateOneTimeStyle.subUserTitle}>Sub User Details</Text>
                            <CustomeTextLable lable={'Name :'} value={subUser.name} />
                            <CustomeTextLable lable={'Email-Id :'} value={subUser.email} />
                            <CustomeTextLable lable={'Shop Name :'} value={subUser.shop} />
                            <Text style={CreateOneTimeStyle.border}> </Text>

                            <View style={{
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => handleDelete(subUser.id)}>
                                        <Image style={CreateOneTimeStyle.buttonStatus}
                                            source={require('../../Images/delete.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardBase>
                    ))}
                </ScrollView>
            )} */}

            <Loader loading={isLoading} />

            {filteredOneTime.length === 0 ? (
                <Text style={CreateOneTimeStyle.shopData}> No Sub User Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {filteredOneTime.map((subUser: any, index) => (
                        <CardBase key={index}>
                            <Text style={CreateOneTimeStyle.subUserTitle}>Sub User Details</Text>
                            <CustomeTextLable lable={'Name :'} value={subUser.name} />
                            <CustomeTextLable lable={'Email-Id :'} value={subUser.email} />
                            <CustomeTextLable lable={'Shop Name :'} value={subUser.shop} />
                            <Text style={CreateOneTimeStyle.border}> </Text>

                            <View style={{
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => handleDelete(subUser.id)}>
                                        <Image style={CreateOneTimeStyle.buttonStatus}
                                            source={require('../../Images/delete.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </CardBase>
                    ))}
                </ScrollView>
            )}

            <Modal animationType="slide" transparent={false}
                visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
            >
                <AddOneTimeAccess closeModal={closeModal} checkVisible={checkVisible} />
            </Modal>
        </>
    )
}

export default CreateOneTime
