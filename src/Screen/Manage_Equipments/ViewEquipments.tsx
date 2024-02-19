import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { CardBase } from '@rneui/base/dist/Card/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomeTextLable from '../../Components/CustomeTextLable';
import Loader from '../../Components/Loader';
import ViewEquipmentStyle from '../../Css/ManageEquipmentStyle/ViewEquipmentStyle';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

interface ViewEquipments {
    checkVisible: any,
    isLoading: any,
}

const ViewEquipments: React.FC<ViewEquipments> = ({ isLoading, checkVisible }) => {
    const { single_equipment } = useSelector((state: RootState) => state.equipments);

    if (!single_equipment) {
        return <Loader loading={isLoading} />
    }

    return (
        <View>
            <TouchableOpacity style={ViewEquipmentStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => checkVisible(false)}>
                    <Image source={require('../../Images/back.png')} style={ViewEquipmentStyle.back} />
                </TouchableOpacity>

                <Text style={ViewEquipmentStyle.headerText}> View Equipment </Text>
            </TouchableOpacity>

            <Loader loading={isLoading} />
            
            <ScrollView style={{ marginBottom: 70 }}>
                <CardBase>
                    <View style={ViewEquipmentStyle.dosageContainer}>
                        <Text style={ViewEquipmentStyle.dosagetitle}>
                            {single_equipment?.data?.machine_type_name}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity style={ViewEquipmentStyle.statusButton}>
                                <AntDesign name={'check'} size={15} color="white" />
                            </TouchableOpacity>
                            <Text style={ViewEquipmentStyle.statusText}> Active </Text>
                        </View>
                    </View>

                    <CustomeTextLable lable={'Brand Name :'} value={single_equipment?.data?.brand_name} />

                    <CustomeTextLable lable={'Machine Name :'}
                        value={single_equipment?.data?.machine_name}
                    />

                    <CustomeTextLable lable={'Model Name :'} value={single_equipment?.data?.model_name} />

                    <CustomeTextLable lable={'Installation Year :'}
                        value={single_equipment?.data?.install_year}
                    />

                    <CustomeTextLable lable={'Capacity :'} value={single_equipment?.data?.capacity} />

                    {single_equipment?.data?.fe_finishing_equipment_type ? (
                        <CustomeTextLable lable={'Finishing Equipment Type :'}
                            value={single_equipment?.data?.fe_finishing_equipment_type}
                        />
                    ) : null}

                    {single_equipment?.data?.wm_machion_type ? (
                        <CustomeTextLable lable={'Machine Type :'}
                            value={single_equipment?.data?.wm_machion_type}
                        />
                    ) : null}

                    {single_equipment?.data?.wm_heat_type ? (
                        <CustomeTextLable lable={'Heat Type :'}
                            value={single_equipment?.data?.wm_heat_type}
                        />
                    ) : null}

                    {single_equipment?.data?.wm_volume ? (
                        <CustomeTextLable lable={'Volume :'}
                            value={single_equipment?.data?.wm_volume}
                        />
                    ) : null}

                    {single_equipment?.data?.wm_program_type ? (
                        <CustomeTextLable lable={'Program Type :'}
                            value={single_equipment?.data?.wm_program_type}
                        />
                    ) : null}

                    {single_equipment?.data?.dryer_type ? (
                        <CustomeTextLable lable={'Dryer Type :'}
                            value={single_equipment?.data?.dryer_type}
                        />
                    ) : null}

                    {single_equipment?.data?.dryer_volume ? (
                        <CustomeTextLable lable={'Dryer Volume :'}
                            value={single_equipment?.data?.dryer_volume}
                        />
                    ) : null}

                    {single_equipment?.data?.dryer_program_number ? (
                        <CustomeTextLable lable={'Dryer Program Number :'}
                            value={single_equipment?.data?.dryer_program_number}
                        />
                    ) : null}

                    {single_equipment?.data?.dryer_program_name ? (
                        <CustomeTextLable lable={'Dryer Program Name :'}
                            value={single_equipment?.data?.dryer_program_name}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_no_tank ? (
                        <CustomeTextLable lable={'Number of Tank (s) :'}
                            value={single_equipment?.data?.dc_no_tank}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_solvent ? (
                        <CustomeTextLable lable={'Solvent :'} value={single_equipment?.data?.dc_solvent} />
                    ) : null}

                    {single_equipment?.data?.dc_heat_Type ? (
                        <CustomeTextLable lable={'Heat Type :'}
                            value={single_equipment?.data?.dc_heat_Type}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_filter ? (
                        <CustomeTextLable lable={'Filter :'} value={single_equipment?.data?.dc_filter} />
                    ) : null}

                    {single_equipment?.data?.dc_frequency_motor ? (
                        <CustomeTextLable lable={'Frequency Motor :'}
                            value={single_equipment?.data?.dc_frequency_motor}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_spray_unit ? (
                        <CustomeTextLable lable={'Spray Unit :'}
                            value={single_equipment?.data?.dc_spray_unit}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_solvent_cooling_system ? (
                        <CustomeTextLable lable={'Solvent Cooling System :'}
                            value={single_equipment?.data?.dc_solvent_cooling_system}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_distilation_type ? (
                        <CustomeTextLable lable={'Distillation Type :'}
                            value={single_equipment?.data?.dc_distilation_type}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_distilation_method ? (
                        <CustomeTextLable lable={'Distillation Method :'}
                            value={single_equipment?.data?.dc_distilation_method}
                        />
                    ) : null}

                    {single_equipment?.data?.dc_distilation ? (
                        <CustomeTextLable lable={'Distillation :'}
                            value={single_equipment?.data?.dc_distilation}
                        />
                    ) : null}

                    <CustomeTextLable lable={'Dosage Equipments :'}
                        value={single_equipment?.data?.dosage_name}
                    />

                    {single_equipment?.data?.other_dosage ? (
                        <CustomeTextLable lable={'Other Dosage :'}
                            value={single_equipment?.data?.other_dosage}
                        />
                    ) : null}
                </CardBase>

                <View style={{ marginBottom: 5 }}>
                    <CardBase>
                        <Text style={ViewEquipmentStyle.imageList}> Front Images </Text>
                        <View style={ViewEquipmentStyle.viewImage}>
                            {single_equipment?.data?.front_image ? (
                                <Image style={ViewEquipmentStyle.imges}
                                    source={{ uri: `${Shop_Base_Url}/${single_equipment?.data?.front_image}` }}
                                />
                            ) : (
                                <Text style={ViewEquipmentStyle.namevalue}> No Front Image </Text>
                            )}
                        </View>
                    </CardBase>
                </View>

                <View>
                    <CardBase>
                        <Text style={ViewEquipmentStyle.imageList}> Back Images</Text>
                        <View style={ViewEquipmentStyle.viewImage}>
                            {single_equipment?.data?.back_image ? (
                                <Image style={ViewEquipmentStyle.imges}
                                    source={{ uri: `${Shop_Base_Url}/${single_equipment?.data?.back_image}` }}
                                />
                            ) : (
                                <Text style={ViewEquipmentStyle.namevalue}> No Back Image </Text>
                            )}
                        </View>
                    </CardBase>
                </View>
            </ScrollView>
        </View>
    )
}

export default ViewEquipments