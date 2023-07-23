import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect } from 'react'
import { Modal, View, Text, Pressable, PanResponder, StyleSheet, Platform, TouchableOpacity, ScrollView, Button, KeyboardAvoidingView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';
import { Path, Svg, SvgXml } from 'react-native-svg';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import IOSDateModal, { IOSTimeModal } from './IOSDateModal';
import { Audio } from 'expo-av';



const edit = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z" fill="white"/>
<path d="M15.85 2.90005C14.2333 1.28338 12.65 1.24172 10.9917 2.90005L9.98334 3.90838C9.90001 3.99172 9.86668 4.12505 9.90001 4.24172C10.5333 6.45005 12.3 8.21672 14.5083 8.85005C14.5417 8.85838 14.575 8.86672 14.6083 8.86672C14.7 8.86672 14.7833 8.83338 14.85 8.76672L15.85 7.75838C16.675 6.94172 17.075 6.15005 17.075 5.35005C17.0833 4.52505 16.6833 3.72505 15.85 2.90005Z" fill="white"/>
<path d="M13.0083 9.60841C12.7667 9.49175 12.5333 9.37508 12.3083 9.24175C12.125 9.13341 11.95 9.01675 11.775 8.89175C11.6333 8.80008 11.4667 8.66675 11.3083 8.53341C11.2917 8.52508 11.2333 8.47508 11.1667 8.40841C10.8917 8.17508 10.5833 7.87508 10.3083 7.54175C10.2833 7.52508 10.2417 7.46675 10.1833 7.39175C10.1 7.29175 9.95834 7.12508 9.83334 6.93341C9.73335 6.80841 9.61668 6.62508 9.50834 6.44175C9.37501 6.21675 9.25835 5.99175 9.14168 5.75841C8.98871 5.43063 8.5585 5.33326 8.30273 5.58903L3.61668 10.2751C3.50834 10.3834 3.40834 10.5917 3.38334 10.7334L2.93334 13.9251C2.85001 14.4917 3.00834 15.0251 3.35834 15.3834C3.65834 15.6751 4.07501 15.8334 4.52501 15.8334C4.62501 15.8334 4.72501 15.8251 4.82501 15.8084L8.02501 15.3584C8.17501 15.3334 8.38335 15.2334 8.48335 15.1251L13.1771 10.4313C13.4278 10.1806 13.3336 9.74936 13.0083 9.60841Z" fill="white"/></svg>`

const titleIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const calenderBlue = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99982 1.49994V3.74994" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.0002 1.49994V3.74994" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.62483 6.81744H15.3748" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 6.37494V12.7499C15.75 14.9999 14.625 16.4999 12 16.4999H6C3.375 16.4999 2.25 14.9999 2.25 12.7499V6.37494C2.25 4.12494 3.375 2.62494 6 2.62494H12C14.625 2.62494 15.75 4.12494 15.75 6.37494Z" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.7711 10.2748H11.7778" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.7711 12.5248H11.7778" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99657 10.2748H9.0033" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99657 12.5248H9.0033" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.22078 10.2748H6.22752" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.22078 12.5248H6.22752" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const micIcon = `<svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 13.75C10.3675 13.75 11.875 12.2425 11.875 10.375V3.625C11.875 1.7575 10.3675 0.25 8.5 0.25C6.6325 0.25 5.125 1.7575 5.125 3.625V10.375C5.125 12.2425 6.6325 13.75 8.5 13.75Z" fill="white"/>
<path d="M14.125 10.375C14.125 13.48 11.605 16 8.5 16C5.395 16 2.875 13.48 2.875 10.375H0.625C0.625 14.3463 3.56125 17.6087 7.375 18.16V21.625H9.625V18.16C13.4388 17.6087 16.375 14.3463 16.375 10.375H14.125Z" fill="white"/>
</svg>`

const playIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM13 23C7.4875 23 3 18.5125 3 13C3 7.4875 7.4875 3 13 3C18.5125 3 23 7.4875 23 13C23 18.5125 18.5125 23 13 23ZM9.875 18.625L18.625 13L9.875 7.375V18.625Z" fill="#3C58F7"/>
</svg>`

const pause =`<svg width="361" height="361" viewBox="0 0 361 361" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M53.221 53.221C-17.073 123.515 -17.072 237.485 53.221 307.779C123.514 378.073 237.486 378.073 307.78 307.779C378.073 237.486 378.073 123.514 307.78 53.221C237.485 -17.073 123.514 -17.072 53.221 53.221ZM282.323 282.324C226.088 338.553 134.912 338.555 78.677 282.324C22.441 226.089 22.442 134.911 78.677 78.677C134.913 22.441 226.088 22.442 282.324 78.676C338.559 134.913 338.559 226.088 282.323 282.324Z" fill="#3C58F7"/>
<path d="M149 99.5C153.971 99.5 158 103.529 158 108.5V252.5C158 257.471 153.971 261.5 149 261.5H122C117.029 261.5 113 257.471 113 252.5V108.5C113 103.529 117.029 99.5 122 99.5H149Z" fill="#3C58F7"/>
<path d="M239 99.5C243.971 99.5 248 103.529 248 108.5V252.5C248 257.471 243.971 261.5 239 261.5H212C207.029 261.5 203 257.471 203 252.5V108.5C203 103.529 207.029 99.5 212 99.5H239Z" fill="#3C58F7"/>
</svg>
`

const bar = `<svg width="236" height="25" viewBox="0 0 236 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_203_877)">
<path d="M135 18H137V6H135V18ZM139 22H141V2H139V22ZM131 14H133V10H131V14ZM143 18H145V6H143V18ZM147 10V14H149V10H147Z" fill="black"/>
</g>
<g clip-path="url(#clip1_203_877)">
<path d="M43 19H45V7H43V19ZM47 23H49V3H47V23ZM39 15H41V11H39V15ZM51 19H53V7H51V19ZM55 11V15H57V11H55Z" fill="black"/>
</g>
<g clip-path="url(#clip2_203_877)">
<path d="M59 19H61V7H59V19ZM63 23H65V3H63V23ZM55 15H57V11H55V15ZM67 19H69V7H67V19ZM71 11V15H73V11H71Z" fill="black"/>
</g>
<g clip-path="url(#clip3_203_877)">
<path d="M156 15H158V9H156V15ZM160 17H162V7H160V17ZM152 13H154V11H152V13ZM164 15H166V9H164V15ZM168 11V13H170V11H168Z" fill="black"/>
</g>
<g clip-path="url(#clip4_203_877)">
<path d="M94 15.75H96V9.25001H94V15.75ZM98 17.9167H100V7.08334H98V17.9167ZM90 13.5833H92V11.4167H90V13.5833ZM102 15.75H104V9.25001H102V15.75ZM106 11.4167V13.5833H108V11.4167H106Z" fill="black"/>
</g>
<g clip-path="url(#clip5_203_877)">
<path d="M177 18H179V6H177V18ZM181 22H183V2H181V22ZM173 14H175V10H173V14ZM185 18H187V6H185V18ZM189 10V14H191V10H189Z" fill="black"/>
</g>
<g clip-path="url(#clip6_203_877)">
<path d="M198 18H200V6H198V18ZM202 22H204V2H202V22ZM194 14H196V10H194V14ZM206 18H208V6H206V18ZM210 10V14H212V10H210Z" fill="black"/>
</g>
<path d="M219 18H221V6H219V18ZM223 22H225V2H223V22ZM215 14H217V10H215V14ZM227 18H229V6H227V18ZM231 10V14H233V10H231Z" fill="black"/>
<line x1="7" y1="12.5" x2="131" y2="12.5" stroke="black"/>
<circle cx="3.5" cy="12.5" r="3.5" fill="#444444"/>
<defs>
<clipPath id="clip0_203_877">
<rect width="24" height="24" fill="white" transform="translate(128)"/>
</clipPath>
<clipPath id="clip1_203_877">
<rect width="24" height="24" fill="white" transform="translate(36 1)"/>
</clipPath>
<clipPath id="clip2_203_877">
<rect width="24" height="24" fill="white" transform="translate(52 1)"/>
</clipPath>
<clipPath id="clip3_203_877">
<rect width="24" height="12" fill="white" transform="translate(149 6)"/>
</clipPath>
<clipPath id="clip4_203_877">
<rect width="24" height="13" fill="white" transform="translate(87 6)"/>
</clipPath>
<clipPath id="clip5_203_877">
<rect width="24" height="24" fill="white" transform="translate(170)"/>
</clipPath>
<clipPath id="clip6_203_877">
<rect width="24" height="24" fill="white" transform="translate(191)"/>
</clipPath>
</defs>
</svg>`

const closeIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6281 3.82422C19.3442 3.0918 19.3442 1.90234 18.6281 1.16992C17.9119 0.4375 16.7489 0.4375 16.0328 1.16992L9.99994 7.3457L3.9614 1.17578C3.24526 0.443359 2.08223 0.443359 1.36609 1.17578C0.649943 1.9082 0.649943 3.09766 1.36609 3.83008L7.40463 10L1.37182 16.1758C0.655672 16.9082 0.655672 18.0977 1.37182 18.8301C2.08796 19.5625 3.25098 19.5625 3.96713 18.8301L9.99994 12.6543L16.0385 18.8242C16.7546 19.5566 17.9177 19.5566 18.6338 18.8242C19.3499 18.0918 19.3499 16.9023 18.6338 16.1699L12.5953 10L18.6281 3.82422Z" fill="#E3E6E4"/>
</svg>`

const deleteIcon = `<svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.7087 1.81406L5.07254 2.8125H9.92745L9.29129 1.81406C9.24107 1.73672 9.15737 1.6875 9.06696 1.6875H5.92969C5.83929 1.6875 5.75558 1.7332 5.70536 1.81406H5.7087ZM10.6306 0.878906L11.8594 2.8125H12.3214H13.9286H14.1964C14.6417 2.8125 15 3.18867 15 3.65625C15 4.12383 14.6417 4.5 14.1964 4.5H13.9286V15.1875C13.9286 16.7414 12.7299 18 11.25 18H3.75C2.27009 18 1.07143 16.7414 1.07143 15.1875V4.5H0.803571C0.358259 4.5 0 4.12383 0 3.65625C0 3.18867 0.358259 2.8125 0.803571 2.8125H1.07143H2.67857H3.14062L4.36942 0.875391C4.71763 0.330469 5.30357 0 5.92969 0H9.06696C9.69308 0 10.279 0.330469 10.6272 0.875391L10.6306 0.878906ZM2.67857 4.5V15.1875C2.67857 15.8098 3.15737 16.3125 3.75 16.3125H11.25C11.8426 16.3125 12.3214 15.8098 12.3214 15.1875V4.5H2.67857ZM5.35714 6.75V14.0625C5.35714 14.3719 5.11607 14.625 4.82143 14.625C4.52679 14.625 4.28571 14.3719 4.28571 14.0625V6.75C4.28571 6.44063 4.52679 6.1875 4.82143 6.1875C5.11607 6.1875 5.35714 6.44063 5.35714 6.75ZM8.03571 6.75V14.0625C8.03571 14.3719 7.79464 14.625 7.5 14.625C7.20536 14.625 6.96429 14.3719 6.96429 14.0625V6.75C6.96429 6.44063 7.20536 6.1875 7.5 6.1875C7.79464 6.1875 8.03571 6.44063 8.03571 6.75ZM10.7143 6.75V14.0625C10.7143 14.3719 10.4732 14.625 10.1786 14.625C9.88393 14.625 9.64286 14.3719 9.64286 14.0625V6.75C9.64286 6.44063 9.88393 6.1875 10.1786 6.1875C10.4732 6.1875 10.7143 6.44063 10.7143 6.75Z" fill="#FF8181"/>
</svg>`

const timeIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.3125 9C16.3125 10.9394 15.5421 12.7994 14.1707 14.1707C12.7994 15.5421 10.9394 16.3125 9 16.3125C7.0606 16.3125 5.20064 15.5421 3.82928 14.1707C2.45792 12.7994 1.6875 10.9394 1.6875 9C1.6875 7.0606 2.45792 5.20064 3.82928 3.82928C5.20064 2.45792 7.0606 1.6875 9 1.6875C10.9394 1.6875 12.7994 2.45792 14.1707 3.82928C15.5421 5.20064 16.3125 7.0606 16.3125 9ZM0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9ZM8.15625 4.21875V9C8.15625 9.28125 8.29688 9.54492 8.53242 9.70312L11.9074 11.9531C12.2941 12.2133 12.818 12.1078 13.0781 11.7176C13.3383 11.3273 13.2328 10.807 12.8426 10.5469L9.84375 8.55V4.21875C9.84375 3.75117 9.46758 3.375 9 3.375C8.53242 3.375 8.15625 3.75117 8.15625 4.21875Z" fill="#4675F7"/>
</svg>`


const ReminderDetailModal = ({ modal, setModal, data }: { modal: boolean, setModal: (modal: boolean) => void, data: any }) => {
    const [editable, setEditable] = useState(false);
    const activityRef = useRef(null);
    const [description, setDescription] = useState<string>(data.description)
    const [date, setDate] = useState(new Date(data.date));
    const [time, setTime] = useState(new Date(data.date));
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [mode, setMode] = useState('date');
    const [recording, setRecording] = useState<any>();
    const [recordings, setRecordings] = useState<any[]>([]);
    const [IsRecording, SetIsRecording] = useState<boolean>(false);
    const [IsPLaying, SetIsPLaying] = useState<number>(-1);

    const AudioPlayer = useRef(new Audio.Sound());

    // these are the only items that i got from the design
    const [items, setItems] = useState([
        { label: 'Telefonat', value: 'Telefonat' },
        { label: 'Email', value: 'Email' },
        { label: 'Group', value: 'Group' },
    ]);

    useEffect(() => {
        if(data.date === ""){
            setDate(new Date())
            setTime(new Date())
            setEditable(true)
        }
        else{
            setDate(new Date(data.date))
            setTime(new Date(data.date))
            setEditable(false)
        }
        setDescription(data.description)
    }, [modal]);

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
        // Call the function to close the modal
        setModal(false);
    };

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setTime(currentDate);
    };

    const onIOSChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate)
        setTime(currentDate);
    };

    const showMode = (currentMode: any) => {
        if (Platform.OS === 'ios') {
            if (currentMode === 'date') {
                setShow(!show);
                setMode(currentMode);
            }
            if (currentMode === 'time') {
                setShowTime(true);
                setMode(currentMode);
            }
        } else {
            DateTimePickerAndroid.open({
                value: date,
                onChange: onDateChange,
                mode: currentMode,
                is24Hour: true,
            });
        }
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    // Function to start recording
    const StartRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            SetIsRecording(true);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    // Function to stop recording
    const StopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();

        if (uri) {
            // Remove the recording from the array
            setRecordings((prevRecordings) => [...prevRecordings, recording]);
        }
        SetIsRecording(false);
    };

    // Function to play the recorded audio
    const PlayRecording = async (recording: any, index: number) => {
        try {
            // Load the recording URI
            await AudioPlayer.current.loadAsync({ uri: recording.getURI() }, {}, true);

            // Get player status
            const playerStatus = await AudioPlayer.current.getStatusAsync();


            // Play if the recording is loaded successfully
            if (playerStatus.isLoaded && !playerStatus.isPlaying) {
                AudioPlayer.current.playAsync();
                SetIsPLaying(index);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const StopPlaying = async () => {
        try {
            // Get player status
            const playerStatus = await AudioPlayer.current.getStatusAsync();

            // If recording is playing, stop it
            if (playerStatus.isLoaded) {
                await AudioPlayer.current.unloadAsync();
            }

            SetIsPLaying(-1);
        } catch (error) { }
    };

    const handlePlaybackStatusUpdate = async (status: any) => {
        if (status.didJustFinish) {
            // Unload the sound after it finishes playing
            await AudioPlayer.current.unloadAsync();
            SetIsPLaying(-1);
        }
    };

    useEffect(() => {
        // Add event listener for playback status update
        AudioPlayer.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    }, []);

    const handlePlay = async (index: number, recording: any) => {
        if (IsPLaying !== -1 && IsPLaying !== index) {
            await StopPlaying();
        }
        if (IsPLaying === index) {
            await StopPlaying();
        } else {
            await PlayRecording(recording, index);
        }
    }

    const handleDelete = async (index: number) => {
        const newRecordings = recordings.filter((recording, i) => i !== index);
        setRecordings(newRecordings);
    }

    const deleteReminder = () => {
        setModal(false)
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(!modal)}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.centeredView}>

                <View ref={activityRef} style={styles.modalView}>
                    {/* Top Line */}
                    <View 
              {...panResponder.panHandlers}
          style={{width: "100%", paddingBottom: 30}}>

          <View
              style={{
                width: 54,
                height: 6,
                backgroundColor: "#D9D9D9",
                borderRadius: 30,
                alignSelf: "center",
              }}
              ></View>
              </View>
                    {/* Edit Option */}
                    {
                        !editable &&
                        <View style={{ width: '100%', alignItems: 'flex-end', paddingHorizontal: 11,marginTop:20 }} {...panResponder.panHandlers}>
                            <TouchableOpacity onPress={() => { setEditable(!editable) }} style={{ width: 44, height: 44, backgroundColor: "#CBCBCB", borderRadius: 30 }}>
                                <SvgXml xml={edit} width={20} height={20} style={{ alignSelf: 'center', marginTop: 12 }} />
                            </TouchableOpacity>
                        </View>
                    }

                    {/*  editable */}
                    {
                        editable &&
                        <View style={{ width: '100%', minHeight: 40, alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 11, flexDirection: "row", marginTop:20 }} {...panResponder.panHandlers}>
                            <TouchableOpacity onPress={() => { setEditable(!editable) }} style={{ paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "#818181" }}>Abbrechen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setEditable(!editable) }} style={{ backgroundColor: "#3C58F7", borderRadius: 30, paddingHorizontal: 8, paddingVertical: 6 }}>
                                <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>Speichern</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <ScrollView style={{ flex: 1, width: '100%', flexDirection: 'column', paddingHorizontal: 24, marginTop: 16 }}>

                        {/* Date */}
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <Text style={styles.label}>Datum</Text>
                            {
                                Platform.OS === 'android' ? (
                                    <Pressable
                                        onPress={editable ? showDatepicker : null}
                                    >
                                        <TextInput
                                            style={{ backgroundColor: '#ffffff' }}
                                            theme={{ roundness: 9 }}
                                            label=""
                                            placeholder={"Select Date"}
                                            value={`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                                            activeOutlineColor='none'
                                            outlineColor='#d9dedb'
                                            mode='outlined'
                                            editable={false}
                                            right={
                                                <TextInput.Icon
                                                    onPress={editable ? showDatepicker : null}
                                                    icon={() => (
                                                        <SvgXml xml={calenderBlue} width={18} height={18} style={{ alignSelf: 'center' }} />
                                                    )}
                                                />
                                            }
                                        />
                                    </Pressable>
                                ) : (
                                    <TextInput
                                        style={{ backgroundColor: '#ffffff' }}
                                        theme={{ roundness: 9 }}
                                        label=""
                                        placeholder={"Select Date"}
                                        value={`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                                        activeOutlineColor='none'
                                        outlineColor='#d9dedb'
                                        mode='outlined'
                                        onPressIn={editable ? showDatepicker : null}
                                        editable={false}
                                        right={
                                            <TextInput.Icon
                                                onPress={editable ? showDatepicker : null}
                                                forceTextInputFocus={false}
                                                icon={() => (
                                                    <SvgXml xml={calenderBlue} width={18} height={18} style={{ alignSelf: 'center' }} />
                                                )}

                                            />
                                        }
                                    />
                                )
                            }
                        </View>

                        {/* Time */}
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <Text style={styles.label}>Uhrzeit</Text>
                            {
                                Platform.OS === 'android' ? (
                                    <Pressable
                                        onPress={editable ? showTimepicker : null}
                                    >
                                        <TextInput
                                            style={{ backgroundColor: '#ffffff' }}
                                            theme={{ roundness: 9 }}
                                            label=""
                                            placeholder={"Select Date"}
                                            value={time.getHours() + ":" + time.getMinutes()}
                                            activeOutlineColor='none'
                                            outlineColor='#d9dedb'
                                            mode='outlined'
                                            editable={false}
                                            right={
                                                <TextInput.Icon
                                                    onPress={editable ? showTimepicker : null}
                                                    icon={() => (
                                                        <SvgXml xml={timeIcon} width={18} height={18} style={{ alignSelf: 'center' }} />
                                                    )}
                                                />
                                            }
                                        />
                                    </Pressable>
                                ) : (
                                    <TextInput
                                        style={{ backgroundColor: '#ffffff' }}
                                        theme={{ roundness: 9 }}
                                        label=""
                                        placeholder={"Select Date"}
                                        value={time.getHours() + ":" + time.getMinutes()}
                                        activeOutlineColor='none'
                                        outlineColor='#d9dedb'
                                        mode='outlined'
                                        onPressIn={editable ? showTimepicker : null}
                                        editable={false}
                                        right={
                                            <TextInput.Icon
                                                onPress={editable ? showTimepicker : null}
                                                forceTextInputFocus={false}
                                                icon={() => (
                                                    <SvgXml xml={timeIcon} width={18} height={18} style={{ alignSelf: 'center' }} />
                                                )}

                                            />
                                        }
                                    />
                                )
                            }
                        </View>

                        {/* Beschreibung */}
                        <View style={{ width: "100%", marginTop: 10 }}>
                            <Text style={styles.label}>Beschreibung</Text>
                            <TextInput
                                style={{ backgroundColor: '#ffffff' }}
                                theme={{ roundness: 9 }}
                                label=""
                                placeholder={"Enter Description"}
                                value={description}
                                activeOutlineColor='none'
                                outlineColor='#d9dedb'
                                mode='outlined'
                                editable={editable}
                                onChangeText={setDescription}
                                multiline={true}
                                numberOfLines={7}
                            />
                        </View>

                        <View style={{ width: "100%", marginTop: 28, flexDirection: 'column' }}>


                        </View>
                        {recordings.map((recording, index) => (
                            <View style={{ width: "100%", flexDirection: 'row', marginTop: 8 }}>
                                <View style={{ width: "90%", height: 45, borderWidth: 1, borderColor: "#949F99", borderRadius: 9, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 }}>
                                    <TouchableOpacity
                                        onPress={() => handlePlay(index, recording)}
                                        activeOpacity={0.5}>
                                        <SvgXml xml={IsPLaying===index? pause :playIcon} width={26} height={26} />
                                    </TouchableOpacity>
                                    <SvgXml xml={bar} height={25} style={{ marginLeft: 10 }} />
                                </View>
                                {
                                    editable ?
                                        <TouchableOpacity onPress={() => handleDelete(index)} style={{ height: 45, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                                            <SvgXml xml={closeIcon} width={18} height={18} />
                                        </TouchableOpacity>
                                        : null}

                            </View>
                        ))}

                    </ScrollView>
                    <View style={{ width: "100%", paddingHorizontal: 24, alignItems: 'center' }}>
                        {
                            !editable &&
                            <TouchableOpacity
                                style={{ width: "100%", backgroundColor: IsRecording ? "#FF0000" : "#4675F7", flexDirection: "row", height: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}
                                onPress={IsRecording ? StopRecording : StartRecording}
                                accessibilityLabel="Learn more about this purple button">
                                <SvgXml xml={micIcon} width={17} height={22} />
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "600", marginLeft: 12 }}>{IsRecording ? "Aufnehmen" : "Aufnahme starten"}</Text>
                            </TouchableOpacity>
                        }
                        {
                            editable &&
                            <TouchableOpacity
                                style={{ width: "50%", borderWidth: 1, borderColor: "#FF8181", flexDirection: "row", height: 54, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}
                                onPress={deleteReminder}
                                accessibilityLabel="Learn more about this purple button">
                                <SvgXml xml={deleteIcon} width={15} height={18} />
                                <Text style={{ color: "#FF8181", fontSize: 18, fontWeight: "600", marginLeft: 8 }}>entfernen</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>

            <IOSDateModal modal={show} setModal={setShow} date={date} setDate={onIOSChange} />
            <IOSTimeModal modal={showTime} setModal={setShowTime} date={time} setDate={onIOSChange} />
        </Modal>
    )
}

const styles = StyleSheet.create({

    centeredView: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        marginTop:10
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
    label: {
        color: '#383838',
        fontSize: 14,
        fontWeight: '500',
    },
})

export default ReminderDetailModal;
