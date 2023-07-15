import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Verification from '../Screens/Verification';
import UserInfo from '../Screens/UserInfo';
import BottomStack from './BottomStack';
import DrawerStack from './DrawerStack';
import Templates from '../Screens/Templates';
import Releases from '../Screens/Releases';
import Teams from '../Screens/Teams';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName='splash'>
            <Stack.Screen name="splash"
                component={Splash}
                options={{ headerShown: false }}
                initialParams={{ gotoscreen: 'login' }} />

            <Stack.Screen name="login"
                component={Login}
                options={{ headerShown: false }} />

            <Stack.Screen name="signup"
                component={SignUp}
                options={{ headerShown: false }} />

            <Stack.Screen name="verification"
                component={Verification}
                options={{ headerShown: false }} />

            <Stack.Screen name="user-info"
                component={UserInfo}
                options={{ headerShown: false }} />

            {/* <Stack.Screen name="bottom-tab"
                component={BottomStack}
                options={{ headerShown: false }} /> */}

            <Stack.Screen name="drawer-stack"
                component={DrawerStack}
                options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default MainStack;