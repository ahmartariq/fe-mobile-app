import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native'
import { EmailInput, PasswordInput } from '../components/TextFields'
import { PrimaryButtons } from '../components/Buttons';
import { SvgXml } from 'react-native-svg';
import OtpField from '../components/OtpField';


const back = `<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5005 20.24L2.89384 12.6333C1.99551 11.735 1.99551 10.265 2.89384 9.36668L10.5005 1.76001" stroke="#1F1F1F" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`


const Verification = ({ navigation }: { navigation: any }) => {
    const [otp, setOtp] = useState('');
    const onChange = (value: string) => setOtp(value);

    const handleButton = () => {
        if (otp.length === 6) {
            navigation.navigate('user-info')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <ScrollView style={styles.container}>
                <View style={{ width: '100%', alignItems: 'center' }}>

                    {/* back button */}
                    <View style={styles.backContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={{ padding: 10 }}>
                            <SvgXml xml={back} width={12} height={21} />
                        </TouchableOpacity>
                    </View>

                    {/* Message Icon */}
                    <View style={styles.logoContainer}>
                        <Image source={require("../assets/message.png")} resizeMode='contain' style={styles.logo} />
                        <View style={{ width: "95%", alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: "600", color: "#383838", marginTop: 18 }}>Bitte bestätige deine Email</Text>
                            <Text style={{ fontSize: 16, fontWeight: "400", color: "#A9A4A4", marginTop: 8, textAlign: 'center' }}>Wir haben dir deinen Code  per Mail geschickt</Text>
                        </View>
                    </View>


                    <OtpField otpCodeChanged={onChange}/>

                    {/* Login Button */}
                    <View style={{ width: '100%', marginTop: 57 }}>
                        <PrimaryButtons text='Verifizieren' onPress={handleButton} />
                    </View>

                    {/* Noch keinen Account? */}
                    <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#6D848D", fontSize: 14 }}>Keinen Code erhalten?</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('signup')}>
                            <Text style={{ color: "#4675F7", fontSize: 14, fontWeight: "500", textDecorationColor: "#4675F7" , textDecorationLine: "underline"}}>Erneut senden</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 26
    },
    backContainer: {
        alignSelf: 'flex-start',
        paddingTop: 20
    },
    logoContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',

    },
    logo: {
        width: 47,
        height: 47,
    },
    label: {
        color: '#383838',
        fontSize: 14,
        fontWeight: '500',
    }
})

export default Verification
