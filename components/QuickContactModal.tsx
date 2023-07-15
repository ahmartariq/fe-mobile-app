import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect } from 'react'
import { Modal, View, Text, Pressable, PanResponder, StyleSheet, Platform, TouchableOpacity, ScrollView, TextInput, } from 'react-native'
import { SvgXml } from 'react-native-svg';
import ActivityDetailModal from './ActivityDetailModal';
import ReminderDetailModal from './ReminderDetailModal';
import ApproachDetailModal from './ApproachDetailModal';


const edit = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z" fill="white"/>
<path d="M15.85 2.90005C14.2333 1.28338 12.65 1.24172 10.9917 2.90005L9.98334 3.90838C9.90001 3.99172 9.86668 4.12505 9.90001 4.24172C10.5333 6.45005 12.3 8.21672 14.5083 8.85005C14.5417 8.85838 14.575 8.86672 14.6083 8.86672C14.7 8.86672 14.7833 8.83338 14.85 8.76672L15.85 7.75838C16.675 6.94172 17.075 6.15005 17.075 5.35005C17.0833 4.52505 16.6833 3.72505 15.85 2.90005Z" fill="white"/>
<path d="M13.0083 9.60841C12.7667 9.49175 12.5333 9.37508 12.3083 9.24175C12.125 9.13341 11.95 9.01675 11.775 8.89175C11.6333 8.80008 11.4667 8.66675 11.3083 8.53341C11.2917 8.52508 11.2333 8.47508 11.1667 8.40841C10.8917 8.17508 10.5833 7.87508 10.3083 7.54175C10.2833 7.52508 10.2417 7.46675 10.1833 7.39175C10.1 7.29175 9.95834 7.12508 9.83334 6.93341C9.73335 6.80841 9.61668 6.62508 9.50834 6.44175C9.37501 6.21675 9.25835 5.99175 9.14168 5.75841C8.98871 5.43063 8.5585 5.33326 8.30273 5.58903L3.61668 10.2751C3.50834 10.3834 3.40834 10.5917 3.38334 10.7334L2.93334 13.9251C2.85001 14.4917 3.00834 15.0251 3.35834 15.3834C3.65834 15.6751 4.07501 15.8334 4.52501 15.8334C4.62501 15.8334 4.72501 15.8251 4.82501 15.8084L8.02501 15.3584C8.17501 15.3334 8.38335 15.2334 8.48335 15.1251L13.1771 10.4313C13.4278 10.1806 13.3336 9.74936 13.0083 9.60841Z" fill="white"/></svg>`

const email = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const phone = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.11934 0.912568C5.83359 0.222333 5.08027 -0.14505 4.36035 0.0516302L1.09473 0.942255C0.449023 1.12038 0 1.70671 0 2.37468C0 11.5555 7.44414 18.9997 16.625 18.9997C17.293 18.9997 17.8793 18.5507 18.0574 17.905L18.948 14.6393C19.1447 13.9194 18.7773 13.1661 18.0871 12.8803L14.5246 11.396C13.9197 11.1436 13.2184 11.318 12.8064 11.8264L11.3072 13.6559C8.69473 12.4202 6.57949 10.305 5.34375 7.69245L7.17324 6.19694C7.68164 5.78132 7.85606 5.08366 7.60371 4.47878L6.11934 0.916279V0.912568Z" fill="#4675F7"/>
</svg>`

const group = `<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#4675F7"/>
</svg>`

const caalender = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33331 1.33331V3.33331" stroke="#3B3C3E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.6667 1.33331V3.33331" stroke="#3B3C3E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.33331 6.06H13.6666" stroke="#3B3C3E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 5.66665V11.3333C14 13.3333 13 14.6666 10.6667 14.6666H5.33333C3 14.6666 2 13.3333 2 11.3333V5.66665C2 3.66665 3 2.33331 5.33333 2.33331H10.6667C13 2.33331 14 3.66665 14 5.66665Z" stroke="#3B3C3E" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4632 9.1332H10.4691" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4632 11.1332H10.4691" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99697 9.1332H8.00296" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99697 11.1332H8.00296" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.52956 9.1332H5.53555" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.52956 11.1332H5.53555" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const clock = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6668 7.99998C14.6668 11.68 11.6801 14.6666 8.0001 14.6666C4.3201 14.6666 1.33344 11.68 1.33344 7.99998C1.33344 4.31998 4.3201 1.33331 8.0001 1.33331C11.6801 1.33331 14.6668 4.31998 14.6668 7.99998Z" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4732 10.1201L8.40657 8.88677C8.04657 8.67344 7.75323 8.16011 7.75323 7.74011V5.00677" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const tags = ["nue", "B2B", "Investor"]

const colorCombinations = [
    ['#3C58F7', '#34DCFC'],
    ['#D73C3C', '#34DCFC'],
    ['#3CF770', '#34DCFC'],
    ['#F7A13C', '#34DCFC'],
];

const QuickContactModal = ({ modal, setModal }: { modal: boolean, setModal: (modal: boolean) => void }) => {
    const [letter, setLetter] = useState('');
    const [startColor, setStartColor] = useState("");
    const [endColor, setEndColor] = useState("");
    // Data for contact info
    const [name, setName] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [geburtstag, setGeburtstag] = useState('');
    const [wohnort, setWohnort] = useState('');
    const [beruf, setBeruf] = useState('');
    const [unternehmen, setUnternehmen] = useState('');
    const [beziehungsebene, setBeziehungsebene] = useState('');
    const [verbindungsperson, setVerbindungsperson] = useState('');
    const [kreis, setKreis] = useState('');
    const [errorMessages, setErrorMessages] = useState({ name: "", email: "", telefon: "", geburtstag: "", wohnort: "", beruf: "", unternehmen: "", beziehungsebene: "", verbindungsperson: "", kreis: "" })

    const modalRef = useRef(null);

    const getRandomColors = () => {
        const randomIndex = Math.floor(Math.random() * colorCombinations.length);
        return colorCombinations[randomIndex];
    };

    useEffect(() => {
        const colors = getRandomColors();
        setStartColor(colors[0]);
        setEndColor(colors[1]);
    }, [])

    useEffect(() => {
        let typingTimeout : any;

        if (name !== '') {
            setIsTyping(true);

            typingTimeout = setTimeout(() => {
                const namesArray = name.split(' ');
                const firstName = namesArray[0] || '';
                const lastName = namesArray[1] || '';
                setLetter(firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase());
                setIsTyping(false);
            }, 500); // Adjust the timeout value as needed (e.g., 500ms)

            return () => clearTimeout(typingTimeout);
        }
    }, [name]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 50) {
                    // Close the modal when swiped down by more than 50 pixels
                    closeModal();
                }
            },
        })
    ).current;

    const closeModal = () => {
        setModal(false);
    };

    const handleAddContact = () => {
        if (name === "") {
            setErrorMessages({ ...errorMessages, name: "Name is required" })
            return
        }
        if (telefon === "") {
            setErrorMessages({ ...errorMessages, telefon: "Telefon is required" , name: "" })
            return
        }
        if(telefon.length !== 11){
            setErrorMessages({ ...errorMessages, telefon: "Telefon is invalid" , name: ""})
            return
        }
        if(telefon.match(/[a-zA-Z]/g)){
            setErrorMessages({ ...errorMessages, telefon: "Telefon is invalid" , name: "" })
            return
        }
        if (email === "") {
            setErrorMessages({ ...errorMessages, email: "Email is required", telefon: "", name: "" })
            return
        }
        if (!email.includes("@") && !email.includes(".com")) {
            setErrorMessages({ ...errorMessages, email: "Email is invalid" , telefon: "", name: "" })
            return
        }
        if (geburtstag === "") {
            setErrorMessages({ ...errorMessages, geburtstag: "Geburtstag is required", email: "", telefon: "", name: "" })
            return
        }
        if (wohnort === "") {
            setErrorMessages({ ...errorMessages, wohnort: "Wohnort is required" , geburtstag: "", email: "", telefon: "", name: "" })
            return
        }
        if (beruf === "") {
            setErrorMessages({ ...errorMessages, beruf: "Beruf is required", wohnort: "", geburtstag: "", email: "", telefon: "", name: "" })
            return
        }
        if (unternehmen === "") {
            setErrorMessages({ ...errorMessages, unternehmen: "Unternehmen is required", beruf: "", wohnort: "", geburtstag: "", email: "", telefon: "", name: "" })
            return
        }
        if (beziehungsebene === "") {
            setErrorMessages({ ...errorMessages, beziehungsebene: "Beziehungsebene is required", unternehmen: "", beruf: "", wohnort: "", geburtstag: "", email: "", telefon: "", name: "" })
            return
        }
        if (verbindungsperson === "") {
            setErrorMessages({ ...errorMessages, verbindungsperson: "Verbindungsperson is required", beziehungsebene: "", unternehmen: "", beruf: "", wohnort: "", geburtstag: "", email: "", telefon: "", name: "" })
            return
        }
        if (kreis === "") {
            setErrorMessages({ ...errorMessages, kreis: "Kreis is required", verbindungsperson: "", beziehungsebene: "", unternehmen: "", beruf: "", wohnort: "", geburtstag: "", email: "", telefon: "", name: ""})
            return
        }

        setErrorMessages({ ...errorMessages, name: "", email: "", telefon: "", geburtstag: "", wohnort: "", beruf: "", unternehmen: "", beziehungsebene: "", verbindungsperson: "", kreis: "" })
        setModal(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(!modal)}>
            <View style={styles.centeredView}>

                <View ref={modalRef} style={styles.modalView}>
                    {/* Top Line */}
                    <View style={{ width: 54, height: 6, backgroundColor: "#D9D9D9", borderRadius: 30 }} {...panResponder.panHandlers}></View>

                    {/*  editable */}
                    <View style={{ width: '100%', minHeight: 40, alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 11, flexDirection: "row" }} {...panResponder.panHandlers}>
                        <TouchableOpacity onPress={closeModal} style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "#818181" }}>Abbrechen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleAddContact} style={{ backgroundColor: "#3C58F7", borderRadius: 30, paddingHorizontal: 8, paddingVertical: 6 }}>
                            <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>Speichern</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', marginTop: 20, paddingHorizontal: 24, height: "30%", justifyContent: "space-around" }}>

                        {/* Contact Details */}
                        <View style={{ width: '100%', flexDirection: "row" }} {...panResponder.panHandlers}>
                            <LinearGradient colors={[startColor, endColor]} style={styles.gradient}>
                                <Text style={{ color: 'black', fontSize: 30, fontWeight: '600' }}>{letter}</Text>
                            </LinearGradient>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 21 }}>
                                <TextInput
                                    style={{ width: 200, color: '#1F1F1F', fontSize: 16, fontWeight: '500'}}
                                    placeholder="Enter Name"
                                    placeholderTextColor="#D0D0D0"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <Text style={{ color: '#545454', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{email}</Text>
                            </View>
                        </View>
                        { errorMessages.name !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.name}</Text>}

                        {/* tags */}
                        <View style={{ width: "100%" }}>
                            <ScrollView horizontal={true}>
                                {
                                    tags.map((item, index) => (
                                        <View style={{ height: 32, marginRight: 6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, backgroundColor: "#F1F5FF", borderWidth: 1.5, borderColor: "#DFE7FC", borderRadius: 9 }}>
                                            <Text style={{ color: '#4675F7', fontSize: 12, fontWeight: '600' }}>{item}</Text>
                                        </View>
                                    ))
                                }
                                <TouchableOpacity style={{ height: 32, marginRight: 6, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 26, borderWidth: 1.5, borderColor: "#DFE7FC", borderRadius: 9, borderStyle: "dashed" }}>
                                    <Text style={{ color: '#4675F7', fontSize: 12, fontWeight: '600' }}>+</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 24, height: "58%" }}>

                        <ScrollView style={{ width: '100%', flexDirection: "column", marginTop: 22, height: '50%' }}>
                            <View style={{ flexDirection: "column", marginBottom: 22 }}>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Kontaktinfo</Text>

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9" }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Telefon</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Telefon"
                                        placeholderTextColor="#D0D0D0"
                                        value={telefon}
                                        onChangeText={setTelefon}
                                    />
                                </View>
                                { errorMessages.telefon !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.telefon}</Text>}
                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Email</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Email"
                                        placeholderTextColor="#D0D0D0"
                                        value={email}
                                        onChangeText={setEmail}

                                    />
                                </View>
                                { errorMessages.email !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.email}</Text>}
                            </View>

                            <View style={{ flexDirection: "column", marginBottom: 22 }}>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Allgemein</Text>
                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Geburtstag</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Geburtstag"
                                        placeholderTextColor="#D0D0D0"
                                        value={geburtstag}
                                        onChangeText={setGeburtstag}
                                    />
                                </View>
                                { errorMessages.geburtstag !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.geburtstag}</Text>}

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Wohnort</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Wohnort"
                                        placeholderTextColor="#D0D0D0"
                                        value={wohnort}
                                        onChangeText={setWohnort}
                                    />
                                </View>
                                { errorMessages.wohnort !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.wohnort}</Text>}
                            </View>

                            <View style={{ flexDirection: "column", marginBottom: 22 }}>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Beruflich</Text>

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Beruf</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Beruf"
                                        placeholderTextColor="#D0D0D0"
                                        value={beruf}
                                        onChangeText={setBeruf}
                                    />
                                </View>
                                { errorMessages.beruf !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.beruf}</Text>}

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Unternehmen</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Unternehmen"
                                        placeholderTextColor="#D0D0D0"
                                        value={unternehmen}
                                        onChangeText={setUnternehmen}
                                    />
                                </View>
                                { errorMessages.unternehmen !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.unternehmen}</Text>}
                            </View>

                            <View style={{ flexDirection: "column", marginBottom: 22 }}>
                                <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Beziehung</Text>
                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Beziehungsebene</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Beziehungsebene"
                                        placeholderTextColor="#D0D0D0"
                                        value={beziehungsebene}
                                        onChangeText={setBeziehungsebene}
                                    />
                                </View>
                                { errorMessages.beziehungsebene !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.beziehungsebene}</Text>}

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Verbindungsperson</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Verbindungsperson"
                                        placeholderTextColor="#D0D0D0"
                                        value={verbindungsperson}
                                        onChangeText={setVerbindungsperson}
                                    />
                                </View>
                                { errorMessages.verbindungsperson !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.verbindungsperson}</Text>}

                                <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                    <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400', }}>Kreis</Text>
                                    <TextInput
                                        style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                        placeholder="Kreis"
                                        placeholderTextColor="#D0D0D0"
                                        value={kreis}
                                        onChangeText={setKreis}
                                    />
                                </View>
                                { errorMessages.kreis !== "" && <Text style={{ color: '#FF0000', fontSize: 14, fontWeight: '400', marginTop: 4 }}>{errorMessages.kreis}</Text>}

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    centeredView: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: '100%',
        height: Platform.OS === 'ios' ? '94%' : '100%',
        backgroundColor: '#FDFDFD',
        borderRadius: 15,
        paddingTop: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    gradient: {
        width: 76,
        height: 76,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default QuickContactModal;
