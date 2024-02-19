import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { CardBase } from '@rneui/base/dist/Card/Card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomeTextLable from '../../Components/CustomeTextLable';
import ViewShopStyle from '../../Css/ManageShopsStyle/ViewShopStyle';
import { Shop_Base_Url } from '../../BaseUrl/BaseUrl';
import Loader from '../../Components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

interface ViewShops {
    checkVisible: any,
    isLoading: any,
}

const ViewShops: React.FC<ViewShops> = ({ checkVisible, isLoading }) => {
    const { single_shop } = useSelector((state: RootState) => state.allshops);

    if (!single_shop) {
        return <Loader loading={isLoading} />
    }

    const applicationTypeProducts: { [key: string]: any[] } = {};
    if (single_shop.applicationType && single_shop.shop_product) {
        single_shop.shop_product.forEach((productMap: any) => {
            const [appTypeId, productIds] = Object.entries(productMap)[0];
            const products = single_shop.applicationType.find((appType: any) => appType.id === Number(appTypeId))?.products || [];
            const filteredProducts = products.filter((product: any) => productIds.includes(product.id));
            applicationTypeProducts[appTypeId] = filteredProducts;
        });
    }

    return (
        <View>
            <TouchableOpacity style={ViewShopStyle.headder}>
                <TouchableOpacity style={{ marginLeft: 15 }}
                    onPress={() => checkVisible(false)}
                >
                    <Image source={require('../../Images/back.png')} style={ViewShopStyle.back} />
                </TouchableOpacity>

                <Text style={ViewShopStyle.headerText}> View Shops </Text>
            </TouchableOpacity>

                <Loader loading={isLoading} />

                <ScrollView style={{ marginVertical: 23 }}>
                    <CardBase>
                        <View style={ViewShopStyle.shopContainer}>
                            <Text style={ViewShopStyle.shoptitle}> Contact Details </Text>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <TouchableOpacity style={ViewShopStyle.statusButton}>
                                    <AntDesign name={'check'} size={15} color="white" />
                                </TouchableOpacity>
                                <Text style={ViewShopStyle.statusText}> Active </Text>
                            </View>
                        </View>

                        <CustomeTextLable lable={'Shop Name :'} value={single_shop.shop.shop_name} />
                        <CustomeTextLable lable={'Contact Person :'}
                            value={single_shop.shop.shop_contact_person}
                        />
                        <CustomeTextLable lable={'Email :'} value={single_shop.shop.email} />
                        <CustomeTextLable lable={'Phone Number :'}
                            value={`(+${single_shop.shop.country_code}) ${single_shop.shop.phone}`}
                        />
                    </CardBase>

                    <CardBase>
                        <Text style={ViewShopStyle.productlist}> Products List </Text>
                        {Object.keys(applicationTypeProducts).map((appTypeId) => {
                            const appType = single_shop.applicationType.find((app: any) => app.id === Number(appTypeId));
                            return (
                                <View key={appTypeId} >
                                    {applicationTypeProducts[appTypeId].map((product: any) => (
                                        <CustomeTextLable key={product.id}
                                            lable={`${appType?.application_type} =>`}
                                            value={product.product_name}
                                        />
                                    ))}
                                </View>
                            )
                        })}
                    </CardBase>

                    <View style={{ marginBottom: 55 }}>
                        <CardBase>
                            <Text style={ViewShopStyle.imageList}>Images</Text>
                            <View style={ViewShopStyle.viewImage}>
                                {single_shop.image && single_shop.image.map((imageUrl: string, index: number) => (
                                    <Image key={index} style={ViewShopStyle.imges}
                                        source={{ uri: `${Shop_Base_Url}/${imageUrl}` }}
                                    />
                                ))}
                            </View>
                        </CardBase>
                    </View>
                </ScrollView>
            {/* // )} */}
        </View>
    )
}

export default ViewShops