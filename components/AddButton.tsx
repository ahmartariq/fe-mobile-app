import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Dimensions, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import QuickContactModal from './QuickContactModal';
import QuickActivityModal from './QuickActivityModal';
import QuickMemoryModal from './QuickMemoryModal';
import QuickApproachModal from './QuickApproachModal';


const add = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.74982 11.4998H21.2498" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5003 21.2499V1.74988" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const closeIcon = `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.60547 21.3945L21.3941 7.60595" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3944 21.3941L7.60583 7.60547" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const point = `<svg width="42" height="26" viewBox="0 0 42 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.9279 23.5983C22.6733 25.5509 19.3267 25.5509 17.0721 23.5983L2.85454 11.2856C-1.34488 7.64877 1.22716 0.750005 6.78247 0.750004L35.2175 0.750002C40.7729 0.750001 43.3449 7.64877 39.1455 11.2856L24.9279 23.5983Z" fill="currentColor"/>
</svg>`

const person = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.0586 18.4702V16.5879C16.0586 15.5895 15.6619 14.632 14.956 13.9261C14.25 13.2201 13.2925 12.8235 12.2941 12.8235H5.70634C4.70795 12.8235 3.75044 13.2201 3.04447 13.9261C2.3385 14.632 1.94189 15.5895 1.94189 16.5879V18.4702" stroke="#00BC8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.00047 9.05892C11.0795 9.05892 12.7649 7.37352 12.7649 5.29447C12.7649 3.21543 11.0795 1.53003 9.00047 1.53003C6.92142 1.53003 5.23602 3.21543 5.23602 5.29447C5.23602 7.37352 6.92142 9.05892 9.00047 9.05892Z" stroke="#00BC8B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const activityIcon = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.93263 12.6358H2.68182C2.41048 12.6358 2.19159 12.4717 2.19159 12.271C2.19159 12.0704 2.41048 11.9062 2.68182 11.9062H9.93491C10.2062 11.9062 10.4251 12.0704 10.4251 12.271C10.4251 12.4717 10.204 12.6358 9.93263 12.6358ZM12.4316 17.684C12.231 17.684 12.0372 17.6225 11.873 17.5039L10.0352 16.1814C9.60657 15.8736 9.50852 15.2739 9.81862 14.8475L13.558 9.65114C13.7382 9.4026 14.0277 9.25439 14.3356 9.25439C14.5362 9.25439 14.73 9.31596 14.8942 9.43452L16.732 10.757C17.1606 11.0648 17.2587 11.6645 16.9486 12.0909L13.2092 17.2873C13.029 17.5358 12.7395 17.684 12.4316 17.684ZM14.3356 9.98404C14.2626 9.98404 14.1942 10.0182 14.1509 10.0775L10.4115 15.2739C10.3385 15.3743 10.3613 15.5179 10.4639 15.5909L12.3017 16.9133C12.3518 16.9475 12.3997 16.9567 12.4339 16.9567C12.5069 16.9567 12.5753 16.9225 12.6186 16.8632L16.358 11.6668C16.431 11.5664 16.4082 11.4228 16.3056 11.3498L14.4678 10.0251C14.4176 9.99088 14.3675 9.98404 14.3356 9.98404Z" fill="#3C58F7"/>
<path d="M9.62231 19.0999C9.54707 19.0999 9.47182 19.0771 9.41026 19.0315C9.30537 18.9563 9.24609 18.8286 9.25977 18.6986L9.57443 15.4928C9.58811 15.3628 9.66791 15.2511 9.78648 15.1963C9.90505 15.1416 10.0441 15.1553 10.149 15.2328L12.7689 17.1094C12.8738 17.1846 12.9331 17.3123 12.9194 17.4423C12.9057 17.5722 12.8259 17.684 12.7073 17.7387L9.7728 19.0703C9.72492 19.0885 9.67247 19.0999 9.62231 19.0999ZM10.2379 16.1928L10.0464 18.1423L11.8295 17.3328L10.2379 16.1928ZM15.6669 13.313C15.594 13.313 15.5187 13.2902 15.4549 13.2446L13.0037 11.482C12.8396 11.3634 12.8031 11.1354 12.9217 10.9735C13.0402 10.8094 13.2682 10.7729 13.4301 10.8915L15.8813 12.654C16.0454 12.7726 16.0819 13.0006 15.9633 13.1625C15.8904 13.2605 15.7787 13.313 15.6669 13.313ZM2.56531 10.0797C2.48095 10.0797 2.39886 10.0501 2.32818 9.99309C2.17541 9.86312 2.15717 9.63283 2.28714 9.47778L4.81808 6.50221C4.88192 6.42697 4.97313 6.38136 5.07117 6.37452C5.16922 6.36768 5.26499 6.3996 5.33795 6.46573L8.22231 9.03315L11.4327 5.60156C11.5695 5.45335 11.8021 5.44651 11.948 5.58332C12.0963 5.72013 12.1031 5.9527 11.9663 6.09863L8.51645 9.79244C8.38192 9.93608 8.15619 9.94749 8.00798 9.81524L5.13274 7.25921L2.84349 9.94977C2.77281 10.0364 2.6702 10.0797 2.56531 10.0797Z" fill="#3C58F7"/>
<path d="M12.1896 8.55673C11.9889 8.55673 11.8248 8.39256 11.8248 8.19191V5.64956H9.28471C9.08406 5.64956 8.91989 5.48539 8.91989 5.28474C8.91989 5.08409 9.08406 4.91992 9.28471 4.91992H12.5567V8.19191C12.5544 8.39256 12.3925 8.55673 12.1896 8.55673Z" fill="#3C58F7"/>
<path d="M6.85266 17.6999H1.39175C1.17514 17.6999 0.999569 17.5243 0.999569 17.3077V2.02173C0.999569 1.80511 1.17514 1.62954 1.39175 1.62954H13.5312C13.7478 1.62954 13.9233 1.80511 13.9233 2.02173V7.41879C13.9233 7.61944 14.0875 7.78361 14.2882 7.78361C14.4888 7.78361 14.653 7.61944 14.653 7.41879V2.02173C14.653 1.40153 14.1514 0.899902 13.5312 0.899902H1.39175C0.771556 0.899902 0.269928 1.40153 0.269928 2.02173V17.3077C0.269928 17.9279 0.771556 18.4295 1.39175 18.4295H6.85266C7.05331 18.4295 7.21748 18.2654 7.21748 18.0647C7.21748 17.8641 7.05331 17.6999 6.85266 17.6999Z" fill="#3C58F7"/>
</svg>`

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const AddButton = () => {
    const [isPopup, setIsPopup] = useState<boolean>(false);
    const [contactModal, setContactModal] = useState<boolean>(false);
    const [activityModal, setActivityModal] = useState<boolean>(false);
    const [memoryModal, setMemoryModal] = useState<boolean>(false);
    const [alertModal, setAlertModal] = useState<boolean>(false);


    const handleLog = () => {
        setIsPopup(!isPopup);
    };


    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={handleLog} style={styles.container}>
                <SvgXml xml={isPopup ? closeIcon : add} />
            </TouchableOpacity>


            {isPopup && <View style={styles.popup}>
                <TouchableOpacity activeOpacity={0.1} onPress={() => setIsPopup(false)}  style={{ width: windowHeight, height: windowHeight, backgroundColor: '#4E4E4E', opacity: 0.4, position: 'absolute' }}></TouchableOpacity>
                <View style={{ width: 267, height: 257, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', position: 'absolute' , bottom: 40 }}>
                    <SvgXml xml={point} style={styles.point}/>
                    <View style={{ width: "100%" , flexDirection: 'column' , paddingHorizontal: 26, paddingVertical: 24}}>
                        <TouchableOpacity onPress={() => {setContactModal(true)
                        setIsPopup(false)
                        }} style={{width: "100%" , flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , width: 44, height: 44, backgroundColor: "#CCF2E8" , borderRadius: 100 }}>
                                <SvgXml xml={person} />
                            </View>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: '500', marginLeft: 8 }}>Kontakt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {setActivityModal(true)
                        setIsPopup(false)
                        }} style={{width: "100%" , flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                            <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , width: 44, height: 44, backgroundColor: "#D8DEFD" , borderRadius: 100 }}>
                                <SvgXml xml={activityIcon} />
                            </View>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: '500', marginLeft: 8 }}>Aktivität</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {setMemoryModal(true)
                        setIsPopup(false)
                        }} style={{width: "100%" , flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                            <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , width: 44, height: 44, backgroundColor: "#FFE1CC" , borderRadius: 100 }}>
                                <Image source={require('../assets/memory.png')} resizeMode='contain' style={{width: 24, height: 24}}/>
                            </View>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: '500', marginLeft: 8 }}>erinnerung</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {setAlertModal(true)
                        setIsPopup(false)
                        }} style={{width: "100%" , flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                            <View style={{ marginRight: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' , width: 44, height: 44, backgroundColor: "#CFF7FF" , borderRadius: 100 }}>
                                <Image source={require('../assets/alert.png')} resizeMode='contain' style={{width: 24, height: 24}}/>
                            </View>
                            <Text style={{ color: "black", fontSize: 16, fontWeight: '500', marginLeft: 8 }}>Ansatz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            }

            <QuickContactModal modal={contactModal} setModal={setContactModal} />
            <QuickActivityModal modal={activityModal} setModal={setActivityModal} />
            <QuickMemoryModal modal={memoryModal} setModal={setMemoryModal} />
            <QuickApproachModal modal={alertModal} setModal={setAlertModal} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 62,
        height: 62,
        top: -18,
        backgroundColor: '#567DF4',
        borderRadius: 100000,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.50,
        shadowRadius: 4,
    },
    popup: {
        width: windowWidth,
        height: windowHeight,
        bottom: 65,
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1000
    },
    point: {
        position: 'absolute',
        color: "white",
        bottom: -16,
    }
});

export default AddButton;