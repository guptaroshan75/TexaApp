import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeImage from '../../Components/CustomeImage';
import AddEquipmentStyle from '../../Css/ManageEquipmentStyle/AddEquipmentStyle';
import CustomeModelOfData from '../../Components/CustomeModelOfData';
import { RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAllEquipmentdata, getAlldata } from '../../Redux/Features/EquipmentsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api } from '../../BaseUrl/BaseUrl';
import axios from 'axios';
import CustomeSelectMachineType from '../../Components/CustomeSelectMachineType';
import CutomeTextNumber from '../../Components/CutomeTextNumber';

interface AddEquipments {
    checkVisible: (visible: boolean) => void;
    closeModal: () => void;
}

const AddEquipments: React.FC<AddEquipments> = ({ checkVisible, closeModal }) => {
    const [selectedShopId, setSelectedShopId] = useState<string>('');

    const [selectedMachineId, setSelectedMachineId] = useState<string>('');
    const [selectedMachineType, setSelectedMachineType] = useState<string>('');

    const [selectedCapacity, setSelectedCapacity] = useState<string>('');

    const [selectedDosageId, setSelectedDosageId] = useState<string>('');
    const [selectedDosageType, setSelectedDosageType] = useState<string>('');

    const [selectedDosageOther, setSelectedDosageOther] = useState<string>('');

    const [Brandname, setBrandname] = useState<string>('');
    const [MachineName, setMachineName] = useState<string>('');
    const [ModelName, setModelName] = useState<string>('');
    const [InstallationYear, setInstallationYear] = useState<string>('');

    const [addFrontImage, setAddFrontImage] = useState<string>('');
    const [addBackImage, setaddBackImage] = useState<string>('');
    const [frontImageVisible, setFrontImageVisible] = useState(false);
    const [backImageVisible, setBackImageVisible] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_all_data } = useSelector((state: RootState) => state.equipments);
    const { isLoading, get_user } = useSelector((state: RootState) => state.user);
    const userId = get_user ? get_user.id : '';

    const shopData = get_all_data.shop.map((item: any) => ({ id: item.id, name: item.shop_name }))
    const machineTypeData = get_all_data.machinType.map((item: any) => ({ id: item.id, name: item.name }));
    const dosageEquipment = get_all_data.dosage.map((item: any) => ({ id: item.id, name: item.model_name }));
    dosageEquipment.push({ name: 'Other', id: 32 });

    const capacities = Array.from({ length: 55 }, (_, index) => (index + 6) + ' kg');
    const weights = Array.from({ length: 60 }, (_, index) => (index + 1) + ' kg');
    const numberOptions = Array.from({ length: 100 }, (_, index) => index + 1);
    const Numberoftank = ["1", "2", "3"];
    const Volume = Array.from({ length: 300 }, (_, index) => (index + 1) + ' kg');
    const machineTypes = ["Wash Extractor", "Barrier Machine", "Tunnel Washer"];
    const Solvent = ["Perchloethylen", "Hydrocarbon", "Intense", "Sensene", "Hyglo"];
    const heatType = ["Steam", "Electrical"];
    const programType = ["Card", "Computer"];
    const Filter = ["Nylon Powerless Fillter", "Nylon Powder Filter", "Cartridge Filter",
        "Cartridge Filter Decorator", "Active Carbon Filter", "Other"
    ];
    const yes_no = ["Yes", "No"]
    const DistillationType = ["Steam", "Electrical"];
    const DistillationMethod = ["Full", "Partial"]
    const programname = ["Temperature", "Drying Time", "Cool down Time"]

    // Front Image Handlers
    const handleAddFrontImage = (imageURI: string) => {
        setAddFrontImage(imageURI);
        setFrontImageVisible(false);
    };

    const handleCancelFrontImage = () => {
        if (addFrontImage) {
            setAddFrontImage('')
        }
    };

    // Back Image Handlers
    const handleAddBackImage = (imageURI: string) => {
        setaddBackImage(imageURI);
        setBackImageVisible(false);
    };

    const handleCancelBackImage = () => {
        if (addBackImage) {
            setaddBackImage(''); 
        }
    };

    useEffect(() => {
        dispatch(getAlldata(userId))
    }, [dispatch])

    const handleShopSelect = (id: any) => {
        setSelectedShopId(id);
    };

    const handleMachineTypeSelect = (id: any, name: string) => {
        setSelectedMachineId(id);
        setSelectedMachineType(name);
    };

    const handleCapacitySelect = (name: string) => {
        const numericValue = name.replace(/\D/g, '');
        setSelectedCapacity(numericValue);
    };

    const handleDosageSelect = (id: any, name: string) => {
        setSelectedDosageId(id);
        setSelectedDosageType(name);
    };

    const handleAddEquipmemts = async () => {
        const formData = new FormData();
        formData.append('user_id', String(userId));
        formData.append('shop_id', selectedShopId);
        formData.append('machine_type', selectedMachineId);
        formData.append('wm_machion_type', wm_machion_type);
        formData.append('wm_heat_type', wm_heat_type);
        formData.append('wm_volume', wm_volume);
        formData.append('wm_program_type', wm_program_type);
        formData.append('dc_no_tank', dc_no_tank);
        formData.append('dc_solvent', dc_solvent);
        formData.append('dc_heat_Type', dc_heat_Type);
        formData.append('dc_filter', dc_filter);
        formData.append('dc_frequency_motor', dc_frequency_motor);
        formData.append('dc_spray_unit', dc_spray_unit);
        formData.append('dc_solvent_cooling_system', dc_solvent_cooling_system);
        formData.append('dc_distilation', dc_distilation);
        formData.append('dc_distilation_type', dc_distilation_type);
        formData.append('dc_distilation_method', dc_distilation_method);
        formData.append('fe_finishing_equipment_type', fe_finishing_equipment_type);
        formData.append('dryer_type', dryer_type);
        formData.append('dryer_volume', dryer_volume);
        formData.append('dryer_program_number', dryer_program_number);
        formData.append('dryer_program_name', dryer_program_name);
        formData.append('brand_name', Brandname);
        formData.append('machine_name', MachineName);
        formData.append('model_name', ModelName);
        formData.append('capacity', selectedCapacity);
        formData.append('install_year', InstallationYear);
        formData.append('dosage', selectedDosageId);
        formData.append('other_dosage', selectedDosageOther);

        if (!Brandname || !MachineName || !ModelName || !selectedCapacity || !InstallationYear
            || !selectedShopId || !selectedMachineId) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (addFrontImage) {
            formData.append('front_image', {
                uri: addFrontImage,
                type: 'image/jpeg',
                name: 'front_image.jpg',
            });
        }

        if (addBackImage) {
            formData.append('back_image', {
                uri: addBackImage,
                type: 'image/jpeg',
                name: 'back_image.jpg',
            });
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${Api}/add-equipment`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllEquipmentdata(userId));
            console.log('Add Equipmemts', response.data);
        } catch (error) {
            console.log('Add Equipmemts error:', error);
        }
    };

    const [dc_no_tank, setNumberOfTank] = useState('');
    const [dc_solvent, setSolvent] = useState('');
    const [dc_heat_Type, setHeatType] = useState('');
    const [dc_filter, setFilter] = useState('');
    const [dc_frequency_motor, setFrequencyMotor] = useState('');
    const [dc_spray_unit, setSprayUnit] = useState('');
    const [dc_solvent_cooling_system, setSolventCooling] = useState('');
    const [dc_distilation, setDistilation] = useState('');
    const [dc_distilation_type, setDistilationType] = useState('');
    const [dc_distilation_method, setDistilationMethod] = useState('');
    const [wm_machion_type, setMachionType] = useState('');
    const [wm_heat_type, setWmHeatType] = useState('');
    const [wm_volume, setWmVolume] = useState('');
    const [wm_program_type, setProgramType] = useState('');
    const [fe_finishing_equipment_type, setFinishing] = useState('');
    const [dryer_type, setDryer] = useState('');
    const [dryer_volume, setDryerVolume] = useState('');
    const [dryer_program_number, setProgramNumber] = useState('');
    const [dryer_program_name, setProgramName] = useState('');

    const handleSelectWmVolume = (item: any) => {
        setWmVolume(item)
    }

    const handleSelectProgramType = (item: any) => {
        setProgramType(item)
    }

    const handleSelectMachionType = (item: any) => {
        setMachionType(item)
    }

    const handleSelectHeatType = (item: any) => {
        setWmHeatType(item)
    }

    const handleSelectNumberOftank = (item: any) => {
        setNumberOfTank(item)
    }

    const handleSelectSolvent = (item: any) => {
        setSolvent(item)
    }

    const handleSelectHeatTypeDc = (item: any) => {
        setHeatType(item)
    }

    const handleSelectFilter = (item: any) => {
        setFilter(item)
    }

    const handleSelectFrequency = (item: any) => {
        setFrequencyMotor(item)
    }

    const handleSelectSpray = (item: any) => {
        setSprayUnit(item)
    }

    const handleSelectSolventCooling = (item: any) => {
        setSolventCooling(item)
    }

    const handleSelectDistillation = (item: any) => {
        setDistilation(item)
    }

    const handleSelectDistillationType = (item: any) => {
        setDistilationType(item)
    }

    const handleSelectDistillationMethod = (item: any) => {
        setDistilationMethod(item)
    }

    const handleSelectWeight = (item: any) => {
        setDryerVolume(item)
    }

    const handleSelectProgramNumber = (item: any) => {
        setProgramNumber(item)
    }

    const handleSelectProgramName = (item: any) => {
        setProgramName(item)
    }

    return (
        <View style={AddEquipmentStyle.container}>
            <TouchableOpacity style={AddEquipmentStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={AddEquipmentStyle.back} />
                </TouchableOpacity>

                <Text style={AddEquipmentStyle.headerText}> Add New Equipment </Text>
            </TouchableOpacity>

            <View style={AddEquipmentStyle.maincontainer}>
                <ScrollView>
                    <CustomeModelOfData responses={shopData} loading={isLoading}
                        placeholder={'Select Shop Name'} lable={'Shop Name'}
                        setSelectedValue={handleShopSelect}
                    />

                    <CustomeModelOfData responses={machineTypeData} loading={isLoading}
                        placeholder={'Select Machine Type'} lable={'Machine Type'}
                        setSelectedValue={handleMachineTypeSelect}
                    />

                    <CustomTextInput title={'Brand Name'} value={Brandname} placeholder={"Brand Name"}
                        onChangeText={(Brandname) => setBrandname(Brandname)}
                    />

                    <CustomTextInput value={MachineName} placeholder={"Machine Name"}
                        title={'Machine Name'}
                        onChangeText={(MachineName) => setMachineName(MachineName)}
                    />

                    <CustomTextInput title={'Model Name'} value={ModelName} placeholder={"Model Name"}
                        onChangeText={(ModelName) => setModelName(ModelName)}
                    />

                    <CustomeSelectMachineType responses={capacities} loading={isLoading}
                        placeholder={'Select Capacity'} lable={'Capacity'}
                        setSelectedValue={handleCapacitySelect}
                    />

                    <CutomeTextNumber title={'Installation Year'} value={InstallationYear}
                        placeholder={"Installation Year"}
                        onChangeText={(InstallationYear) => setInstallationYear(InstallationYear)}
                    />

                    {selectedMachineType === 'Washing Machine' && (
                        <>
                            <CustomeSelectMachineType loading={isLoading} responses={machineTypes}
                                setSelectedValue={handleSelectMachionType}
                                placeholder={'Select Machine Type'} lable={'Machine Type'}
                            />

                            <CustomeSelectMachineType loading={isLoading} responses={heatType}
                                setSelectedValue={handleSelectHeatType}
                                placeholder={'Select Heat Type'} lable={'Heat Type'}
                            />


                            <CustomeSelectMachineType loading={isLoading} responses={Volume}
                                setSelectedValue={handleSelectWmVolume}
                                placeholder={'Select Volume'} lable={'Volume'}
                            />

                            <CustomeSelectMachineType loading={isLoading} responses={programType}
                                setSelectedValue={handleSelectProgramType}
                                placeholder={'Select Program Type'} lable={'Program Type'}
                            />

                            <CustomeModelOfData responses={dosageEquipment} loading={isLoading}
                                setSelectedValue={handleDosageSelect} lable={'Dosage Equipments'}
                                placeholder={"Select Dosage Equipment"}
                            />

                            {selectedDosageType === 'Other' && (
                                <CustomTextInput title={'Other Dosage Equipment'}
                                    value={selectedDosageOther} placeholder={"Enter Dosage Equipment"}
                                    onChangeText={(selectedDosageOther) => setSelectedDosageOther(selectedDosageOther)}
                                />
                            )}
                        </>
                    )}

                    {selectedMachineType === 'Dry Cleaning Machine' && (
                        <>
                            <CustomeSelectMachineType responses={Numberoftank} loading={isLoading}
                                placeholder={'Select Number of Tank'} lable={'Number of Tank (s)'}
                                setSelectedValue={handleSelectNumberOftank}
                            />

                            <CustomeSelectMachineType responses={Solvent} loading={isLoading}
                                placeholder={'Select Solvent Type'} lable={'Solvent Type'}
                                setSelectedValue={handleSelectSolvent}
                            />

                            <CustomeSelectMachineType responses={heatType} loading={isLoading}
                                placeholder={'Select Heat Type'} lable={'Heat Type'}
                                setSelectedValue={handleSelectHeatTypeDc}
                            />

                            <CustomeSelectMachineType lable={'Filter'} responses={Filter}
                                loading={isLoading} placeholder={'Select Filter'}
                                setSelectedValue={handleSelectFilter}
                            />

                            <CustomeSelectMachineType lable={'Frequency Motor'} responses={yes_no}
                                loading={isLoading} placeholder={'Select Frequency Motor'}
                                setSelectedValue={handleSelectFrequency}
                            />

                            <CustomeSelectMachineType lable={'Spray Unit'} responses={yes_no}
                                loading={isLoading} placeholder={'Select Spray Unit'}
                                setSelectedValue={handleSelectSpray}
                            />

                            <CustomeSelectMachineType lable={'Solvent Cooling System'} responses={yes_no}
                                loading={isLoading} placeholder={'Select Solvent Cooling System'}
                                setSelectedValue={handleSelectSolventCooling}
                            />

                            <CustomeSelectMachineType lable={'Distillation'} responses={yes_no}
                                loading={isLoading} placeholder={'Select Distillation'}
                                setSelectedValue={handleSelectDistillation}
                            />

                            <CustomeSelectMachineType lable={'Distillation Type'}
                                responses={DistillationType}
                                loading={isLoading} placeholder={'Select Distillation Type'}
                                setSelectedValue={handleSelectDistillationType}
                            />

                            <CustomeSelectMachineType lable={'Distillation Method'}
                                responses={DistillationMethod}
                                loading={isLoading} placeholder={'Select Distillation Method'}
                                setSelectedValue={handleSelectDistillationMethod}
                            />

                            <CustomeModelOfData responses={dosageEquipment} loading={isLoading}
                                setSelectedValue={handleDosageSelect} lable={'Dosage Equipments'}
                                placeholder={"Select Dosage Equipment"}
                            />

                            {selectedDosageType === 'Other' && (
                                <CustomTextInput title={'Other Dosage Equipment'}
                                    value={selectedDosageOther} placeholder={"Enter Dosage Equipment"}
                                    onChangeText={(selectedDosageOther) => setSelectedDosageOther(selectedDosageOther)}
                                />
                            )}
                        </>
                    )}

                    {selectedMachineType === 'Fishing Equipment' && (
                        <>
                            <CustomTextInput title={'Finishing Equipment Type'}
                                value={fe_finishing_equipment_type} placeholder={"Finishing Equipment Type"}
                                onChangeText={(fe_finishing_equipment_type) => setFinishing(fe_finishing_equipment_type)}
                            />

                            <CustomeModelOfData responses={dosageEquipment} loading={isLoading}
                                setSelectedValue={handleDosageSelect} lable={'Dosage Equipments'}
                                placeholder={"Select Dosage Equipment"}
                            />

                            {selectedDosageType === 'Other' && (
                                <CustomTextInput title={'Other Dosage Equipment'}
                                    value={selectedDosageOther} placeholder={"Enter Dosage Equipment"}
                                    onChangeText={(selectedDosageOther) => setSelectedDosageOther(selectedDosageOther)}
                                />
                            )}
                        </>
                    )}

                    {selectedMachineType === 'Dryer' && (
                        <>
                            <CustomTextInput title={'Dryer Type'} value={dryer_type}
                                placeholder={"Dryer Type"}
                                onChangeText={(dryer_type) => setDryer(dryer_type)}
                            />

                            <CustomeSelectMachineType lable={'Volume'} responses={weights}
                                loading={isLoading} placeholder={'Select Volume'}
                                setSelectedValue={handleSelectWeight}
                            />

                            <CustomeSelectMachineType lable={'Program Number'} responses={numberOptions}
                                loading={isLoading} placeholder={'Select Program Number'}
                                setSelectedValue={handleSelectProgramNumber}
                            />

                            <CustomeSelectMachineType lable={'Program Name'} responses={programname}
                                loading={isLoading} placeholder={'Select Program Name'}
                                setSelectedValue={handleSelectProgramName}
                            />
                        </>
                    )}

                    <View style={AddEquipmentStyle.main}>
                        <TouchableOpacity style={AddEquipmentStyle.ImageContainer}
                            onPress={() => setFrontImageVisible(true)}
                        >
                            <Text style={AddEquipmentStyle.addimagecontainer}>Add Front Image</Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addFrontImage ? (
                            <View style={AddEquipmentStyle.imgcontainer}>
                                <View style={AddEquipmentStyle.imageshow}>
                                    <Image source={{ uri: addFrontImage }}
                                        style={AddEquipmentStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddEquipmentStyle.deleteButton}
                                        onPress={() => { handleCancelFrontImage() }}
                                    >
                                        <Text style={AddEquipmentStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={frontImageVisible} setIsVisible={setFrontImageVisible}
                            setSelectedImageURI={handleAddFrontImage}
                        />
                    </View>

                    <View style={AddEquipmentStyle.bottomimage}>
                        <TouchableOpacity style={AddEquipmentStyle.ImageContainer}
                            onPress={() => setBackImageVisible(true)}
                        >
                            <Text style={AddEquipmentStyle.addimagecontainer}>Add Back Image</Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addBackImage ? (
                            <View style={AddEquipmentStyle.imgcontainer}>
                                <View style={AddEquipmentStyle.imageshow}>
                                    <Image source={{ uri: addBackImage }}
                                        style={AddEquipmentStyle.selectedimg}
                                    />
                                    <TouchableOpacity style={AddEquipmentStyle.deleteButton}
                                        onPress={() => { handleCancelBackImage() }}
                                    >
                                        <Text style={AddEquipmentStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            null
                        )}

                        <CustomeImage isVisible={backImageVisible} setIsVisible={setBackImageVisible}
                            setSelectedImageURI={handleAddBackImage}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity style={AddEquipmentStyle.addtext} onPress={handleAddEquipmemts}>
                    <Text style={AddEquipmentStyle.addEquipmenttext}> Add Equipment </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddEquipments
