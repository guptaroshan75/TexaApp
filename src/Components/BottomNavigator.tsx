import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Dashboard from '../Screen/Dashboard';
import Shops from '../Screen/Manage_Shops/Shops';
import Profile from '../Screen/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Bottom = createBottomTabNavigator();

interface BottomNavigator {
    navigation: any
}

const BottomNavigator: React.FC<BottomNavigator> = (props) => {
    return (
            <Bottom.Navigator screenOptions={{
                tabBarActiveTintColor: '#39A7FF',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                tabBarLabelStyle: { fontSize: 14 },
            }}>
                <Bottom.Screen name='Home' component={Dashboard} options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="view-dashboard" color={color} size={25} />
                    ),
                }} />
                <Bottom.Screen name='Shops' component={Shops} options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="shopping" size={25} color={color} />
                    ),
                }} />
                <Bottom.Screen name='Profile' component={Profile} options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={25} color={color} />
                    ),
                }} />
            </Bottom.Navigator>
    )
}

export default BottomNavigator