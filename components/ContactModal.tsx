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
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import ActivityDetailModal from "./ActivityDetailModal";
import ReminderDetailModal from "./ReminderDetailModal";
import ApproachDetailModal from "./ApproachDetailModal";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput as TextInput1 } from "react-native-paper";
import IOSDateModal from "./IOSDateModal";
import {
  BottomSheetModal,
  BottomSheetScrollView as ScrollView,
} from "@gorhom/bottom-sheet";
import { color } from "react-native-reanimated";

const edit = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 18.3333H2.5C2.15833 18.3333 1.875 18.0499 1.875 17.7083C1.875 17.3666 2.15833 17.0833 2.5 17.0833H17.5C17.8417 17.0833 18.125 17.3666 18.125 17.7083C18.125 18.0499 17.8417 18.3333 17.5 18.3333Z" fill="white"/>
<path d="M15.85 2.90005C14.2333 1.28338 12.65 1.24172 10.9917 2.90005L9.98334 3.90838C9.90001 3.99172 9.86668 4.12505 9.90001 4.24172C10.5333 6.45005 12.3 8.21672 14.5083 8.85005C14.5417 8.85838 14.575 8.86672 14.6083 8.86672C14.7 8.86672 14.7833 8.83338 14.85 8.76672L15.85 7.75838C16.675 6.94172 17.075 6.15005 17.075 5.35005C17.0833 4.52505 16.6833 3.72505 15.85 2.90005Z" fill="white"/>
<path d="M13.0083 9.60841C12.7667 9.49175 12.5333 9.37508 12.3083 9.24175C12.125 9.13341 11.95 9.01675 11.775 8.89175C11.6333 8.80008 11.4667 8.66675 11.3083 8.53341C11.2917 8.52508 11.2333 8.47508 11.1667 8.40841C10.8917 8.17508 10.5833 7.87508 10.3083 7.54175C10.2833 7.52508 10.2417 7.46675 10.1833 7.39175C10.1 7.29175 9.95834 7.12508 9.83334 6.93341C9.73335 6.80841 9.61668 6.62508 9.50834 6.44175C9.37501 6.21675 9.25835 5.99175 9.14168 5.75841C8.98871 5.43063 8.5585 5.33326 8.30273 5.58903L3.61668 10.2751C3.50834 10.3834 3.40834 10.5917 3.38334 10.7334L2.93334 13.9251C2.85001 14.4917 3.00834 15.0251 3.35834 15.3834C3.65834 15.6751 4.07501 15.8334 4.52501 15.8334C4.62501 15.8334 4.72501 15.8251 4.82501 15.8084L8.02501 15.3584C8.17501 15.3334 8.38335 15.2334 8.48335 15.1251L13.1771 10.4313C13.4278 10.1806 13.3336 9.74936 13.0083 9.60841Z" fill="white"/></svg>`;

const email = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75" stroke="#4675F7" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const phone = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.11934 0.912568C5.83359 0.222333 5.08027 -0.14505 4.36035 0.0516302L1.09473 0.942255C0.449023 1.12038 0 1.70671 0 2.37468C0 11.5555 7.44414 18.9997 16.625 18.9997C17.293 18.9997 17.8793 18.5507 18.0574 17.905L18.948 14.6393C19.1447 13.9194 18.7773 13.1661 18.0871 12.8803L14.5246 11.396C13.9197 11.1436 13.2184 11.318 12.8064 11.8264L11.3072 13.6559C8.69473 12.4202 6.57949 10.305 5.34375 7.69245L7.17324 6.19694C7.68164 5.78132 7.85606 5.08366 7.60371 4.47878L6.11934 0.916279V0.912568Z" fill="#4675F7"/>
</svg>`;

const group = `<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6C16.66 6 17.99 4.66 17.99 3C17.99 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 4.66 13.34 6 15 6ZM7 6C8.66 6 9.99 4.66 9.99 3C9.99 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3C4 4.66 5.34 6 7 6ZM7 8C4.67 8 0 9.17 0 11.5V14H14V11.5C14 9.17 9.33 8 7 8ZM15 8C14.71 8 14.38 8.02 14.03 8.05C15.19 8.89 16 10.02 16 11.5V14H22V11.5C22 9.17 17.33 8 15 8Z" fill="#4675F7"/>
</svg>`;

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

const clock = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6668 7.99998C14.6668 11.68 11.6801 14.6666 8.0001 14.6666C4.3201 14.6666 1.33344 11.68 1.33344 7.99998C1.33344 4.31998 4.3201 1.33331 8.0001 1.33331C11.6801 1.33331 14.6668 4.31998 14.6668 7.99998Z" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4732 10.1201L8.40657 8.88677C8.04657 8.67344 7.75323 8.16011 7.75323 7.74011V5.00677" stroke="#3B3C3E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const tags = ["nue", "B2B", "Investor"];
const subCategories = ["Profil", "Aktivitäten", "Erinnerungen", "Ansätze"];

// Dont change the date format as it passes the date to the ActivityDetailModal.tsx
// Email, Telefonat, Group,  are the only items that i got from the design file.
const activity = [
  {
    type: "Email",
    title: "Einladung zu Gespräch",
    description:
      "Um weitere Infos zu besprechen haben wir per Mail einen Termin vereinbart, um asdasdads Um weitere Infos zu besprechen haben wir per Mail einen Termin vereinbart, um asdasdads",
    date: "2023-06-21T22:48:43.000Z",
  },
  {
    type: "Email",
    title: "Follow-up E-Mail",
    description: "In Followup Mail nochmal für das Gespräch bedankt.",
    date: "2023-06-18T22:48:43.000Z",
    time: "9:00",
  },
  {
    type: "Telefonat",
    title: "Telefonat bzgl. Kooperation",
    description:
      "30 min. telefoniert und über Einsatzmöglichkeiten der Software gesprochen.",
    date: "2023-06-15T22:48:43.000Z",
    time: "13:30",
  },
  {
    type: "Group",
    title: "Treffen auf dem Fin-Summit",
    description: "Kennenlernen beim Stand des Startups.",
    date: "2023-06-12T22:48:43.000Z",
  },
];

const remainder = [
  {
    description: "Zum 40. Geburtstag gratulieren",
    date: "2023-06-2T22:48:43.000Z",
  },
  {
    description:
      "Anrufen und fragen wie der Vortrag auf dem Fin-Summit gelaufen ist",
    date: "2023-06-28T22:48:43.000Z",
  },
  {
    description: "Follow-Up Email ",
    date: "2023-06-2T22:48:43.000Z",
  },
  {
    description:
      "Gespräch für die kommende Messe planen und Termin vereinbaren ",
    date: "2023-05-12T22:48:43.000Z",
  },
];

const approaches = [
  {
    title: "Erstgespräch Coldcall",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  },
  {
    title: "Zweites Followup",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  },
  {
    title: "Anbieten von Individualleistung",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.",
  },
];
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

const ContactModal = ({
  contactModel,
  setContactModel,
  data,
  infoData,
}: {
  contactModel: boolean;
  setContactModel: (contactModel: boolean) => void;
  data: any;
  infoData: any;
}) => {
  const [letter, setLetter] = useState("");
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState(infoData);
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  const [editable, setEditable] = useState(false);
  const [activityModal, setActivityModal] = useState(false);
  const [activityData, setActivityData] = useState(activity[0]);
  const [remainderModal, setRemainderModal] = useState(false);
  const [remainderData, setRemainderData] = useState(remainder[0]);
  const [approachModal, setApproachModal] = useState(false);
  const [approachData, setApproachData] = useState(approaches[0]);
  const [textWidths, setTextWidths] = useState([]);
  //const [editable, setEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const modalRef = useRef(null);

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

  const groupedData: { [letter: string]: Data[] } = {};
  const sortedArray = dataArray.sort((a, b) => a.name.localeCompare(b.name));

  sortedArray.forEach((obj) => {
    const firstLetter = obj.name.charAt(0).toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(obj);
  });

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  useEffect(() => {
    setEditable(false);
  }, [contactModel]);

  useEffect(() => {
    if (data.name !== "") {
      const namesArray = data.name.split(" ");
      const firstName = namesArray[0];
      const lastName = namesArray[1];
      setLetter(firstName.charAt(0) + lastName.charAt(0));
    }
  }, [data]);

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderRelease: (e, gestureState) => {
  //       if (gestureState.dy > 50) {
  //         // Close the modal when swiped down by more than 50 pixels
  //         closeModal();
  //       }
  //     },
  //   })
  // ).current;

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["100%", "100%"];

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setContactModel(true);
    }, 100);
  }

  if (contactModel) {
    handlePresentModal();
  }

  const onIOSChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const closeModal = () => {
    // Call the function to close the modal
    setContactModel(false);
  };
  const onDateChange = (event: any, selectedDate: any) => {
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

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const dateFormat = (date: string) => {
    const dateObj = new Date(date);
    const formattedDate = `${dateObj.getDate()} ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
    return formattedDate;
  };

  const handleTextLayout = (index: number, event: any) => {
    const { width } = event.nativeEvent.layout;
    setTextWidths((prevWidths) => {
      const updatedWidths = [...prevWidths];
      updatedWidths[index] = width;
      return updatedWidths;
    });
  };
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      handleIndicatorStyle={{ display: "none" }}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: "transparent",
        borderColor: "transparent",
      }}
      onDismiss={() => setContactModel(false)}
    >
      {/* <Modal
      animationType="slide"
      transparent={true}
      visible={contactModel}
      onRequestClose={() => setContactModel(!contactModel)}
    > */}
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View ref={modalRef} style={styles.modalView}>
          {/* Top Line */}
          <View
            //  {...panResponder.panHandlers}
            style={{ width: "100%", paddingBottom: 20 }}
          >
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
          {!editable && selected == 0 && (
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                paddingHorizontal: 11,
              }}
              ///    {...panResponder.panHandlers}
            >
              <TouchableOpacity
                onPress={() => {
                  setEditable(!editable);
                }}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: "#CBCBCB",
                  borderRadius: 30,
                }}
              >
                <SvgXml
                  xml={edit}
                  width={20}
                  height={20}
                  style={{ alignSelf: "center", marginTop: 12 }}
                />
              </TouchableOpacity>
            </View>
          )}

          {/*  editable */}
          {editable && selected == 0 && (
            <View
              style={{
                width: "100%",
                minHeight: 40,
                marginBottom: 4,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 11,
                flexDirection: "row",
              }}
              //   {...panResponder.panHandlers}
            >
              <TouchableOpacity
                onPress={() => {
                  setEditable(!editable);
                }}
                style={{ paddingHorizontal: 20 }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#818181",
                  }}
                >
                  Abbrechen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEditable(!editable);
                }}
                style={{
                  backgroundColor: "#3C58F7",
                  borderRadius: 30,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                >
                  Speichern
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView style={{ height: "100%", marginBottom: 50 }}>
            <View
              style={{
                width: "100%",
                marginTop: 5,
                paddingHorizontal: 24,
                justifyContent: "space-around",
              }}
            >
              {/* Contact Details */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: selected === 0 ? 0 : 44,
                }}
                //    {...panResponder.panHandlers}
              >
                <LinearGradient
                  colors={[data.startColor, data.endColor]}
                  style={styles.gradient}
                >
                  <Text
                    style={{ color: "black", fontSize: 30, fontWeight: "600" }}
                  >
                    {letter}
                  </Text>
                </LinearGradient>
                <View
                  style={{ flexDirection: "column", justifyContent: "center" }}
                >
                  {!editable ? (
                    <Text
                      style={{
                        color: "#1F1F1F",
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: 21,
                      }}
                    >
                      {data.name}
                    </Text>
                  ) : (
                    <TextInput
                      style={{
                        color: "#1F1F1F",
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: 21,
                        width: 120,
                      }}
                      value={info.name}
                      placeholder={data.name}
                      placeholderTextColor="#1F1F1F"
                      onChangeText={(text) => setInfo({ ...info, name: text })}
                      editable={editable}
                    />
                  )}
                  <Text
                    style={{
                      color: "#545454",
                      fontSize: 14,
                      fontWeight: "400",
                      marginLeft: 21,
                      marginTop: 4,
                    }}
                  >
                    {info.email == "" ? data.email : info.email}
                  </Text>
                </View>
              </View>

              {/* tags */}
              <View style={{ width: "100%", marginTop: 25 }}>
                <ScrollView horizontal={true}>
                  {tags.map((item, index) => (
                    <View
                      style={{
                        height: 32,
                        marginRight: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 18,
                        backgroundColor: "#F1F5FF",
                        borderWidth: 1.5,
                        borderColor: "#DFE7FC",
                        borderRadius: 9,
                      }}
                    >
                      <Text
                        style={{
                          color: "#4675F7",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                  {editable && (
                    <TouchableOpacity
                      style={{
                        height: 32,
                        marginRight: 6,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 26,
                        borderWidth: 1.5,
                        borderColor: "#DFE7FC",
                        borderRadius: 9,
                        borderStyle: "dashed",
                      }}
                    >
                      <Text
                        style={{
                          color: "#4675F7",
                          fontSize: 12,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  )}
                </ScrollView>
              </View>

              {/* SubCategory */}
              {!editable && (
                <View
                  style={{
                    width: "100%",
                    marginTop: 30,
                    height: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderColor: "#E7EBF4",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                  }}
                >
                  {subCategories.map((item, index) => (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        setSelected(index);
                      }}
                      key={index}
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        onLayout={(event) => handleTextLayout(index, event)}
                        style={{
                          color: selected === index ? "#4675F7" : "#545454",
                          fontSize: 12,
                          fontWeight: "600",
                          marginTop: selected === index ? 3 : 0,
                        }}
                      >
                        {item}
                      </Text>
                      {selected === index && (
                        <View
                          style={{
                            width: textWidths[index],
                            height: 3,
                            borderRadius: 12,
                            backgroundColor: "#4675F7",
                          }}
                        ></View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View
                style={{ width: "100%", paddingHorizontal: 5, marginTop: 10 }}
              >
                {/* Profil */}
                {selected === 0 && (
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      marginTop: 22,
                    }}
                  >
                    <View style={{ flexDirection: "column", marginBottom: 22 }}>
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        Kontaktinfo
                      </Text>
                      {editable || info.telefon !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Telefon
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Telefon"
                            placeholderTextColor="#D0D0D0"
                            value={info.telefon}
                            onChangeText={(text) =>
                              setInfo({ ...info, telefon: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}
                      {editable || info.email !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Email
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Email"
                            placeholderTextColor="#D0D0D0"
                            value={info.email}
                            onChangeText={(text) =>
                              setInfo({ ...info, email: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}
                    </View>

                    <View style={{ flexDirection: "column", marginBottom: 22 }}>
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        Allgemein
                      </Text>

                      {editable || info.geburtstag !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Geburtstag
                          </Text>
                          {Platform.OS === "android" ? (
                            <Pressable
                              onPress={showDatepicker}
                              disabled={editable ? false : true}
                            >
                              <TextInput1
                                style={{
                                  backgroundColor: "#FFFFFF",
                                  height: 20,
                                  right: -18,
                                  bottom: -4,
                                  position: "absolute",
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  alignSelf: "flex-end",
                                }}
                                theme={{ roundness: 9 }}
                                label=""
                                placeholder={"Select Date"}
                                value={`${date.getDate()}.${
                                  date.getMonth() + 1
                                }.${date.getFullYear()}`}
                                activeOutlineColor="none"
                                outlineColor="#FFFFFF"
                                mode="outlined"
                                editable={false}
                              />
                            </Pressable>
                          ) : (
                            <TextInput1
                              style={{
                                backgroundColor: "#FFFFFF",
                                height: 20,
                                right: -18,
                                bottom: 4,
                                position: "absolute",
                                fontSize: 14,
                                fontWeight: "600",
                                alignSelf: "flex-end",
                              }}
                              theme={{ roundness: 9 }}
                              label=""
                              placeholder={"Select Date"}
                              value={`${date.getDate()}.${
                                date.getMonth() + 1
                              }.${date.getFullYear()}`}
                              activeOutlineColor="none"
                              outlineColor="#FFFFFF"
                              mode="outlined"
                              onPressIn={showDatepicker}
                              editable={false}
                              // disabled={editable ? false : true}
                            />
                          )}
                        </View>
                      ) : null}

                      {editable || info.wohnort !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Wohnort
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Wohnort"
                            placeholderTextColor="#D0D0D0"
                            value={info.wohnort}
                            onChangeText={(text) =>
                              setInfo({ ...info, wohnort: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}
                    </View>

                    <View style={{ flexDirection: "column", marginBottom: 22 }}>
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        Beruflich
                      </Text>

                      {editable || info.beruf !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Beruf
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Beruf"
                            placeholderTextColor="#D0D0D0"
                            value={info.beruf}
                            onChangeText={(text) =>
                              setInfo({ ...info, beruf: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}

                      {editable || info.unternehmen !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Unternehmen
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Unternehmen"
                            placeholderTextColor="#D0D0D0"
                            value={info.unternehmen}
                            onChangeText={(text) =>
                              setInfo({ ...info, unternehmen: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}
                    </View>

                    {/* <View style={{ flexDirection: "column", marginBottom: 22 }}>
                                    <Text style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500' }}>Beziehung</Text>
                                    {editable || info.beziehungsebene !== "" ? <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#C9C9C9", }}>
                                        <Text style={{ color: '#545454', fontSize: 12, fontWeight: '400' }}>Beziehungsebene</Text>
                                        <TextInput
                                            style={{ color: '#1F1F1F', fontSize: 14, fontWeight: '500', textAlign: 'right' }}
                                            placeholder="Beziehungsebene"
                                            placeholderTextColor="#D0D0D0"
                                            value={info.beziehungsebene}
                                            onChangeText={(text) => setInfo({ ...info, beziehungsebene: text })}
                                            editable={editable}
                                        />
                                    </View>
                                        : null} */}
                    <View style={{ flexDirection: "column", marginBottom: 22 }}>
                      <Text
                        style={{
                          color: "#1F1F1F",
                          fontSize: 14,
                          fontWeight: "500",
                        }}
                      >
                        Beziehung
                      </Text>
                      {editable || info.beziehungsebene !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Beziehungsebene
                          </Text>
                          {editable ? (
                            <DropDownPicker
                              items={[
                                {
                                  label: `${info.beziehungsebene}`,
                                  value: `${info.beziehungsebene}`,
                                },
                                { label: "Option 2", value: "option2" },
                                { label: "Option 3", value: "option3" },
                                { label: "Option 4", value: "option4" },
                              ]}
                              value={info.beziehungsebene}
                              onChangeItem={(item: any) =>
                                setInfo({
                                  ...info,
                                  beziehungsebene: item.value,
                                })
                              }
                              style={{
                                backgroundColor: "transparent",
                                paddingVertical: 4,
                                paddingHorizontal: 8,
                                borderWidth: 0,
                                width: 120,
                                alignSelf: "flex-end",
                                paddingBottom: 40,
                              }}
                              containerStyle={{ flex: 1, height: 10 }}
                              dropDownStyle={{
                                backgroundColor: "#FDFDFD",
                                borderColor: "#d9dedb",
                                borderRadius: 9,
                                borderWidth: 1,
                                zIndex: 1000000,
                              }}
                              labelStyle={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "#1F1F1F",
                              }}
                              arrowIconStyle={{
                                tintColor: "#545454",
                                height: 20,
                              }}
                              placeholder="Select an option"
                              open={isPickerOpen}
                              setOpen={setIsPickerOpen}
                              textStyle={{
                                fontSize: 15,
                                fontWeight: "500",
                                color: "#1F1F1F",
                              }}
                              listMode="SCROLLVIEW"
                              scrollViewProps={{
                                nestedScrollEnabled: true,
                              }}
                            />
                          ) : (
                            <Text
                              style={{
                                color: "#1F1F1F",
                                fontSize: 14,
                                fontWeight: "500",
                                textAlign: "right",
                              }}
                            >
                              {info.beziehungsebene}
                            </Text>
                          )}
                        </View>
                      ) : null}
                      {editable || search !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                            marginBottom: search !== "" && editable ? 20 : 0,
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Verbindungsperson
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Verbindungsperson"
                            placeholderTextColor="#D0D0D0"
                            value={search}
                            onChangeText={(text) => {
                              setSearch(text);
                              setCheck(false);
                            }}
                            editable={editable}
                          />
                        </View>
                      ) : null}

                      {/* setInfo({ ...info, verbindungsperson: text })
                              value={info.verbindungsperson} */}

                      {search !== "" &&
                        editable &&
                        !check &&
                        filteredData.map(({ name, email }) => {
                          const [startColor, endColor] = getRandomColors();
                          return (
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => {
                                setInfo({ ...info, verbindungsperson: name });
                                setSearch(name);
                                setCheck(true);
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
                                <Text
                                  style={{ fontSize: 16, fontWeight: "500" }}
                                >
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

                      {editable || info.kreis !== "" ? (
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#C9C9C9",
                          }}
                        >
                          <Text
                            style={{
                              color: "#545454",
                              fontSize: 12,
                              fontWeight: "400",
                            }}
                          >
                            Kreis
                          </Text>
                          <TextInput
                            style={{
                              color: "#1F1F1F",
                              fontSize: 14,
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                            placeholder="Kreis"
                            placeholderTextColor="#D0D0D0"
                            value={info.kreis}
                            onChangeText={(text) =>
                              setInfo({ ...info, kreis: text })
                            }
                            editable={editable}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                )}
                {/* Aktivitäten */}
                {selected === 1 && (
                  <>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          setActivityData({
                            title: "",
                            description: "",
                            date: "",
                            time: "",
                            type: "",
                          });
                          setActivityModal(true);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#7F7F7F",
                          paddingHorizontal: 14,
                          paddingVertical: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#515151",
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          + Aktivität
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        marginTop: 22,
                      }}
                    >
                      {activity.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.5}
                          onPress={() => {
                            setActivityData(item);
                            setActivityModal(true);
                          }}
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: 10,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              width: "15%",
                              position: "relative",
                            }}
                          >
                            <View
                              style={{
                                width: 38,
                                height: 38,
                                borderWidth: 1,
                                borderColor: "#E4E8F4",
                                backgroundColor: "#F1F5FF",
                                borderRadius: 100,
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1,
                              }}
                            >
                              <SvgXml
                                xml={
                                  item.type === "Email"
                                    ? email
                                    : item.type === "Telefonat"
                                    ? phone
                                    : group
                                }
                                width={18}
                                height={18}
                              />
                            </View>
                            <View
                              style={{
                                height: "100%",
                                position: "absolute",
                                width: 1,
                                borderWidth: 1,
                                borderColor: "#D0D9F1",
                                borderStyle: "dashed",
                                zIndex: -1,
                                left: 18,
                              }}
                            ></View>
                          </View>
                          <View
                            style={{
                              width: "85%",
                              paddingHorizontal: 12,
                              paddingVertical: 14,
                              flexDirection: "column",
                              backgroundColor: "#FFFFFF",
                              borderWidth: 1,
                              borderColor: "#E7EBF4",
                              borderRadius: 12,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                color: "black",
                                marginBottom: 6,
                              }}
                            >
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#545454",
                                marginBottom: 10,
                              }}
                              numberOfLines={2}
                              ellipsizeMode="tail"
                            >
                              {item.description}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <SvgXml xml={caalender} width={16} height={16} />
                              <Text
                                style={{
                                  marginLeft: 6,
                                  fontSize: 12,
                                  color: "#676767",
                                }}
                              >
                                {dateFormat(item.date)}
                              </Text>
                              {item.time && (
                                <>
                                  <SvgXml
                                    xml={clock}
                                    width={16}
                                    height={16}
                                    style={{ marginLeft: 20 }}
                                  />
                                  <Text
                                    style={{
                                      marginLeft: 6,
                                      fontSize: 12,
                                      color: "#676767",
                                    }}
                                  >
                                    {item.time}
                                  </Text>
                                </>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}

                {/* Erinnerungen */}
                {selected === 2 && (
                  <>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          setRemainderData({ description: "", date: "" });
                          setRemainderModal(true);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#7F7F7F",
                          paddingHorizontal: 14,
                          paddingVertical: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#515151",
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          + Erinnerung
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        marginTop: 22,
                      }}
                    >
                      {remainder.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.5}
                          onPress={() => {
                            setRemainderData(item);
                            setRemainderModal(true);
                          }}
                          style={{
                            padding: 12,
                            flexDirection: "column",
                            width: "100%",
                            marginBottom: 12,
                            backgroundColor: "#FFFFFF",
                            borderWidth: 1,
                            borderColor: "#E7EBF4",
                            borderRadius: 12,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <SvgXml xml={caalender} width={16} height={16} />
                            <Text
                              style={{
                                marginLeft: 6,
                                fontSize: 12,
                                color: "#676767",
                              }}
                            >
                              {dateFormat(item.date)}
                            </Text>
                            <SvgXml
                              xml={clock}
                              width={16}
                              height={16}
                              style={{ marginLeft: 20 }}
                            />
                            <Text
                              style={{
                                marginLeft: 6,
                                fontSize: 12,
                                color: "#676767",
                              }}
                            >
                              {new Date(item.date).getHours() +
                                ":" +
                                new Date(item.date).getMinutes()}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#1F1F1F",
                              marginTop: 10,
                              fontWeight: "400",
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.description}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
                {/* Ansätze */}
                {selected === 3 && (
                  <>
                    <View style={{ width: "100%", alignItems: "flex-end" }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          setApproachData({ title: "", description: "" });
                          setApproachModal(true);
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#7F7F7F",
                          paddingHorizontal: 14,
                          paddingVertical: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#515151",
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          + Ansatz
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "column",
                        marginTop: 22,
                      }}
                    >
                      {approaches.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.5}
                          onPress={() => {
                            setApproachData(item);
                            setApproachModal(true);
                          }}
                          style={{
                            padding: 12,
                            flexDirection: "column",
                            width: "100%",
                            marginBottom: 12,
                            backgroundColor: "#FFFFFF",
                            borderWidth: 1,
                            borderColor: "#E7EBF4",
                            borderRadius: 12,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              color: "black",
                              marginTop: 10,
                              fontWeight: "500",
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#1F1F1F",
                              marginTop: 10,
                              fontWeight: "400",
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.description}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
        <ActivityDetailModal
          modal={activityModal}
          setModal={setActivityModal}
          data={activityData}
        />
        <ReminderDetailModal
          modal={remainderModal}
          setModal={setRemainderModal}
          data={remainderData}
        />
        <ApproachDetailModal
          modal={approachModal}
          setModal={setApproachModal}
          data={approachData}
        />

        <IOSDateModal
          modal={show}
          setModal={setShow}
          date={date}
          setDate={onIOSChange}
        />
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    marginTop: Platform.OS === "ios" ? 60 : 35,
  },
  modalView: {
    flex: 1,
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
  card: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 5,

    marginBottom: 20,
  },
});

export default ContactModal;
