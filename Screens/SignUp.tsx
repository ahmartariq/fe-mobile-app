import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { EmailInput, PasswordInput } from '../components/TextFields'
import { PrimaryButtons } from '../components/Buttons';
import { Icon } from '@rneui/themed';
import { SvgXml } from 'react-native-svg';

const check = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6643 0.911377C16.1107 1.37524 16.1107 2.12856 15.6643 2.59243L6.52142 12.0924C6.07499 12.5563 5.34999 12.5563 4.90356 12.0924L0.332136 7.34243C-0.114293 6.87857 -0.114293 6.12524 0.332136 5.66138C0.778565 5.19751 1.50356 5.19751 1.94999 5.66138L5.71428 9.56899L14.05 0.911377C14.4964 0.44751 15.2214 0.44751 15.6679 0.911377H15.6643Z" fill="#383838"/>
</svg>`


const SignUp = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleRegister = () => {
    if (checked) {
      navigation.navigate('verification')
    }
  }
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>

      <ScrollView style={styles.container}>

        <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo-black.png")} resizeMode='contain' style={styles.logo} />
          </View>

          {/* Email */}
          <View style={{ width: "100%", marginBottom: 28 }}>
            <Text style={styles.label}>Email</Text>
            <EmailInput value={email} onChangeText={setEmail} placeholder={"abc@xyz.com"} />
          </View>

          {/* Passwort */}
          <View style={{ width: "100%", marginBottom: 28 }}>
            <Text style={styles.label}>Passwort</Text>
            <PasswordInput value={password} onChangeText={setPassword} placeholder={"********"} />
          </View>

          {/* Passwort */}
          <View style={{ width: "100%", marginBottom: 19 }}>
            <Text style={styles.label}>Passwort wiederholen</Text>
            <PasswordInput value={password} onChangeText={setPassword} placeholder={"********"} />
          </View>

          {/* Checkbox */}
          <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ width: 25, height: 25, marginRight: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "#949F99", borderRadius: 9, }}
              onPress={() => setChecked(!checked)}>
              <SvgXml style={{ display: checked ? "flex" : 'none' }} xml={check} width={16} height={16} />
            </TouchableOpacity>
            <View style={{ width: '90%' }}>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "#383838" }}>Ich akzeptiere die <Text style={{ fontSize: 10, fontWeight: "700", color: "#383838", textDecorationLine: "underline", textDecorationColor: "#383838" }}>Allgemeinen Geschäftsbedingungen</Text> und erkläre mich der <Text style={{ fontSize: 10, fontWeight: "700", color: "#383838", textDecorationLine: "underline", textDecorationColor: "#383838" }}>Datenschutzerklärung</Text> einverstanden</Text>
            </View>
          </View>

          {/* Register Button */}
          <View style={{ width: '100%', marginTop: 44 }}>
            <PrimaryButtons text='Registrieren' onPress={handleRegister} />
          </View>

          {/* Du bist bereits registriert? */}
          <View style={{ width: '100%', marginTop: 26, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "#6D848D", fontSize: 14 }}>Du bist bereits registriert?</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('login')}>
              <Text style={{ color: "#4675F7", fontSize: 14, fontWeight: "500" }}>Zum Login</Text>
            </TouchableOpacity>
          </View>

          {/* OR */}
          <View style={{ position: 'relative', width: '100%', marginTop: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "#6D848D", fontSize: 16, fontWeight: "400" }}>oder</Text>
            <View style={{ position: 'absolute', top: "55%", left: "12%", borderTopWidth: 1, borderTopColor: "#949F99", width: '30%', height: 1 }}></View>
            <View style={{ position: 'absolute', top: "55%", right: "12%", borderTopWidth: 1, borderTopColor: "#949F99", width: '30%', height: 1 }}></View>
          </View>

          {/* Socials */}
          <View style={{ width: '100%', marginTop: 26, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
            <TouchableOpacity
              style={{ width: 54, height: 54, borderRadius: 100, borderColor: "#949F99", borderWidth: 1, backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              activeOpacity={0.5} onPress={() => { }}>
              <Image source={require("../assets/facebook.png")} resizeMode='contain' style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 54, height: 54, borderRadius: 100, borderColor: "#949F99", borderWidth: 1, backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              activeOpacity={0.5} onPress={() => { }}>
              <Image source={require("../assets/linkedin.png")} resizeMode='contain' style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 54, height: 54, borderRadius: 100, borderColor: "#949F99", borderWidth: 1, backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              activeOpacity={0.5} onPress={() => { }}>
              <Image source={require("../assets/google.png")} resizeMode='contain' style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 54, height: 54, borderRadius: 100, borderColor: "#949F99", borderWidth: 1, backgroundColor: "#FFFFFF", justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
              activeOpacity={0.5} onPress={() => { }}>
              <Image source={require("../assets/apple.png")} resizeMode='contain' style={{ width: 22, height: 22 }} />
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 26
  },
  logoContainer: {
    width: '50%',
    height: '10%',
    marginBottom: 35,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  label: {
    color: '#383838',
    fontSize: 14,
    fontWeight: '500',
  }
})

export default SignUp
