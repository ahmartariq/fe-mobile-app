import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  PanResponder,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-paper";
import { Path, Svg, SvgXml } from "react-native-svg";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import IOSDateModal from "./IOSDateModal";
import { Audio } from "expo-av";

const searchIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.20111 15.3967C12.1782 15.3967 15.4022 12.1739 15.4022 8.19837C15.4022 4.22282 12.1782 1 8.20111 1C4.22405 1 1 4.22282 1 8.19837C1 12.1739 4.22405 15.3967 8.20111 15.3967Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.546 15.9493C14.9701 17.2294 15.9383 17.3574 16.6824 16.2373C17.3625 15.2132 16.9144 14.3731 15.6822 14.3731C14.7701 14.3651 14.258 15.0772 14.546 15.9493Z" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const titleIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z" stroke="#4675F7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

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
</svg>`;

const micIcon = `<svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 13.75C10.3675 13.75 11.875 12.2425 11.875 10.375V3.625C11.875 1.7575 10.3675 0.25 8.5 0.25C6.6325 0.25 5.125 1.7575 5.125 3.625V10.375C5.125 12.2425 6.6325 13.75 8.5 13.75Z" fill="white"/>
<path d="M14.125 10.375C14.125 13.48 11.605 16 8.5 16C5.395 16 2.875 13.48 2.875 10.375H0.625C0.625 14.3463 3.56125 17.6087 7.375 18.16V21.625H9.625V18.16C13.4388 17.6087 16.375 14.3463 16.375 10.375H14.125Z" fill="white"/>
</svg>`;

const playIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM13 23C7.4875 23 3 18.5125 3 13C3 7.4875 7.4875 3 13 3C18.5125 3 23 7.4875 23 13C23 18.5125 18.5125 23 13 23ZM9.875 18.625L18.625 13L9.875 7.375V18.625Z" fill="#3C58F7"/>
</svg>`;

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
</svg>`;

const closeIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6281 3.82422C19.3442 3.0918 19.3442 1.90234 18.6281 1.16992C17.9119 0.4375 16.7489 0.4375 16.0328 1.16992L9.99994 7.3457L3.9614 1.17578C3.24526 0.443359 2.08223 0.443359 1.36609 1.17578C0.649943 1.9082 0.649943 3.09766 1.36609 3.83008L7.40463 10L1.37182 16.1758C0.655672 16.9082 0.655672 18.0977 1.37182 18.8301C2.08796 19.5625 3.25098 19.5625 3.96713 18.8301L9.99994 12.6543L16.0385 18.8242C16.7546 19.5566 17.9177 19.5566 18.6338 18.8242C19.3499 18.0918 19.3499 16.9023 18.6338 16.1699L12.5953 10L18.6281 3.82422Z" fill="#E3E6E4"/>
</svg>`;

interface Data {
  name: string;
  email: string;
}

const dataArray: Data[] = [
  { name: "Ben Fisher", email: "ben.fisher@mailing.com" },
  { name: "Annette Black", email: "annette.black@appxelent.com" },
  { name: "Albert Flores", email: "albert.flores@google.com" },
  { name: "Bessie Cooper", email: "bessie.cooper@finance-ab.com" },
  { name: "Brooklyn Simmons", email: "brooklyn.simmons@netsome.com" },
  { name: "Courtney Henry", email: "courtney.henry@example.com" },
  { name: "Arlene McCoy", email: "arlene.mccoy@ingen.com" },
];

const colorCombinations = [
  ["#3C58F7", "#34DCFC"],
  ["#D73C3C", "#34DCFC"],
  ["#3CF770", "#34DCFC"],
  ["#F7A13C", "#34DCFC"],
];

const QuickActivityModal = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: (modal: boolean) => void;
}) => {
  const activityRef = useRef(null);
  const [letter, setLetter] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [recording, setRecording] = useState<any>();
  const [recordings, setRecordings] = useState<any[]>([]);
  const [IsRecording, SetIsRecording] = useState<boolean>(false);
  const [IsPLaying, SetIsPLaying] = useState<number>(-1);
  const [search, setSearch] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState({
    type,
    title: "",
    description: "",
  });

  const [filteredData, setFilteredData] = useState<Data[]>([]);

  const AudioPlayer = useRef(new Audio.Sound());

  // these are the only items that i got from the design
  const [items, setItems] = useState([
    { label: "Telefonat", value: "Telefonat" },
    { label: "Email", value: "Email" },
    { label: "Group", value: "Group" },
  ]);

  const createLetter = (name: string) => {
    const namesArray = name.split(" ");
    const firstName = namesArray[0] || "";
    const lastName = namesArray[1] || "";
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

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

  const groupedData: { [letter: string]: Data[] } = {};
  const sortedArray = dataArray.sort((a, b) => a.name.localeCompare(b.name));

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

  useEffect(() => {
    if (name !== "") {
      const namesArray = name.split(" ");
      const firstName = namesArray[0] || "";
      const lastName = namesArray[1] || "";
      setLetter(
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    }
  }, []);

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

  const handleAdd = () => {
    if (type === "") {
      setErrorMessages({ ...errorMessages, type: "Please select type" });
      return;
    }
    if (title === "") {
      setErrorMessages({
        ...errorMessages,
        title: "Please enter title",
        type: "",
      });
      return;
    }
    if (description === "") {
      setErrorMessages({
        ...errorMessages,
        description: "Please enter description",
        title: "",
        type: "",
      });
      return;
    }

    setModal(false);
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onIOSChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    if (Platform.OS === "ios") {
      setShow(!show);
      setMode(currentMode);
    } else {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onDateChange,
        mode: currentMode,
      });
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // Function to start recording
  const StartRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      SetIsRecording(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  // Function to stop recording
  const StopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
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
      await AudioPlayer.current.loadAsync(
        { uri: recording.getURI() },
        {},
        true
      );

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
    } catch (error) {}
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
  };

  const handleDelete = async (index: number) => {
    const newRecordings = recordings.filter((recording, i) => i !== index);
    setRecordings(newRecordings);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => setModal(!modal)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View ref={activityRef} style={styles.modalView}>
          {/* Top Line */}
          <View
            style={{
              width: 54,
              height: 6,
              backgroundColor: "#D9D9D9",
              borderRadius: 30,
            }}
            {...panResponder.panHandlers}
          ></View>

          {/* Edit Option */}
          {/*  editable */}

          <View
            style={{
              width: "100%",
              minHeight: 40,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 11,
              flexDirection: "row",
            }}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ paddingHorizontal: 20 }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#818181" }}
              >
                Abbrechen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: "#3C58F7",
                borderRadius: 30,
                paddingHorizontal: 8,
                paddingVertical: 6,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
                Speichern
              </Text>
            </TouchableOpacity>
          </View>

          {/* Seach Bar */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: 24,
              marginTop: 20,
            }}
            {...panResponder.panHandlers}
          >
            <TextInput
              style={{ backgroundColor: "#ffffff", width: "100%" }}
              theme={{ roundness: 9 }}
              label=""
              placeholder={"Kontakt suchen"}
              value={search}
              activeOutlineColor="none"
              outlineColor="#949F99"
              mode="outlined"
              onChangeText={setSearch}
              left={
                <TextInput.Icon
                  icon={() => (
                    <SvgXml
                      xml={searchIcon}
                      width={18}
                      height={18}
                      style={{ alignSelf: "center" }}
                    />
                  )}
                />
              }
            />
          </View>

          <ScrollView
            style={{
              width: "100%",
              marginTop: 24,
              flexDirection: "column",
            }}
          >
            {search === "" && (
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "column",
                  paddingHorizontal: 24,
                  marginTop: 16,
                }}
              >
                {name !== "" && email !== "" && (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      marginBottom: 20,
                    }}
                    {...panResponder.panHandlers}
                  >
                    <LinearGradient
                      colors={["#3C58F7", "#34DCFC"]}
                      style={styles.gradient}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 30,
                          fontWeight: "600",
                        }}
                      >
                        {letter}
                      </Text>
                    </LinearGradient>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        marginLeft: 21,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {name}
                      </Text>
                      <Text
                        style={{
                          color: "#545454",
                          fontSize: 14,
                          fontWeight: "400",
                          marginTop: 4,
                        }}
                      >
                        {email}
                      </Text>
                    </View>
                  </View>
                )}
                {/* Art der Aktivität */}
                <View style={{ width: "100%" }}>
                  <Text style={styles.label}>Art der Aktivität</Text>
                  <DropDownPicker
                    open={open}
                    value={type}
                    items={items}
                    setOpen={setOpen}
                    setValue={setType}
                    setItems={setItems}
                    style={{
                      backgroundColor: "#FDFDFD",
                      borderColor: "#949F99",
                      borderRadius: 9,
                      borderWidth: 1,
                      marginTop: 7,
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: "#FDFDFD",
                      borderColor: "#949F99",
                      borderRadius: 9,
                      borderWidth: 1,
                      zIndex: 1000,
                    }}
                    textStyle={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#1F1F1F",
                    }}
                    arrowIconStyle={[{ tintColor: "#4675F7" } as ViewStyle]}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                  />
                  {errorMessages.type !== "" && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                      {errorMessages.type}
                    </Text>
                  )}
                </View>

                {/* title */}
                <View style={{ width: "100%", marginTop: 10, zIndex: -1000 }}>
                  <Text style={styles.label}>Titel</Text>
                  <TextInput
                    style={{ backgroundColor: "#ffffff" }}
                    theme={{ roundness: 9 }}
                    label=""
                    placeholder={"Enter Title"}
                    value={title}
                    activeOutlineColor="none"
                    outlineColor="#949F99"
                    mode="outlined"
                    onChangeText={setTitle}
                    right={
                      title ? (
                        <TextInput.Icon
                          icon={() => (
                            <SvgXml
                              xml={titleIcon}
                              width={18}
                              height={18}
                              style={{ alignSelf: "center" }}
                            />
                          )}
                        />
                      ) : null
                    }
                  />
                  {errorMessages.title !== "" && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                      {errorMessages.title}
                    </Text>
                  )}
                </View>

                {/* Date */}
                <View style={{ width: "100%", marginTop: 10, zIndex: -1000 }}>
                  <Text style={styles.label}>Datum</Text>
                  {Platform.OS === "android" ? (
                    <Pressable onPress={showDatepicker}>
                      <TextInput
                        style={{ backgroundColor: "#ffffff" }}
                        theme={{ roundness: 9 }}
                        label=""
                        placeholder={"Select Date"}
                        value={`${date.getDate()}.${
                          date.getMonth() + 1
                        }.${date.getFullYear()}`}
                        activeOutlineColor="none"
                        outlineColor="#949F99"
                        mode="outlined"
                        editable={false}
                        right={
                          <TextInput.Icon
                            onPress={showDatepicker}
                            icon={() => (
                              <SvgXml
                                xml={calenderBlue}
                                width={18}
                                height={18}
                                style={{ alignSelf: "center" }}
                              />
                            )}
                          />
                        }
                      />
                    </Pressable>
                  ) : (
                    <TextInput
                      style={{ backgroundColor: "#ffffff" }}
                      theme={{ roundness: 9 }}
                      label=""
                      placeholder={"Select Date"}
                      value={`${date.getDate()}.${
                        date.getMonth() + 1
                      }.${date.getFullYear()}`}
                      activeOutlineColor="none"
                      outlineColor="#949F99"
                      mode="outlined"
                      onPressIn={showDatepicker}
                      editable={false}
                      right={
                        <TextInput.Icon
                          onPress={showDatepicker}
                          forceTextInputFocus={false}
                          icon={() => (
                            <SvgXml
                              xml={calenderBlue}
                              width={18}
                              height={18}
                              style={{ alignSelf: "center" }}
                            />
                          )}
                        />
                      }
                    />
                  )}
                </View>

                {/* Beschreibung */}
                <View style={{ width: "100%", marginTop: 10 }}>
                  <Text style={styles.label}>Beschreibung</Text>
                  <TextInput
                    style={{ backgroundColor: "#ffffff" }}
                    theme={{ roundness: 9 }}
                    label=""
                    placeholder={"Enter Description"}
                    value={description}
                    activeOutlineColor="none"
                    outlineColor="#949F99"
                    mode="outlined"
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={7}
                  />
                  {errorMessages.description !== "" && (
                    <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                      {errorMessages.description}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    width: "100%",
                    marginTop: 28,
                    flexDirection: "column",
                  }}
                ></View>
                {recordings.map((recording, index) => (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      marginTop: 8,
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        height: 45,
                        borderWidth: 1,
                        borderColor: "#949F99",
                        borderRadius: 9,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 6,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => handlePlay(index, recording)}
                        activeOpacity={0.5}
                      >
                        <SvgXml xml={playIcon} width={26} height={26} />
                      </TouchableOpacity>
                      <SvgXml
                        xml={bar}
                        height={25}
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(index)}
                      style={{
                        height: 45,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 10,
                      }}
                    >
                      <SvgXml xml={closeIcon} width={18} height={18} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {search !== "" &&
              filteredData.map(({ name, email }) => {
                const [startColor, endColor] = getRandomColors();
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      setName(name);
                      setEmail(email);
                      setSearch("");
                    }}
                    key={name}
                    style={styles.card}
                  >
                    <LinearGradient
                      style={styles.gradient1}
                      colors={[startColor, endColor]}
                    >
                      {/* showing letter */}
                      <Text
                        style={{
                          color: "#202020",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {createLetter(name)}
                      </Text>
                    </LinearGradient>
                    <View style={{ marginLeft: 20 }}>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        {name}
                      </Text>
                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 12,
                          fontWeight: "400",
                          color: "#545454",
                        }}
                      >
                        {email}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>

          <View
            style={{
              width: "100%",
              paddingHorizontal: 24,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: IsRecording ? "#FF0000" : "#4675F7",
                flexDirection: "row",
                height: 54,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={IsRecording ? StopRecording : StartRecording}
              accessibilityLabel="Learn more about this purple button"
            >
              <SvgXml xml={micIcon} width={17} height={22} />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                  marginLeft: 12,
                }}
              >
                {IsRecording ? "Aufnehmen" : "Aufnahme starten"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <IOSDateModal
        modal={show}
        setModal={setShow}
        date={date}
        setDate={onIOSChange}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  modalView: {
    width: "100%",
    height: Platform.OS === "ios" ? "94%" : "100%",
    backgroundColor: "#FDFDFD",
    borderRadius: 15,
    paddingTop: 8,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  gradient: {
    width: 76,
    height: 76,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient1: {
    width: 46,
    height: 46,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#383838",
    fontSize: 14,
    fontWeight: "500",
  },
  label1: {
    width: 21,
    height: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4675F7",
    borderRadius: 6,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
});

export default QuickActivityModal;
