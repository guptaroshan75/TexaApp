import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { CardBase } from '@rneui/base/dist/Card/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomeTextLable from '../../Components/CustomeTextLable';
import ViewQueryStyle from '../../Css/RaiseAQueryStyle/ViewQueryStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import Loader from '../../Components/Loader';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';

interface ViewQuery {
    checkVisible: any,
    isLoading: any
}

const ViewQuery: React.FC<ViewQuery> = ({ checkVisible, isLoading }) => {
    const { single_query } = useSelector((state: RootState) => state.query);

    if (!single_query) {
        return <Loader loading={isLoading} />
    }

    return (
        <View>
            <TouchableOpacity style={ViewQueryStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={ViewQueryStyle.back} />
                </TouchableOpacity>

                <Text style={ViewQueryStyle.headerText}> View Query </Text>
            </TouchableOpacity>

            {isLoading ? (
                <Loader loading={isLoading} />
            ) : (
                <ScrollView>
                    {single_query?.data.map((query: any, index: any) => (
                        <View key={index}>
                            <CardBase>
                                <View style={ViewQueryStyle.queryContainer}>
                                    <Text style={ViewQueryStyle.querytitle}> {query?.shop} </Text>
                                </View>

                                <CustomeTextLable lable={'Query Status :'}
                                    value={query.status ? query.status : "Open"}
                                />
                                <CustomeTextLable lable={'Subject :'} value={query?.query_title} />
                                <CustomeTextLable lable={'Message :'} value={query?.description} />
                                <CustomeTextLable lable={'Product :'} value={query?.product_name} />
                                <CustomeTextLable lable={'Submited At :'} value={query?.created_at} />
                            </CardBase>

                            <View style={{ marginBottom: 5 }}>
                                <CardBase>
                                    <Text style={ViewQueryStyle.imageList}> First Lable Image </Text>
                                    <View style={ViewQueryStyle.viewImage}>
                                        {query?.image1 ? (
                                            <Image style={ViewQueryStyle.imges}
                                                source={{ uri: `${Shop_Base_Url}/${query.image1}` }}
                                            />
                                        ) : null}
                                    </View>
                                </CardBase>
                            </View>

                            <View>
                                <CardBase>
                                    <Text style={ViewQueryStyle.imageList}> Second Lable Image </Text>
                                    <View style={ViewQueryStyle.viewImage}>
                                        {query?.image1 ? (
                                            <Image style={ViewQueryStyle.imges}
                                                source={{ uri: `${Shop_Base_Url}/${query.image2}` }}
                                            />
                                        ) : null}
                                    </View>
                                </CardBase>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    )
}

export default ViewQuery