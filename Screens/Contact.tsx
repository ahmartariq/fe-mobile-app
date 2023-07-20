import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  PanResponder,
  Platform, Keyboard
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import ContactModal from '../components/ContactModal';
import { KeyboardAvoidingView } from 'react-native';

const bell = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5.3667V8.1417" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M10.0166 1.66675C6.94992 1.66675 4.46658 4.15008 4.46658 7.21675V8.96675C4.46658 9.53341 4.23325 10.3834 3.94158 10.8667L2.88325 12.6334C2.23325 13.7251 2.68325 14.9417 3.88325 15.3417C7.86658 16.6667 12.1749 16.6667 16.1582 15.3417C17.2832 14.9667 17.7666 13.6501 17.1582 12.6334L16.0999 10.8667C15.8082 10.3834 15.5749 9.52508 15.5749 8.96675V7.21675C15.5666 4.16675 13.0666 1.66675 10.0166 1.66675Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M12.7749 15.6833C12.7749 17.2083 11.5249 18.4583 9.99991 18.4583C9.24158 18.4583 8.54158 18.1417 8.04158 17.6417C7.54158 17.1417 7.22491 16.4417 7.22491 15.6833" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>`;

const searchIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.20111 15.3967C12.1782 15.3967 15.4022 12.1739 15.4022 8.19837C15.4022 4.22282 12.1782 1 8.20111 1C4.22405 1 1 4.22282 1 8.19837C1 12.1739 4.22405 15.3967 8.20111 15.3967Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.546 15.9493C14.9701 17.2294 15.9383 17.3574 16.6824 16.2373C17.3625 15.2132 16.9144 14.3731 15.6822 14.3731C14.7701 14.3651 14.258 15.0772 14.546 15.9493Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const filter = `
<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 1H1L7.4 8.35778V13.4444L10.6 15V8.35778L17 1Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const sort = `
<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.35725 15.5907L3.75958 12.0002" stroke="#353535" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.3569 3.40869V15.592" stroke="#353535" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6429 3.40869L15.2406 6.99919" stroke="#353535" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.6429 15.592V3.40869" stroke="#353535" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

interface Data {
  name: string;
  email: string;
}

const dataArray: Data[] = [
  { name: 'Ben Fisher', email: 'ben.fisher@mailing.com' },
  { name: 'Annette Black', email: 'annette.black@appxelent.com' },
  { name: 'Albert Flores', email: 'albert.flores@google.com' },
  { name: 'Bessie Cooper', email: 'bessie.cooper@finance-ab.com' },
  { name: 'Brooklyn Simmons', email: 'brooklyn.simmons@netsome.com' },
  { name: 'Courtney Henry', email: 'courtney.henry@example.com' },
  { name: 'Arlene McCoy', email: 'arlene.mccoy@ingen.com' },
];

const colorCombinations = [
  ['#3C58F7', '#34DCFC'],
  ['#D73C3C', '#34DCFC'],
  ['#3CF770', '#34DCFC'],
  ['#F7A13C', '#34DCFC'],
];

const infoData = {
  telefon: "+ 43 176459709",
  email: "",
  geburtstag: "12.02.2001",
  wohnort: "",
  beruf: "",
  unternehmen: "netsome GmbH",
  beziehungsebene: "Ebene 2",
  verbindungsperson: "Peter Singh",
  kreis: "",
}

const Contact = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [contactModel, setContactModel] = useState(false);

  const [data, setData] = useState({ startColor: "", endColor: "", name: "", email: "" });


  const sortedArray = dataArray.sort((a, b) => a.name.localeCompare(b.name));

  const groupedData: { [letter: string]: Data[] } = {};
  sortedArray.forEach((obj) => {
    const firstLetter = obj.name.charAt(0).toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(obj);
  });

  const mappedData = Object.entries(groupedData).map(([letter, contacts]) => ({
    letter,
    contacts: contacts.map(({ name, email }) => ({ name, email })),
  }));

  const getRandomColors = () => {
    const randomIndex = Math.floor(Math.random() * colorCombinations.length);
    return colorCombinations[randomIndex];
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    const filteredContacts = sortedArray.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredContacts);
  };

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const createLetter = (name: string) => {
    const namesArray = name.split(' ');
    const firstName = namesArray[0] || '';
    const lastName = namesArray[1] || '';
    return (firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase());
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const handleFilterPress = () => {
    // Handle filter button press
   // Keyboard.dismiss(); // Dismiss the keyboard
    // Add your navigation logic here to open the filter menu
    // ...
  };
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <LinearGradient colors={['#67C0F7', '#4163F7']} style={styles.header}>
          <Image
            source={require('../assets/lines.png')}
            style={{ width: '100%', position: 'absolute', top: 0 }}
            resizeMode={'cover'}
          />
          <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginLeft: '50%',
            // transform: [{ translateX: -50 }],
            marginBottom: 22,
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            
          }}>
<View style={{flexDirection:'row', alignItems:'center', opacity: 0}}>
<View
            style={{
              width: 44,
              height: 44,
              overflow: 'hidden',
              borderRadius: 100,
            }}
            >
            <Image
              source={require('../assets/profile.png')}
              style={{ aspectRatio: 1, width: '100%', height: '100%' }}
            />
          </View>
          <SvgXml xml={bell} style={{ marginLeft:22 }} />

</View>
          <Text style={styles.headerTitle}>Kontakte</Text>
          
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <SvgXml xml={bell} style={{ marginRight: 22 }} />
          
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              overflow: 'hidden',
              borderRadius: 100,
            }}
            onPress={openDrawer}>
            <Image
              source={require('../assets/profile.png')}
              style={{ aspectRatio: 1, width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={{ width: '85%' }}>
            <TextInput
              style={{ backgroundColor: '#ffffff' }}
              theme={{ roundness: 9 }}
              label=""
              placeholder={"Suchen"}
              value={search}
              activeOutlineColor='none'
              outlineColor='#949F99'
              mode='outlined'
              onChangeText={setSearch}
              left={
                <TextInput.Icon
                  icon={() => (
                    <SvgXml xml={searchIcon} width={18} height={18} style={{ alignSelf: 'center' }} />
                  )}
                />
              }
              right={
                <TextInput.Icon style={{
                  backgroundColor: '#ECEFFE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}
                  icon={() => (
                    <SvgXml xml={filter} width={18} height={18} style={{ alignSelf: 'center' }} />
                  )}
                              onPress={handleFilterPress}

                />
              }
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              width: 43,
              height: 43,
              borderRadius: 100,
              backgroundColor: '#EBEEFE',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <SvgXml xml={sort} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{
            paddingHorizontal: 24,
            marginTop: 24,
            flexDirection: 'column',
          }}>
          {
            search === "" && mappedData.map(({ letter, contacts }) => (
              <View key={letter}>
                <View style={styles.label}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                    {letter}
                  </Text>
                </View>
                {contacts.map(({ name, email }) => {
                  const [startColor, endColor] = getRandomColors();
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      // onPress={() => navigation.navigate("contact-details", { startColor, endColor, name, email })}
                      onPress={() => {
                        setData({ startColor, endColor, name, email })
                        setContactModel(true)
                      }}
                      key={name}
                      style={styles.card}>
                      <LinearGradient
                        style={styles.gradient}
                        colors={[startColor, endColor]}
                      >
                        {/* showing letter */}
                        <Text style={{ color: '#202020', fontSize: 16, fontWeight: '600' }}>
                          {createLetter(name)}
                        </Text>
                      </LinearGradient>
                      <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>
                          {name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 4,
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#545454',
                          }}>
                          {email}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

          {
            search !== "" &&
            filteredData.map(({ name, email }) => {
              const [startColor, endColor] = getRandomColors();
              return (
                <TouchableOpacity activeOpacity={0.5} onPress={() => setContactModel(true)} key={name} style={styles.card}>
                  <LinearGradient
                    style={styles.gradient}
                    colors={[startColor, endColor]}
                  >
                    {/* showing letter */}
                    <Text style={{ color: '#202020', fontSize: 16, fontWeight: '600' }}>
                      {createLetter(name)}
                    </Text>
                  </LinearGradient>
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>
                      {name}
                    </Text>
                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#545454',
                      }}>
                      {email}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        <ContactModal contactModel={contactModel} setContactModel={setContactModel} data={data} infoData={infoData} />
      </KeyboardAvoidingView>
    );
  };

  export default Contact;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden',
      backgroundColor: '#FDFDFF',
    },
    header: {
      height: '18%',
      position: 'relative',
      justifyContent: 'flex-end',
    },
    headerTitle: {
      textAlign: 'center',
      justifyContent:'center',
      alignItems:'center',
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
    },
    body: {
      paddingHorizontal: 24,
      width: '100%',
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    search: {
      outline: 'none',
      width: '100%',
      borderColor: '#E4E0E0',
      borderWidth: 1,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 13,
      paddingRight: 5,
      flexDirection: 'row',
    },
    label: {
      width: 21,
      height: 21,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4675F7',
      borderRadius: 6,
      marginBottom: 12
    },
    card: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: 20,
    },
    gradient: {
      width: 46,
      height: 46,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
  });
