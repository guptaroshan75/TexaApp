import React, { useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Alert, BackHandler } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DashboardStyle from '../Css/DashboardStyle'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/Store'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { getUsers } from '../Redux/Features/UserSlice'
import { getAllCount } from '../Redux/Features/CountOfAllDataSlice'
import { Shop_Base_Url } from '../BaseUrl/BaseUrl'
import { useFocusEffect } from '@react-navigation/native'

interface Dashboard {
    navigation: any
}

const Dashboard: React.FC<Dashboard> = (props) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);
    const { allCount } = useSelector((state: RootState) => state.counts);
    const userId = get_user ? get_user.id : '';

    const fetchData = useCallback(() => {
        dispatch(getUsers());
        dispatch(getAllCount(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    useFocusEffect(useCallback(() => {
        fetchData();
    }, [fetchData]));

    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';

    return (
        <View style={{ flex: 1 }}>
            <View style={DashboardStyle.headder}>
                <View style={DashboardStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../Images/menu.png')} style={DashboardStyle.toggle} />
                    </TouchableOpacity>

                    <Text style={DashboardStyle.headerText}> Dashboard </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={DashboardStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={DashboardStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 15 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Manage Shops')}>
                    <View style={DashboardStyle.container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={DashboardStyle.shopping}></Text>
                            <MaterialCommunityIcons name={'shopping'}
                                size={30} color="#fff" style={DashboardStyle.icon}
                            />
                            <Text style={DashboardStyle.border}></Text>
                            <View style={{ marginTop: -17 }}>
                                <Text style={DashboardStyle.title}> Total Shop </Text>
                                <Text style={DashboardStyle.total}> {allCount?.shop} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('Manage Equipments')}>
                    <View style={DashboardStyle.container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={DashboardStyle.equipment}></Text>
                            <MaterialCommunityIcons name={'hammer-screwdriver'}
                                size={30} color="#fff" style={DashboardStyle.icon}
                            />
                            <Text style={DashboardStyle.border}></Text>
                            <View style={{ marginTop: -17 }}>
                                <Text style={DashboardStyle.title}> Total Equipment </Text>
                                <Text style={DashboardStyle.total}> {allCount?.equipment} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('Manage Dosages')}>
                    <View style={DashboardStyle.container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={DashboardStyle.dosages}></Text>
                            <MaterialCommunityIcons name={'eyedropper'}
                                size={30} color="#fff" style={DashboardStyle.icon}
                            />
                            <Text style={DashboardStyle.border}></Text>
                            <View style={{ marginTop: -17 }}>
                                <Text style={DashboardStyle.title}> Total Dosages </Text>
                                <Text style={DashboardStyle.total}> {allCount?.dosage} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('Raise A Query')}>
                    <View style={DashboardStyle.container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={DashboardStyle.queries}></Text>
                            <MaterialCommunityIcons name={'progress-question'}
                                size={30} color="#fff" style={DashboardStyle.icon}
                            />
                            <Text style={DashboardStyle.border}></Text>
                            <View style={{ marginTop: -17 }}>
                                <Text style={DashboardStyle.title}> Total Queries </Text>
                                <Text style={DashboardStyle.total}> {allCount?.query} </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Dashboard;