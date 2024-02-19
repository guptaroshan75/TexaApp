import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Components/Splash';
import Login from './Login';
import SignUp from './SignUp';
import DrawerNavigator from '../Components/DrawerNavigator';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';

const Stack = createNativeStackNavigator();

const LoginScreenNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default LoginScreenNavigator