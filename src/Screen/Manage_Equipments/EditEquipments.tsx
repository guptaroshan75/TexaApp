import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import CustomeImage from '../../Components/CustomeImage';
import EditEquipmentStyle from '../../Css/ManageEquipmentStyle/EditEquipmentStyle';
import { RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { editEquipment, getAllEquipmentdata, getAlldata } from '../../Redux/Features/EquipmentsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api, Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import axios from 'axios';
import CustomeSelectMachineType from '../../Components/CustomeSelectMachineType';
import CutomeTextNumber from '../../Components/CutomeTextNumber';
import Loader from '../../Components/Loader';
import CustomeEditShowModel from '../../Components/CustomeEditShowModel';
import CustomeEditShowMachineType from '../../Components/CustomeEditShowMachineType';

interface EditEquipments {
    checkVisible: (visible: boolean) => void;
    closeModal: () => void;
}

const EditEquipments: React.FC<EditEquipments> = ({ checkVisible, closeModal }) => {
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
    const { get_edit_equipment } = useSelector((state: RootState) => state.equipments);
    const userId = get_user ? get_user.id : '';
    const equipmentId: number = get_edit_equipment ? get_edit_equipment?.data?.id : '';

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

    const handleAddFrontImage = (imageURI: string) => {
        setAddFrontImage(imageURI);
        setFrontImageVisible(false);
    }

    const handleAddBackImage = (imageURI: string) => {
        setaddBackImage(imageURI);
        setBackImageVisible(false);
    };

    const handleCancelFrontImage = async (equipmenId: number) => {
        setAddFrontImage('');
        setFrontImageVisible(false);
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('No');
                    },
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        { isLoading ? (<Loader loading={isLoading} />) : null }
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            try {
                                await axios.delete(`${Api}/delete-equipment-front-image/${equipmenId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                dispatch(editEquipment(equipmenId))
                                setAddFrontImage('');
                            } catch (error) {
                                console.log('Delete image error:', error);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleCancelBackImage = async (equipmenId: number) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this image?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        console.log('No');
                    },
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        { isLoading ? (<Loader loading={isLoading} />) : null }
                        const token = await AsyncStorage.getItem('token');
                        if (token) {
                            try {
                                await axios.delete(`${Api}/delete-equipment-back-image/${equipmenId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                dispatch(editEquipment(equipmenId))
                                setaddBackImage('');
                            } catch (error) {
                                console.log('Delete image error:', error);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
        setaddBackImage('');
        setBackImageVisible(false);
    };

    const handleBrandname = () => {
        setBrandname(get_edit_equipment?.data?.brand_name)
    }

    const handleMachineName = () => {
        setMachineName(get_edit_equipment?.data?.machine_name)
    }

    const handleModelName = () => {
        setModelName(get_edit_equipment?.data?.model_name)
    }

    const handleInstallationYear = () => {
        setInstallationYear(get_edit_equipment?.data?.install_year)
    }

    const [selectedShop, setSelectedShop] = useState<any>(null);
    const [showMachineType, setShowMachineType] = useState<any>(null);
    const [showDosage, setShowDosage] = useState<any>(null);

    const shopIdGet = get_edit_equipment?.data?.shop_id;
    const machineTypeIdGet = get_edit_equipment?.data?.machine_type;
    const dosageIdGet = get_edit_equipment?.data?.dosage;
    const dosageOtherIdGet = get_edit_equipment?.data?.other_dosage;

    const handleShowShopName = () => {
        if (get_edit_equipment && shopData) {
            const selectedShopData = shopData.find((shop: any) => shop.id === shopIdGet);
            if (selectedShopData) {
                setSelectedShop(selectedShopData);
            }
        }
    }

    const handleShowMachineType = () => {
        if (get_edit_equipment && machineTypeData) {
            const selectedMachine = machineTypeData.find((machine: any) => machine.id === machineTypeIdGet);
            if (selectedMachine) {
                setShowMachineType(selectedMachine);
            }
        }
    }

    const handleShowDosageEquipments = () => {
        if (get_edit_equipment && dosageEquipment) {
            const showdosages = dosageEquipment.find((dosage: any) => dosage.id === dosageIdGet);
            if (showdosages) {
                setShowDosage(showdosages);
            }
        }
    }

    useEffect(() => {
        handleBrandname()
        handleMachineName()
        handleModelName()
        handleInstallationYear()
        dispatch(getAlldata(userId))
        handleShowShopName()
        handleShowMachineType()
        handleShowDosageEquipments()
    }, [dispatch, userId, equipmentId])

    const handleShopSelect = (id: any,) => {
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

    const handleUpdateEquipmemts = async () => {
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
            const response = await axios.post(`${Api}/update-equipment/${equipmentId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            closeModal()
            dispatch(getAllEquipmentdata(userId));
            console.log('Update Equipmemts', response.data);
        } catch (error) {
            console.log('Update Equipmemts error:', error);
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

    const handleFinshingEquipments = () => {
        setFinishing(get_edit_equipment?.data?.fe_finishing_equipment_type)
    }

    const handleDryerType = () => {
        setDryer(get_edit_equipment?.data?.dryer_type)
    }

    useEffect(() => {
        handleFinshingEquipments()
        handleDryerType()
    }, [get_edit_equipment])

    const handleSelectProgramType = (item: any) => {
        setProgramType(item)
    }

    const handleSelectMachionType = (item: any) => {
        setMachionType(item)
    }

    const handleSelectHeatType = (item: any) => {
        setWmHeatType(item)
    }

    const dctankShow = get_edit_equipment?.data?.dc_no_tank;
    const dcHeatTypeShow = get_edit_equipment?.data?.dc_heat_Type;
    const dcSolventShow = get_edit_equipment?.data?.dc_solvent
    const dcFilterShow = get_edit_equipment?.data?.dc_filter
    const dcFrequencyShow = get_edit_equipment?.data?.dc_frequency_motor
    const dcSprayShow = get_edit_equipment?.data?.dc_spray_unit
    const dcSolventCoolingShow = get_edit_equipment?.data?.dc_solvent_cooling_system
    const dcDistillationShow = get_edit_equipment?.data?.dc_distilation
    const dcDistillationTypeShow = get_edit_equipment?.data?.dc_distilation_type
    const dcDistillationMethodShow = get_edit_equipment?.data?.dc_distilation_method

    const wmMachineTypeShow = get_edit_equipment?.data?.wm_machion_type
    const wmHeatTypeshow = get_edit_equipment?.data?.wm_heat_type
    const wmVolume = get_edit_equipment?.data?.wm_volume
    const wmProgramTypeShow = get_edit_equipment?.data?.wm_program_type

    const drDryerVolume = get_edit_equipment?.data?.dryer_volume
    const dcdryerProgramNumber = get_edit_equipment?.data?.dryer_program_number
    const dcdryerProgramName = get_edit_equipment?.data?.dryer_program_name
    const capacityIdGet = get_edit_equipment?.data?.capacity + ' kg';

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
        <View style={EditEquipmentStyle.container}>
            <TouchableOpacity style={EditEquipmentStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={EditEquipmentStyle.back} />
                </TouchableOpacity>

                <Text style={EditEquipmentStyle.headerText}> Edit Equipment </Text>
            </TouchableOpacity>

            <View style={EditEquipmentStyle.maincontainer}>
                <ScrollView>
                    <CustomeEditShowModel responses={shopData} loading={isLoading}
                        placeholder={'Select Shop Name'} lable={'Shop Name'}
                        setSelectedValue={handleShopSelect}
                        selectedShowValue={selectedShop}
                    />

                    <CustomeEditShowModel responses={machineTypeData} loading={isLoading}
                        placeholder={'Select Machine Type'} lable={'Machine Type'}
                        setSelectedValue={handleMachineTypeSelect}
                        selectedShowValue={showMachineType}
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

                    <CustomeEditShowMachineType responses={capacities} loading={isLoading}
                        placeholder={'Select Capacity'} lable={'Capacity'}
                        setSelectedValue={handleCapacitySelect}
                        selectedShowValue={capacityIdGet}
                    />

                    <CutomeTextNumber title={'Installation Year'} value={InstallationYear}
                        placeholder={"Installation Year"}
                        onChangeText={(InstallationYear) => setInstallationYear(InstallationYear)}
                    />

                    {showMachineType && showMachineType?.name === 'Fishing Equipment' && (
                        <>
                            <CustomTextInput title={'Finishing Equipment Type'}
                                value={fe_finishing_equipment_type} placeholder={"Finishing Equipment Type"}
                                onChangeText={(fe_finishing_equipment_type) => setFinishing(fe_finishing_equipment_type)}
                            />

                            <CustomeEditShowModel responses={dosageEquipment} loading={isLoading}
                                placeholder={'Select Dosage Equipments'} lable={'Dosage Equipments'}
                                setSelectedValue={handleDosageSelect}
                                selectedShowValue={showDosage}
                            />

                            {selectedDosageType === 'Other' && (
                                <CustomTextInput title={'Other Dosage Equipment'}
                                    value={selectedDosageOther} placeholder={"Enter Dosage Equipment"}
                                    onChangeText={(selectedDosageOther) => setSelectedDosageOther(selectedDosageOther)}
                                />
                            )}

                            {showDosage?.name === 'Other' && (
                                <CustomTextInput title={'Other Dosage Equipment'}
                                    value={dosageOtherIdGet} placeholder={"Enter Dosage Equipment"}
                                    onChangeText={(selectedDosageOther) => setSelectedDosageOther(selectedDosageOther)}
                                />
                            )}
                        </>
                    )}

                    <View style={EditEquipmentStyle.main}>
                        <TouchableOpacity style={EditEquipmentStyle.ImageContainer}
                            onPress={() => setFrontImageVisible(true)}
                        >
                            <Text style={EditEquipmentStyle.addimagecontainer}>Add Front Image</Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addFrontImage || get_edit_equipment?.data?.front_image ? (
                            <View style={EditEquipmentStyle.imgcontainer}>
                                <View style={EditEquipmentStyle.imageshow}>
                                    <Image style={EditEquipmentStyle.selectedimg}
                                        source={{ uri: addFrontImage || `${Shop_Base_Url}/${get_edit_equipment?.data?.front_image}` }}
                                    />
                                    <TouchableOpacity style={EditEquipmentStyle.deleteButton}
                                        onPress={() => handleCancelFrontImage(equipmentId)}
                                    >
                                        <Text style={EditEquipmentStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}

                        <CustomeImage isVisible={frontImageVisible} setIsVisible={setFrontImageVisible}
                            setSelectedImageURI={handleAddFrontImage}
                        />
                    </View>

                    <View style={EditEquipmentStyle.bottomimage}>
                        <TouchableOpacity style={EditEquipmentStyle.ImageContainer}
                            onPress={() => setBackImageVisible(true)}
                        >
                            <Text style={EditEquipmentStyle.addimagecontainer}>Add Back Image</Text>
                            <FontAwesome6 name={'plus'} size={18} color="#00aaf0" />
                        </TouchableOpacity>

                        {addBackImage || get_edit_equipment?.data?.back_image ? (
                            <View style={EditEquipmentStyle.imgcontainer}>
                                <View style={EditEquipmentStyle.imageshow}>
                                    <Image style={EditEquipmentStyle.selectedimg}
                                        source={{ uri: addBackImage || `${Shop_Base_Url}/${get_edit_equipment?.data?.back_image}` }}
                                    />
                                    <TouchableOpacity style={EditEquipmentStyle.deleteButton}
                                        onPress={() => handleCancelBackImage(equipmentId)}
                                    >
                                        <Text style={EditEquipmentStyle.deleteButtonText}> X </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}

                        <CustomeImage isVisible={backImageVisible} setIsVisible={setBackImageVisible}
                            setSelectedImageURI={handleAddBackImage}
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity style={EditEquipmentStyle.addtext} onPress={handleUpdateEquipmemts}>
                    <Text style={EditEquipmentStyle.addEquipmenttext}> Update Equipment </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditEquipments;