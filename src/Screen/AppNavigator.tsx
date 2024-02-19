import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../Components/DrawerNavigator';
import LoginScreenNavigator from './LoginScreenNavigator';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="LoginScreenNavigator" component={LoginScreenNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator