import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomSideDrawer from './CustomSideDrawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight } from "react-native-responsive-dimensions";
import Shops from '../Screen/Manage_Shops/Shops'
import ManageDosages from '../Screen/Manage_Dosages/ManageDosages'
import ManageEquipments from '../Screen/Manage_Equipments/ManageEquipments'
import RaiseQuery from '../Screen/Raise_Query/RaiseQuery';
import CreateOneTime from '../Screen/Create_One_Time_Access/CreateOneTime';
import BottomNavigator from './BottomNavigator';

interface DrawerNavigator {
  navigation: any
}

const Drawer = createDrawerNavigator()

const DrawerNavigator: React.FC<DrawerNavigator> = (props) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomSideDrawer {...props} />} screenOptions={{
      headerShown: false, drawerLabelStyle: { fontSize: 14, color: "#000" },
      drawerActiveTintColor: '#00aaf0',
    }} >
      <Drawer.Screen name="Dashboard" component={BottomNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="view-dashboard" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />

      <Drawer.Screen name="Manage Shops" component={Shops}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="shopping" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />

      <Drawer.Screen name="Manage Dosages" component={ManageDosages}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="eyedropper" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />

      <Drawer.Screen name="Manage Equipments" component={ManageEquipments}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="hammer-screwdriver" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />

      <Drawer.Screen name="Raise A Query" component={RaiseQuery}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="progress-question" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />

      <Drawer.Screen name="Create One Time Access" component={CreateOneTime}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon name="progress-question" size={responsiveHeight(3.3)}
              color={focused ? '#00aaf0' : 'black'} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator