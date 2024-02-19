import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { CardBase } from '@rneui/base/dist/Card/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewDosageStyle from '../../Css/ManageDosagesStyle/ViewDosageStyle'
import CustomeTextLable from '../../Components/CustomeTextLable';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import Loader from '../../Components/Loader';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';

interface ViewDosage {
    checkVisible: any,
    isLoading: any,
}

const ViewDosage: React.FC<ViewDosage> = ({ checkVisible, isLoading }) => {
    const { single_dosage } = useSelector((state: RootState) => state.dosages);

    return (
        <View>
            <TouchableOpacity style={ViewDosageStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={ViewDosageStyle.back} />
                </TouchableOpacity>

                <Text style={ViewDosageStyle.headerText}> View Dosage </Text>
            </TouchableOpacity>

            {isLoading ? (
                <Loader loading={isLoading} />
            ) : (
                <>
                    <CardBase>
                        <View style={ViewDosageStyle.dosageContainer}>
                            <Text style={ViewDosageStyle.dosagetitle}> Dosage Details </Text>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <TouchableOpacity style={ViewDosageStyle.statusButton}>
                                    <AntDesign name={'check'} size={15} color="white" />
                                </TouchableOpacity>
                                <Text style={ViewDosageStyle.statusText}> Active </Text>
                            </View>
                        </View>

                        <CustomeTextLable lable={'Model Name :'} value={single_dosage.data.model_name} />
                        <CustomeTextLable lable={'Model No :'} value={single_dosage.data.model_no} />
                        <CustomeTextLable lable={'Product No :'} value={single_dosage.data.product_no} />
                        <CustomeTextLable lable={'Pumps No :'} value={single_dosage.data.pupmps_no} />
                        <CustomeTextLable lable={'Washers No :'} value={single_dosage.data.washers_no} />
                    </CardBase>

                    <View style={{ marginBottom: 5 }}>
                        <CardBase>
                            <Text style={ViewDosageStyle.imageList}> Front Images</Text>
                            <View style={ViewDosageStyle.viewImage}>
                                {single_dosage.data.front_image ? (
                                    <Image style={ViewDosageStyle.imges}
                                        source={{ uri: `${Shop_Base_Url}/${single_dosage.data.front_image}` }}
                                    />
                                ) : null}
                            </View>
                        </CardBase>
                    </View>

                    <View>
                        <CardBase>
                            <Text style={ViewDosageStyle.imageList}> Back Images</Text>
                            <View style={ViewDosageStyle.viewImage}>
                                {single_dosage.data.back_image ? (
                                    <Image style={ViewDosageStyle.imges}
                                        source={{ uri: `${Shop_Base_Url}/${single_dosage.data.back_image}` }}
                                    />
                                ) : null}
                            </View>
                        </CardBase>
                    </View>
                </>
            )}
        </View>
    )
}

export default ViewDosage