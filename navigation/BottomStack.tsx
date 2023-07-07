import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Contact from '../Screens/Contact';
import { SvgXml } from 'react-native-svg';
import Home from '../Screens/Home';
import Connect from '../Screens/Connect';
import More from '../Screens/More';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { View } from 'react-native';
import AddButton from '../components/AddButton';

const HomeIcon = ({ focused, color, size }: { focused: boolean, color: string, size: number }) => (
    <View style={{ flexDirection: "column", alignItems: 'center' }}>
        <SvgXml
            width={size}
            height={size}
            xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.26837 2.60328L3.32754 6.45328C2.50254 7.09495 1.83337 8.46078 1.83337 9.49661V16.2891C1.83337 18.4158 3.56587 20.1574 5.69254 20.1574H16.3075C18.4342 20.1574 20.1667 18.4158 20.1667 16.2983V9.62494C20.1667 8.51578 19.4242 7.09495 18.5167 6.46245L12.8517 2.49328C11.5684 1.59495 9.50587 1.64078 8.26837 2.60328Z" stroke="${focused ? '#3D3D3D' : '#7C8488'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11 16.4908V13.7408" stroke="${focused ? '#3D3D3D' : '#7C8488'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`} />
        <View style={{ width: 5, height: 5, borderRadius: 4, backgroundColor: focused ? "#3D3D3D" : "white", marginTop: 5 }}></View>
    </View>
)

const ContactIcon = ({ focused, color, size }: { focused: boolean, color: string, size: number }) => (
    <View style={{ flexDirection: "column", alignItems: 'center' }}>
        <SvgXml
            width={size}
            height={size}
            xml={`<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 16.0416C7.76998 16.0416 2.33331 17.4066 2.33331 20.1249V22.1666H18.6666V20.1249C18.6666 17.4066 13.23 16.0416 10.5 16.0416ZM5.06331 19.8333C6.04331 19.1566 8.41165 18.3749 10.5 18.3749C12.5883 18.3749 14.9566 19.1566 15.9366 19.8333H5.06331ZM10.5 13.9999C12.7516 13.9999 14.5833 12.1683 14.5833 9.91659C14.5833 7.66492 12.7516 5.83325 10.5 5.83325C8.24831 5.83325 6.41665 7.66492 6.41665 9.91659C6.41665 12.1683 8.24831 13.9999 10.5 13.9999ZM10.5 8.16659C11.4683 8.16659 12.25 8.94825 12.25 9.91659C12.25 10.8849 11.4683 11.6666 10.5 11.6666C9.53165 11.6666 8.74998 10.8849 8.74998 9.91659C8.74998 8.94825 9.53165 8.16659 10.5 8.16659ZM18.7133 16.1116C20.0666 17.0916 21 18.3983 21 20.1249V22.1666H25.6666V20.1249C25.6666 17.7683 21.5833 16.4266 18.7133 16.1116ZM17.5 13.9999C19.7516 13.9999 21.5833 12.1683 21.5833 9.91659C21.5833 7.66492 19.7516 5.83325 17.5 5.83325C16.87 5.83325 16.2866 5.98492 15.75 6.24159C16.485 7.27992 16.9166 8.55159 16.9166 9.91659C16.9166 11.2816 16.485 12.5533 15.75 13.5916C16.2866 13.8483 16.87 13.9999 17.5 13.9999Z" fill="${focused ? '#3D3D3D' : '#7C8488'}"/>
        </svg>`} />
        <View style={{ width: 5, height: 5, borderRadius: 4, backgroundColor: focused ? "#3D3D3D" : "white", marginTop: 5 }}></View>
    </View>
)

const ConnectIcon = ({ focused, color, size }: { focused: boolean, color: string, size: number }) => (
    <View style={{ flexDirection: "column", alignItems: 'center' }}>

        <SvgXml
            width={size}
            height={size}
            xml={`<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.3625 25C7.63681 25 7.01997 24.735 6.51198 24.2049C6.00399 23.6748 5.75 23.0312 5.75 22.2739C5.75 21.5167 6.00399 20.873 6.51198 20.3429C7.01997 19.8129 7.63681 19.5478 8.3625 19.5478C8.57639 19.5478 8.76354 19.5678 8.92396 19.6076C9.08437 19.6475 9.24861 19.7072 9.41667 19.787L11.3646 17.2522C11.0743 16.8855 10.8528 16.467 10.7 15.9967C10.5472 15.5264 10.509 15.0362 10.5854 14.5261L7.8125 13.5457C7.58333 13.9442 7.2816 14.2551 6.90729 14.4783C6.53299 14.7014 6.10139 14.813 5.6125 14.813C4.88681 14.813 4.26997 14.548 3.76198 14.0179C3.25399 13.4879 3 12.8442 3 12.087C3 11.3297 3.25399 10.6861 3.76198 10.156C4.26997 9.62591 4.88681 9.36087 5.6125 9.36087C6.33819 9.36087 6.95503 9.62591 7.46302 10.156C7.97101 10.6861 8.225 11.3297 8.225 12.087V12.1826L11.0208 13.187C11.2958 12.6768 11.6281 12.2862 12.0177 12.0152C12.4073 11.7442 12.8389 11.5529 13.3125 11.4413V8.35652C12.7167 8.18116 12.2469 7.83841 11.9031 7.32826C11.5594 6.81812 11.3875 6.28406 11.3875 5.72609C11.3875 4.96884 11.6415 4.32518 12.1495 3.79511C12.6575 3.26504 13.2743 3 14 3C14.7257 3 15.3425 3.26504 15.8505 3.79511C16.3585 4.32518 16.6125 4.96884 16.6125 5.72609C16.6125 6.28406 16.4368 6.81812 16.0854 7.32826C15.734 7.83841 15.2681 8.18116 14.6875 8.35652V11.4413C15.1611 11.5529 15.5965 11.7442 15.9938 12.0152C16.391 12.2862 16.7271 12.6768 17.0021 13.187L19.775 12.1826V12.087C19.775 11.3297 20.029 10.6861 20.537 10.156C21.045 9.62591 21.6618 9.36087 22.3875 9.36087C23.1132 9.36087 23.73 9.62591 24.238 10.156C24.746 10.6861 25 11.3297 25 12.087C25 12.8442 24.746 13.4879 24.238 14.0179C23.73 14.548 23.1132 14.813 22.3875 14.813C21.8986 14.813 21.4632 14.7014 21.0813 14.4783C20.6993 14.2551 20.4014 13.9442 20.1875 13.5457L17.4146 14.5261C17.491 15.0362 17.4566 15.5264 17.3115 15.9967C17.1663 16.467 16.941 16.8855 16.6354 17.2522L18.5833 19.787C18.7514 19.7072 18.9156 19.6475 19.076 19.6076C19.2365 19.5678 19.4203 19.5478 19.6275 19.5478C20.3675 19.5478 20.9896 19.8129 21.4937 20.3429C21.9979 20.873 22.25 21.5167 22.25 22.2739C22.25 23.0312 21.996 23.6748 21.488 24.2049C20.98 24.735 20.3632 25 19.6375 25C18.9118 25 18.295 24.735 17.787 24.2049C17.279 23.6748 17.025 23.0312 17.025 22.2739C17.025 21.9551 17.067 21.6681 17.151 21.413C17.2351 21.158 17.3535 20.9109 17.5063 20.6717L15.5583 18.137C15.0675 18.408 14.5438 18.5435 13.9871 18.5435C13.4304 18.5435 12.9076 18.408 12.4187 18.137L10.4938 20.6957C10.6465 20.9348 10.7649 21.1779 10.849 21.425C10.933 21.6721 10.975 21.9551 10.975 22.2739C10.975 23.0312 10.721 23.6748 10.213 24.2049C9.70503 24.735 9.08819 25 8.3625 25ZM5.6133 13.3783C5.96416 13.3783 6.25799 13.2544 6.49479 13.0068C6.7316 12.7591 6.85 12.4522 6.85 12.0861C6.85 11.72 6.73133 11.4134 6.49399 11.1663C6.25665 10.9192 5.96255 10.7957 5.6117 10.7957C5.26084 10.7957 4.96701 10.9195 4.73021 11.1671C4.4934 11.4148 4.375 11.7217 4.375 12.0878C4.375 12.4539 4.49367 12.7605 4.73101 13.0076C4.96835 13.2547 5.26245 13.3783 5.6133 13.3783ZM8.3633 23.5652C8.71416 23.5652 9.00799 23.4414 9.24479 23.1937C9.4816 22.9461 9.6 22.6392 9.6 22.2731C9.6 21.907 9.48133 21.6004 9.24399 21.3533C9.00665 21.1062 8.71255 20.9826 8.3617 20.9826C8.01084 20.9826 7.71701 21.1064 7.48021 21.3541C7.2434 21.6018 7.125 21.9086 7.125 22.2747C7.125 22.6409 7.24367 22.9475 7.48101 23.1946C7.71835 23.4417 8.01245 23.5652 8.3633 23.5652ZM14.0008 7.01739C14.3517 7.01739 14.6455 6.89356 14.8823 6.6459C15.1191 6.39824 15.2375 6.09136 15.2375 5.72525C15.2375 5.35914 15.1188 5.05254 14.8815 4.80543C14.6441 4.55833 14.3501 4.43478 13.9992 4.43478C13.6483 4.43478 13.3545 4.55861 13.1177 4.80627C12.8809 5.05393 12.7625 5.36081 12.7625 5.72692C12.7625 6.09303 12.8812 6.39964 13.1185 6.64674C13.3559 6.89384 13.6499 7.01739 14.0008 7.01739ZM14.0115 17.1087C14.5844 17.1087 15.0694 16.8975 15.4667 16.475C15.8639 16.0525 16.0625 15.5424 16.0625 14.9446C16.0625 14.3467 15.8631 13.8406 15.4644 13.4261C15.0656 13.0116 14.5775 12.8043 14 12.8043C13.4347 12.8043 12.9497 13.0124 12.5448 13.4285C12.1399 13.8446 11.9375 14.3539 11.9375 14.9565C11.9375 15.5464 12.1399 16.0525 12.5448 16.475C12.9497 16.8975 13.4385 17.1087 14.0115 17.1087ZM19.6383 23.5652C19.9892 23.5652 20.283 23.4414 20.5198 23.1937C20.7566 22.9461 20.875 22.6392 20.875 22.2731C20.875 21.907 20.7563 21.6004 20.519 21.3533C20.2817 21.1062 19.9876 20.9826 19.6367 20.9826C19.2858 20.9826 18.992 21.1064 18.7552 21.3541C18.5184 21.6018 18.4 21.9086 18.4 22.2747C18.4 22.6409 18.5187 22.9475 18.756 23.1946C18.9934 23.4417 19.2874 23.5652 19.6383 23.5652ZM22.3883 13.3783C22.7392 13.3783 23.033 13.2544 23.2698 13.0068C23.5066 12.7591 23.625 12.4522 23.625 12.0861C23.625 11.72 23.5063 11.4134 23.269 11.1663C23.0317 10.9192 22.7376 10.7957 22.3867 10.7957C22.0358 10.7957 21.742 10.9195 21.5052 11.1671C21.2684 11.4148 21.15 11.7217 21.15 12.0878C21.15 12.4539 21.2687 12.7605 21.506 13.0076C21.7434 13.2547 22.0374 13.3783 22.3883 13.3783Z" fill="${focused ? '#3D3D3D' : '#7C8488'}"/>
        </svg>`} />
        <View style={{ width: 5, height: 5, borderRadius: 4, backgroundColor: focused ? "#3D3D3D" : "white", marginTop: 5 }}></View>
    </View>
)

const MoreIcon = ({ focused, color, size }: { focused: boolean, color: string, size: number }) => (
    <View style={{ flexDirection: "column", alignItems: 'center' }}>

        <SvgXml
            width={size}
            height={size}
            xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6667 11.825V15.675C14.6667 18.8834 13.3833 20.1667 10.175 20.1667H6.32501C3.11668 20.1667 1.83334 18.8834 1.83334 15.675V11.825C1.83334 8.61671 3.11668 7.33337 6.32501 7.33337H10.175C13.3833 7.33337 14.6667 8.61671 14.6667 11.825Z" stroke="${focused ? '#3D3D3D' : '#7C8488'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.1667 6.32504V10.175C20.1667 13.3834 18.8833 14.6667 15.675 14.6667H14.6667V11.825C14.6667 8.61671 13.3833 7.33337 10.175 7.33337H7.33334V6.32504C7.33334 3.11671 8.61668 1.83337 11.825 1.83337H15.675C18.8833 1.83337 20.1667 3.11671 20.1667 6.32504Z" stroke="${focused ? '#3D3D3D' : '#7C8488'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`} />
        <View style={{ width: 5, height: 5, borderRadius: 4, backgroundColor: focused ? "#3D3D3D" : "white", marginTop: 5 }}></View>
    </View>
)

const BottomStack = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            safeAreaInsets={{
                bottom: 5,
            }}
            screenOptions={{
                tabBarStyle: {
                    ...styles.boxShadow,
                    borderTopColor: 'transparent',
                    height: 69,
                    alignItems: 'center',
                    paddingHorizontal: 0,
                    marginHorizontal: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                },
            }}
            initialRouteName="home">

            {/* Home */}
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: HomeIcon,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                    },
                }}
            />

            {/* Contact */}
            <Tab.Screen
                name="contact"
                component={Contact}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ContactIcon,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                    },
                }}
            />

            {/* Add Button*/}
            <Tab.Screen
                name="add"
                component={AddButton}
                options={{
                    tabBarButton: () => (<AddButton />),
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                    },
                }}
            />

            <Tab.Screen
                name="connect"
                component={Connect}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ConnectIcon,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                    },
                }}
            />

            <Tab.Screen
                name="more"
                component={More}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: MoreIcon,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        color: 'black',
                        fontWeight: 'bold',
                    },
                }}
            />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    boxShadow: {
        backgroundColor: '#ffffff', // Set the background color as needed
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default BottomStack
