import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, Modal, ScrollView, Alert, BackHandler } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { TouchableOpacity } from 'react-native';
import ManageQueryStyle from '../../Css/RaiseAQueryStyle/ManageQueryStyle';
import AddRaiseAQuery from './AddRaiseAQuery';
import { getUsers } from '../../Redux/Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { CardBase } from '@rneui/base/dist/Card/Card';
import CustomeTextLable from '../../Components/CustomeTextLable';
import ViewQuery from './ViewQuery';
import { deleteQuery, getAllQuery, viewSingleQuery } from '../../Redux/Features/RaiseQuerySlice';
import Loader from '../../Components/Loader';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';

interface RaiseQuery {
    navigation: any
}

interface Query { }

const RaiseQuery: React.FC<RaiseQuery> = (props) => {
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [viewAble, setViewAble] = useState(false);
    const [filteredQuery, setFilteredQuery] = useState<Query[]>([]);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const { get_all_query } = useSelector((state: RootState) => state.query);
    const userId = get_user ? get_user.id : '';
    const userName = get_user ? get_user.name : '';
    const userImage = get_user ?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
        : 'null';
    ;

    const filterQuery = (searchTerm: any) => {
        if (!searchTerm) {
            setFilteredQuery(get_all_query);
        } else {
            const filtered: any = get_all_query.filter(
                (query) =>
                    query.query_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    query.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    query.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredQuery(filtered);
        }
    };

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getAllQuery(userId))
        setFilteredQuery(get_all_query);
    }, [dispatch, userId])


    useEffect(() => {
        setFilteredQuery(get_all_query.map((query: any) => {
            const formattedDate = new Date(query.created_at).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            return {
                ...query,
                created_at: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
            };
        }));
    }, [get_all_query]);

    // const formateQuery = get_all_query.map(query => {
    //     const originalDate = query.created_at;
    //     const date = new Date(originalDate);
    //     const options: Intl.DateTimeFormatOptions = {
    //         weekday: 'short',
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         hour12: true,
    //     };

    //     const dateString = date.toLocaleString('de-DE', options);
    //     const formateTime = dateString.charAt(0).toUpperCase() + dateString.slice(1);

    //     return {
    //         ...query,
    //         created_at: formateTime,
    //     };
    // });

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
        setViewAble(item)
    }

    const closeModal = () => {
        setIsVisible(false);
    };

    const handleDelete = (caseId: number) => {
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
                            await dispatch(deleteQuery(caseId))
                            await dispatch(getAllQuery(userId))
                            setFilteredQuery(get_all_query)
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

    const handleViewQuery = async (case_id: number) => {
        try {
            await dispatch(viewSingleQuery({ userId, case_id }));
            setViewAble(true);
        } catch (error) {
            console.error('Error fetching query:', error);
        }
    }

    return (
        <>
            <View style={ManageQueryStyle.headder}>
                <View style={ManageQueryStyle.head}>
                    <TouchableOpacity style={{ marginLeft: 15 }}
                        onPress={() => { props.navigation.openDrawer() }}
                    >
                        <Image source={require('../../Images/menu.png')}
                            style={ManageQueryStyle.toggle}
                        />
                    </TouchableOpacity>

                    <Text style={ManageQueryStyle.headerText}> Manage Queries </Text>

                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        {get_user && get_user.profile_photo_path ? (
                            <Image style={ManageQueryStyle.profileLogo}
                                source={{ uri: `${Shop_Base_Url}/${get_user.profile_photo_path}` }}
                            />
                        ) : (
                            <Image style={ManageQueryStyle.profileLogo}
                                source={{ uri: userImage }}
                            />
                        )}
                    </TouchableOpacity>

                </View>

                <TextInput style={ManageQueryStyle.inputText} autoCapitalize='none'
                    autoCorrect={false} value={search} placeholder="Search By Subject"
                    onChangeText={(search) => {
                        setSearch(search);
                        filterQuery(search);
                    }}
                />
            </View>

            <TouchableOpacity style={ManageQueryStyle.addShop} onPress={() => setIsVisible(true)}>
                <FontAwesome6 name={'plus'} size={16} color="#fff" />
                <Text style={[ManageQueryStyle.addText]}> Raise a Query </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={false}
                visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
            >
                <AddRaiseAQuery closeModal={closeModal} checkVisible={checkVisible} />
            </Modal>

            {filteredQuery.length === 0 ? (
                <Text style={ManageQueryStyle.shopData}> No Query Data </Text>
            ) : (
                <ScrollView style={{ marginBottom: 15 }}>
                    {filteredQuery.map((query: any, index) => (
                        <CardBase key={index}>
                            <Text style={ManageQueryStyle.querytitle}> Query Details </Text>
                            <CustomeTextLable lable={'Subject :'} value={query.query_title} />
                            <CustomeTextLable lable={'Description :'} value={query.description} />
                            <CustomeTextLable lable={'Product :'} value={query.product_name} />
                            <CustomeTextLable lable={'Submited At :'} value={query.created_at} />
                            <Text style={ManageQueryStyle.border}> </Text>

                            <View style={{
                                display: 'flex', flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <TouchableOpacity onPress={() => handleViewQuery(query.case_id)}>
                                    <Image style={ManageQueryStyle.buttonStatus}
                                        source={require('../../Images/eye.png')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDelete(query.case_id)}>
                                    <Image style={ManageQueryStyle.buttonStatus}
                                        source={require('../../Images/delete.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </CardBase>
                    ))}
                </ScrollView>
            )}

            {isLoading ? (
                <Loader loading={isLoading} />
            ) : (
                <Modal animationType="slide" transparent={false}
                    visible={viewAble} onRequestClose={() => { setViewAble(false) }}
                >
                    <ViewQuery checkVisible={checkVisible} isLoading={isLoading} />
                </Modal>
            )}
        </>
    )
}

export default RaiseQuery