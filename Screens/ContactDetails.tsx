import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { useFocusEffect } from '@react-navigation/native';


const edit = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z" fill="white"/>
<path d="M15.85 2.90005C14.2333 1.28338 12.65 1.24172 10.9917 2.90005L9.98334 3.90838C9.90001 3.99172 9.86668 4.12505 9.90001 4.24172C10.5333 6.45005 12.3 8.21672 14.5083 8.85005C14.5417 8.85838 14.575 8.86672 14.6083 8.86672C14.7 8.86672 14.7833 8.83338 14.85 8.76672L15.85 7.75838C16.675 6.94172 17.075 6.15005 17.075 5.35005C17.0833 4.52505 16.6833 3.72505 15.85 2.90005Z" fill="white"/>
<path d="M13.0083 9.60841C12.7667 9.49175 12.5333 9.37508 12.3083 9.24175C12.125 9.13341 11.95 9.01675 11.775 8.89175C11.6333 8.80008 11.4667 8.66675 11.3083 8.53341C11.2917 8.52508 11.2333 8.47508 11.1667 8.40841C10.8917 8.17508 10.5833 7.87508 10.3083 7.54175C10.2833 7.52508 10.2417 7.46675 10.1833 7.39175C10.1 7.29175 9.95834 7.12508 9.83334 6.93341C9.73335 6.80841 9.61668 6.62508 9.50834 6.44175C9.37501 6.21675 9.25835 5.99175 9.14168 5.75841C8.98871 5.43063 8.5585 5.33326 8.30273 5.58903L3.61668 10.2751C3.50834 10.3834 3.40834 10.5917 3.38334 10.7334L2.93334 13.9251C2.85001 14.4917 3.00834 15.0251 3.35834 15.3834C3.65834 15.6751 4.07501 15.8334 4.52501 15.8334C4.62501 15.8334 4.72501 15.8251 4.82501 15.8084L8.02501 15.3584C8.17501 15.3334 8.38335 15.2334 8.48335 15.1251L13.1771 10.4313C13.4278 10.1806 13.3336 9.74936 13.0083 9.60841Z" fill="white"/></svg>`


const tags = ["nue", "B2B", "Investor"]
const subCategories = ["Profil", "Aktivitäten", "Erinnerungen", "Ansätze"]


const ContactDetails = ({ navigation, route }: { navigation: any, route: any }) => {
    const data = route.params;
    const [letter, setLetter] = useState('');
    const [selected, setSelected] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const namesArray = data.name.split(' ');
            const firstName = namesArray[0];
            const lastName = namesArray[1];
            setLetter(firstName.charAt(0) + lastName.charAt(0));
        }, [])
    );


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#67C0F7', '#4163F7']} style={styles.header}>
                <Image
                    source={require('../assets/lines.png')}
                    style={{ width: '100%', position: 'absolute', top: 0 }}
                    resizeMode={'cover'}
                />
            </LinearGradient>

            <View style={styles.body}>
                <ScrollView
                    style={{
                        // paddingHorizontal: 24,
                        marginTop: 8,
                        flexDirection: 'column',
                        backgroundColor: '#FDFDFD',
                    }}>

                    {/* Top Line */}
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <View style={{ width: 54, height: 6, backgroundColor: "#D9D9D9", borderRadius: 30 }}></View>
                    </View>

                    {/* Edit Option */}
                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => { }} style={{ width: 44, height: 44, backgroundColor: "#CBCBCB", borderRadius: 30 }}>
                            <SvgXml xml={edit} width={20} height={20} style={{ alignSelf: 'center', marginTop: 12 }} />
                        </TouchableOpacity>
                    </View>

                    {/* top detials */}
                    <View style={{ width: '100%', flexDirection: "row" }}>
                        <LinearGradient colors={[data.startColor, data.endColor]} style={styles.gradient}>
                            <Text style={{ color: 'black', fontSize: 30, fontWeight: '600' }}>{letter}</Text>
                        </LinearGradient>
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ color: '#1F1F1F', fontSize: 16, fontWeight: '600', marginLeft: 21 }}>{data.name}</Text>
                            <Text style={{ color: '#545454', fontSize: 14, fontWeight: '400', marginLeft: 21, marginTop: 4 }}>{data.email}</Text>
                        </View>
                    </View>

                    {/* tags */}
                    <View style={{ width: '100%', flexDirection: "row", marginTop: 22 }}>
                        {
                            tags.map((item, index) => (
                                <View style={{ marginRight: 6, paddingVertical: 9, paddingHorizontal: 18, backgroundColor: "#F1F5FF", borderWidth: 1.5, borderColor: "#DFE7FC", borderRadius: 9 }}>
                                    <Text style={{ color: '#4675F7', fontSize: 12, fontWeight: '600' }}>{item}</Text>
                                </View>
                            ))
                        }
                    </View>

                    {/* SubCategory */}
                    <View style={{ width: '100%', height: 50, flexDirection: "row", marginTop: 22, borderWidth: 1, borderColor: "#E7EBF4", backgroundColor: "#FFFFFF", borderRadius: 12 }}>
                        {
                            subCategories.map((item, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => { setSelected(index) }}
                                    key={index}
                                    style={{ flex: 1, justifyContent: 'center', alignItems: "center" , flexDirection: "column" ,borderBottomColor: selected === index ? "#4675F7" : "transparent" , borderBottomWidth: 3}}>
                                    <Text style={{ color: selected === index ? '#4675F7' : "#545454", fontSize: 12, fontWeight: '600'  }}>{item}</Text>
                                    {/* {selected === index && <View style={{width: "100%" , height: 3, borderRadius: 12, backgroundColor: "#4675F7"}}></View>} */}
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {/* Data */}
                    <View style={{ width: '100%', flexDirection: "column", marginTop: 22 }}>
                        <View style={{ flex: 1, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#C9C9C9", marginBottom: 22}}>
                            <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Kontaktinfo</Text>
                            <View style={{width: "100%" , flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingBottom: 10}}>
                                <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Telefon</Text>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>+ 43 176459709</Text>
                            </View>
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#C9C9C9", marginBottom: 22}}>
                            <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Allgemein</Text>
                            <View style={{width: "100%" , flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingBottom: 10}}>
                                <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Geburtstag</Text>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>12.02.2001</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#C9C9C9", marginBottom: 22}}>
                            <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Beruflich</Text>
                            <View style={{width: "100%" , flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingBottom: 10}}>
                                <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Unternehmen</Text>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>netsome GmbH</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#C9C9C9", marginBottom: 22}}>
                            <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Beziehung</Text>
                            <View style={{width: "100%" , flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingBottom: 10}}>
                                <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Beziehungsebene</Text>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Ebene 2</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#C9C9C9", marginBottom: 80}}>
                            <View style={{width: "100%" , flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingBottom: 10}}>
                                <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Verbindungsperson</Text>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Peter Singh</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>


        </View>
    );
};

export default ContactDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    header: {
        height: '18%',
        position: 'relative',
        justifyContent: 'flex-end',
        zIndex: -1000
    },
    body: {
        paddingHorizontal: 24,
        width: '100%',
        height: '100%',
        marginTop: 16,
        top: -80,
        backgroundColor: '#FDFDFD',
        flexDirection: 'row',
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        zIndex: 1000
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
        width: 76,
        height: 76,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
