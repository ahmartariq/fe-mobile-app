import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { EmailInput, PasswordInput } from '../components/TextFields'
import { PrimaryButtons } from '../components/Buttons';

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    navigation.navigate('bottom-tab')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center' }}>


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
          <View style={{ width: "100%", marginBottom: 12 }}>
            <Text style={styles.label}>Passwort</Text>
            <PasswordInput value={password} onChangeText={setPassword} placeholder={"********"} />
          </View>

          {/* Passwort vergessen? */}
          <TouchableOpacity style={{ width: "100%", alignItems: 'flex-end' }} activeOpacity={0.5}>
            <Text style={{ color: "#4675F7", textDecorationLine: 'underline', textDecorationColor: "#4675F7", fontSize: 14, fontWeight: "500" }}>Passwort vergessen?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <View style={{ width: '100%', marginTop: 57 }}>
            <PrimaryButtons text='Login' onPress={handleLogin} />
          </View>

          {/* Noch keinen Account? */}
          <View style={{ width: '100%', marginTop: 26, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "#6D848D", fontSize: 14 }}>Noch keinen Account?</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('signup')}>
              <Text style={{ color: "#4675F7", fontSize: 14, fontWeight: "500" }}>Jetzt registrieren</Text>
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
    flex: 1,
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

export default Login
