import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { TextField } from '../components/TextFields'
import { SvgXml } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


const check = `<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6643 0.911377C16.1107 1.37524 16.1107 2.12856 15.6643 2.59243L6.52142 12.0924C6.07499 12.5563 5.34999 12.5563 4.90356 12.0924L0.332136 7.34243C-0.114293 6.87857 -0.114293 6.12524 0.332136 5.66138C0.778565 5.19751 1.50356 5.19751 1.94999 5.66138L5.71428 9.56899L14.05 0.911377C14.4964 0.44751 15.2214 0.44751 15.6679 0.911377H15.6643Z" fill="#383838"/>
</svg>`

const camera = `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3V0H5V3H8V5H5V8H3V5H0V3H3ZM6 9V6H9V3H16L17.83 5H21C22.1 5 23 5.9 23 7V19C23 20.1 22.1 21 21 21H5C3.9 21 3 20.1 3 19V9H6ZM13 18C15.76 18 18 15.76 18 13C18 10.24 15.76 8 13 8C10.24 8 8 10.24 8 13C8 15.76 10.24 18 13 18ZM9.8 13C9.8 14.77 11.23 16.2 13 16.2C14.77 16.2 16.2 14.77 16.2 13C16.2 11.23 14.77 9.8 13 9.8C11.23 9.8 9.8 11.23 9.8 13Z" fill="#6C6C6C"/>
</svg>`

const business = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 10C7.21181 10 5.97637 9.47322 5.06548 8.53553C4.15459 7.59785 3.64286 6.32608 3.64286 5C3.64286 3.67392 4.15459 2.40215 5.06548 1.46447C5.97637 0.526784 7.21181 0 8.5 0C9.78819 0 11.0236 0.526784 11.9345 1.46447C12.8454 2.40215 13.3571 3.67392 13.3571 5C13.3571 6.32608 12.8454 7.59785 11.9345 8.53553C11.0236 9.47322 9.78819 10 8.5 10ZM7.9346 14.0313L7.22879 12.8203C6.98594 12.4023 7.27813 11.875 7.74866 11.875H8.5H9.24754C9.71808 11.875 10.0103 12.4063 9.76741 12.8203L9.06161 14.0313L10.329 18.8711L11.6951 13.1328C11.771 12.8164 12.067 12.6094 12.3743 12.6914C15.0344 13.3789 17 15.8555 17 18.8008C17 19.4648 16.4763 20 15.835 20H10.8337C10.754 20 10.6819 19.9844 10.6136 19.957L10.625 20H6.375L6.38638 19.957C6.31808 19.9844 6.24219 20 6.16629 20H1.16496C0.523661 20 0 19.4609 0 18.8008C0 15.8516 1.96942 13.375 4.62567 12.6914C4.93304 12.6133 5.22902 12.8203 5.30491 13.1328L6.67098 18.8711L7.93839 14.0313H7.9346Z" fill="currentColor"/>
</svg>`

const person = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 10C9.78819 10 11.0236 9.47322 11.9345 8.53553C12.8454 7.59785 13.3571 6.32608 13.3571 5C13.3571 3.67392 12.8454 2.40215 11.9345 1.46447C11.0236 0.526784 9.78819 0 8.5 0C7.21181 0 5.97637 0.526784 5.06548 1.46447C4.15459 2.40215 3.64286 3.67392 3.64286 5C3.64286 6.32608 4.15459 7.59785 5.06548 8.53553C5.97637 9.47322 7.21181 10 8.5 10ZM6.76585 11.875C3.02813 11.875 0 14.9922 0 18.8398C0 19.4805 0.504688 20 1.12701 20H15.873C16.4953 20 17 19.4805 17 18.8398C17 14.9922 13.9719 11.875 10.2342 11.875H6.76585Z" fill="currentColor"/>
</svg>`

const rocket = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.74996 13.375C3.95454 13.375 3.23579 13.7009 2.71829 14.2184C1.58746 15.3492 0.916626 20.0834 0.916626 20.0834C0.916626 20.0834 5.65079 19.4125 6.78163 18.2817C7.29913 17.7642 7.62496 17.0455 7.62496 16.25C7.62496 14.6592 6.34079 13.375 4.74996 13.375ZM5.43038 16.9305C5.16204 17.1988 3.35079 17.6588 3.35079 17.6588C3.35079 17.6588 3.80121 15.8571 4.07913 15.5792C4.24204 15.3971 4.48163 15.2917 4.74996 15.2917C5.27704 15.2917 5.70829 15.723 5.70829 16.25C5.70829 16.5184 5.60288 16.758 5.43038 16.9305ZM15.6941 12.0813C21.7891 5.9863 19.7575 1.24255 19.7575 1.24255C19.7575 1.24255 15.0137 -0.789119 8.91871 5.30588L6.53246 4.82671C5.90954 4.70213 5.25788 4.90338 4.79788 5.3538L0.916626 9.24463L5.70829 11.2955L9.70454 15.2917L11.7554 20.0834L15.6366 16.2021C16.087 15.7517 16.2883 15.1 16.1637 14.4675L15.6941 12.0813ZM6.10121 9.3788L4.27079 8.59296L6.15871 6.70505L7.53871 6.98296C6.99246 7.77838 6.50371 8.61213 6.10121 9.3788ZM12.407 16.7292L11.6212 14.8988C12.3879 14.4963 13.2216 14.0075 14.0075 13.4613L14.2854 14.8413L12.407 16.7292ZM14.3333 10.73C13.0683 11.995 11.0941 13.03 10.4616 13.3463L7.65371 10.5384C7.96038 9.91546 8.99538 7.9413 10.27 6.66671C14.755 2.18171 18.157 2.84296 18.157 2.84296C18.157 2.84296 18.8183 6.24505 14.3333 10.73ZM13.375 9.54171C14.4291 9.54171 15.2916 8.67921 15.2916 7.62505C15.2916 6.57088 14.4291 5.70838 13.375 5.70838C12.3208 5.70838 11.4583 6.57088 11.4583 7.62505C11.4583 8.67921 12.3208 9.54171 13.375 9.54171Z" fill="white"/>
</svg>`


const UserInfo = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [use, setUse] = useState<number>(1);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // 1 for business, 2 for private
  const [image, setImage] = useState(null);

  const pickImage = async () => {

    requestPermission();

    if (permissionResponse?.granted === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
    else {
      console.log("Permission not granted")
    }
  };

  const handleButton = () => {
    navigation.navigate('bottom-tab')
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require("../assets/logo-black.png")} resizeMode='contain' style={styles.logo} />
          </View>

          {/* Name */}
          <View style={{ width: "100%", marginBottom: 34, alignItems: "center" }}>
            <Text style={styles.name}>Herzlich willkommen!</Text>
          </View>

          {/* Image Upload */}
          <View style={{ width: "100%", marginBottom: 28, alignItems: "center" }}>

            {
              image === null ?
                <TouchableOpacity onPress={pickImage} style={{ width: 120, height: 120, borderRadius: 100, backgroundColor: "#D9D9D9", borderWidth: 1, borderColor: "#C4C4C4", justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.5}>
                  <SvgXml xml={camera} width={23} height={21} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={pickImage} style={{ width: 120, height: 120, borderRadius: 100, backgroundColor: "#D9D9D9", borderWidth: 1, borderColor: "#C4C4C4", justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.5}>
                  <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 100}} />
                </TouchableOpacity>
            }
          </View>

          {/* First Name */}
          <View style={{ width: "100%", marginBottom: 28 }}>
            <Text style={styles.label}>Vorname</Text>
            <TextField value={firstName} onChangeText={setFirstName} placeholder={"John"} />
          </View>

          {/* Second Name */}
          <View style={{ width: "100%", marginBottom: 19 }}>
            <Text style={styles.label}>Nachname</Text>
            <TextField value={lastName} onChangeText={setLastName} placeholder={"Doe"} />
          </View>

          {/* Use */}
          <View style={{ width: "100%", marginBottom: 19 }}>
            <Text style={styles.label}>Wie nutzt du netsome?</Text>
            <View style={{ width: "100%", flexDirection: 'row', marginTop: 7 }}>
              <TouchableOpacity onPress={() => setUse(1)} activeOpacity={0.5} style={{ width: "50%", flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', height: 50, borderWidth: use === 1 ? 2 : 1, borderColor: use === 1 ? "#3C58F7" : "#949F99", borderTopLeftRadius: 9, borderBottomLeftRadius: 9 }}>
                <SvgXml xml={business} width={17} height={20} color={use === 1 ? "#3C58F7" : "#545454"} />
                <Text style={{ fontSize: 14, fontWeight: use === 1 ? "500" : "400", color: use === 1 ? "#3C58F7" : "#545454" }}>Geschäftlich</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUse(2)} activeOpacity={0.5} style={{ width: "50%", flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', height: 50, borderWidth: use === 2 ? 2 : 1, borderColor: use === 2 ? "#3C58F7" : "#949F99", borderTopRightRadius: 9, borderBottomRightRadius: 9 }}>
                <Text style={{ fontSize: 14, fontWeight: use === 2 ? "500" : "400", color: use === 2 ? "#3C58F7" : "#545454" }}>Privatperson</Text>
                <SvgXml xml={person} width={17} height={20} color={use === 2 ? "#3C58F7" : "#545454"} />
              </TouchableOpacity>
            </View>
          </View>



          {/* Register Button */}
          <View style={{ width: '100%', marginTop: 70, paddingBottom: 150 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#4675F7', flexDirection: "row", height: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
              onPress={handleButton}
              accessibilityLabel="Learn more about this purple button">
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600", marginRight: 20 }}>Durchstarten</Text>
              <SvgXml xml={rocket} width={21} height={21} />
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
    marginBottom: 38,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: '#383838',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  label: {
    color: '#383838',
    fontSize: 14,
    fontWeight: '500',
  }
})

export default UserInfo
