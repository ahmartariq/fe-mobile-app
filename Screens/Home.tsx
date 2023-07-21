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
  Platform
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import ContactModal from '../components/ContactModal';
import { KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from "../components/LineChart/index";
import { BarChart } from '../components/BarChart/index';

const bell = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 5.3667V8.1417" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M10.0166 1.66675C6.94992 1.66675 4.46658 4.15008 4.46658 7.21675V8.96675C4.46658 9.53341 4.23325 10.3834 3.94158 10.8667L2.88325 12.6334C2.23325 13.7251 2.68325 14.9417 3.88325 15.3417C7.86658 16.6667 12.1749 16.6667 16.1582 15.3417C17.2832 14.9667 17.7666 13.6501 17.1582 12.6334L16.0999 10.8667C15.8082 10.3834 15.5749 9.52508 15.5749 8.96675V7.21675C15.5666 4.16675 13.0666 1.66675 10.0166 1.66675Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M12.7749 15.6833C12.7749 17.2083 11.5249 18.4583 9.99991 18.4583C9.24158 18.4583 8.54158 18.1417 8.04158 17.6417C7.54158 17.1417 7.22491 16.4417 7.22491 15.6833" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
</svg>`;

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

const upArrow = `<svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.4685 1.11487C5.09415 0.740519 4.48621 0.740519 4.11186 1.11487L0.278526 4.9482C0.00300475 5.22372 -0.0778546 5.63401 0.0718849 5.99338C0.221625 6.35276 0.56902 6.58635 0.958343 6.58635H8.62501C9.01134 6.58635 9.36173 6.35276 9.51147 5.99338C9.66121 5.63401 9.57735 5.22372 9.30483 4.9482L5.47149 1.11487H5.4685Z" fill="#2D2D2D"/>
</svg>`


const cardData = [
  {
    title: "Kontakte",
    value: "214",
    rate: "+10,41",
  },
  {
    title: "Aktivitäten",
    value: "236",
    rate: "+0,37",
  },
  {
    title: "Ansätze",
    value: "22",
    rate: "-4,21",
  },
  {
    title: "Erinnerungen",
    value: "16",
    rate: "+0,37",
  }
]

type itemType = {
  value: number;
};

const customDataPoint = () => {
  return (
    <View
      style={{
        bottom: -9,
        width: 15,
        height: 15,
        backgroundColor: '#34DCFC',
        borderWidth: 4,
        borderRadius: 10,
        borderColor: 'white',
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
      }}
    />
  );
};

const formatDate = (date: Date) => {

  const month = date.toLocaleString('en-US', { month: 'short' });
  const week = date.toLocaleString('en-US', { weekday: 'short' });
  const formattedDate = `${month} ${date.getDate()} ${date.getFullYear()}, ${week.slice(0, 3)}`;

  return formattedDate;
};

const customDataLabel = (value: number, date: Date) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderRadius: 8,
        borderColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 10,
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
      }}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>{value}</Text>
      <Text style={{ color: '#949F99', fontSize: 12, fontWeight: '500' }}>{formatDate(date)}</Text>
    </View>
  );
}

const Home = ({ navigation }: { navigation: any }) => {
  const [items, setItems] = useState([
    { label: 'Woche', value: 'Woche' },
    { label: 'Monat', value: 'Monat' },
    { label: 'Jahr', value: 'Jahr' },
  ]);
  const [barItems, setBarItems] = useState([
    { label: 'Alter', value: 'Alter' },
    { label: 'Geschlecht', value: 'Geschlecht' },
  ]);
  
  const [open, setOpen] = useState(false);
  const [openBar, setOpenBar] = useState(false);
  const [typeBar, setTypeBar] = useState<string>(barItems[0].value);
  const [type, setType] = useState<string>(items[0].value);
  const lineData = [
    {
      value: 10,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(10, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 22,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(22, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 35,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(35, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 13,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(13, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 45,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(45, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 40,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(45, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 39,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(45, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },

  ];
  const lineData1 = [
    {
      value: 15,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(15, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 27,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(27, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 35,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(35, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 40,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(40, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 43,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(43, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 37,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(37, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 35,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(35, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },

  ];
  const lineData2 = [
    {
      value: 20,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(20, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 15,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(15, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 35,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(35, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 19,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(19, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 32,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(32, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 37,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(37, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
    {
      value: 35,
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => customDataLabel(35, new Date()),
      dataPointLabelShiftY: -70,
      dataPointLabelShiftX: 0,
    },
  ];

  const barData = [
    {value: 250, labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>{">25"}</Text>},
    {value: 500 , labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>26-35</Text> },
    {value: 745, labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>36-45</Text>},
    {value: 320, labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>46-55</Text>},
    {value: 600, labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>55-65</Text>},
    {value: 256, labelComponent: () => <Text style={{fontSize: 12, fontWeight: '500', color: '#949F99'}}>66+</Text>},
];

const maxBarValue = barData.reduce((maxValue, bar) => {
  return bar.value > maxValue ? bar.value : maxValue;
}, 0);

const updatedBarData = barData.map(bar => {
  if (bar.value === maxBarValue) {
    return { ...bar, frontColor: '#EBB376' };
  }
  return bar;
});

const openDrawer = () => {
  navigation.openDrawer();
};
  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Home</Text>
          
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
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {/* Card 1 */}
            {
              cardData.map((item, index) => (
                <View key={index} style={{ width: "49%", flexDirection: 'column', paddingHorizontal: 8, paddingVertical: 12, backgroundColor: "white", borderWidth: 1, borderColor: "#E7EBF4", borderRadius: 16, marginBottom: 10 }}>
                  <View style={{ width: "100%", flexDirection: "row", }}>
                    <View style={{ width: 46, height: 46, borderRadius: 100, backgroundColor: index === 0 ? "#CCF2E8" : index === 1 ? "#D8DEFD" : index === 2 ? "#FFE1CC" : "#CFF7FF", justifyContent: 'center', alignItems: 'center' }}>
                      {index === 0 ?
                        <SvgXml xml={person} />
                        : index === 1 ?
                          <SvgXml xml={activityIcon} />
                          : index === 2 ?
                            <Image source={require('../assets/memory.png')} resizeMode='contain' style={{ width: 24, height: 24 }} />
                            : <Image source={require('../assets/alert.png')} resizeMode='contain' style={{ width: 24, height: 24 }} />}
                    </View>
                    <View style={{ flexDirection: "column", marginLeft: 10, paddingVertical: 6 }}>
                      <Text style={{ color: "#666666", fontSize: 16, fontWeight: '400' }}>{item.title}</Text>
                      <Text style={{ color: "black", fontSize: 30, fontWeight: '600' }}>{item.value}</Text>
                    </View>
                  </View>

                  <View style={{ width: "100%", paddingHorizontal: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                    <Text style={{ fontSize: 9, fontWeight: '600' }}>seit 30 Tagen</Text>
                    <View style={{ width: 70, height: 21, backgroundColor: item.rate.includes("+") ? "#CCFFBA" : "#FFA1A3", borderWidth: 1, borderColor: item.rate.includes("+") ? "#71C78A" : "#FF7275", borderRadius: 8, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <Text style={{ fontSize: 9, fontWeight: '600' }}>{item.rate} %</Text>
                      <SvgXml xml={upArrow} style={{ marginLeft: 5, transform: item.rate.includes("+") ? [{ rotateZ: "0deg" }] : [{ rotateZ: "180deg" }] }} />
                    </View>
                  </View>
                </View>
              ))
            }
          </View>

          <View style={{ width: "100%", flexDirection: "column", backgroundColor: "white", borderWidth: 1, borderColor: "#E7EBF4", borderRadius: 16, marginTop: 10, paddingVertical: 18, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: "black", fontSize: 18, fontWeight: '600' }}>Neue Kontakte</Text>
              <View style={{ width: 146 }}>
                <DropDownPicker
                  open={open}
                  value={type}
                  items={items}
                  setOpen={setOpen}
                  setValue={setType}
                  setItems={setItems}
                  style={{ backgroundColor: "#FDFDFD", borderColor: "#949F99", borderRadius: 9, borderWidth: 1, }}
                  dropDownContainerStyle={{ backgroundColor: "#FDFDFD", borderColor: "#949F99", borderRadius: 9, borderWidth: 1, zIndex: 1000000 }}
                  textStyle={{ fontSize: 15, fontWeight: "500", color: "#1F1F1F" }}
                  arrowIconStyle={{ tintColor: "#4675F7" }}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
            </View>
            
            <View style={{ marginBottom: 20, width: "100%", paddingTop: 40, overflow: 'hidden' , zIndex: -10}}>
              <LineChart
                initialSpacing={0}
                curved
                data={type === "Woche" ? lineData : type === "Monat" ? lineData1 : type === "Jahr" ? lineData2 : null}
                thickness={2.5}
                focusEnabled
                showStripOnFocus
                showTextOnFocus
                pressEnabled
                showDataPointOnPress
                dataPointsColor1='#34DCFC'
                dataPointsRadius1={5}
                startFillColor={'#A5ADDD'}
                endFillColor={'#A5ADDD'}
                startOpacity={0.4}
                endOpacity={0.1}
                rulesType={"solid"}
                rulesColor={"#E9E9E9"}
                rulesLength={300}
                animationDuration={1000}
                areaChart
                yAxisTextStyle={{ color: "#949F99", fontSize: 12, fontWeight: "500" }}
                isAnimated
                yAxisColor="transparent"
                xAxisColor="transparent"
                noOfSections={6}
                color="#3C58F7"
                disableScroll={true}
              />
              <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'flex-end', }}>
                <View style={{ width: "89%", flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW1" : type === "Monat" ? "KM1" : type === "Jahr" ? "KJ1" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW2" : type === "Monat" ? "KM2" : type === "Jahr" ? "KJ2" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW3" : type === "Monat" ? "KM3" : type === "Jahr" ? "KJ3" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW4" : type === "Monat" ? "KM4" : type === "Jahr" ? "KJ4" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW5" : type === "Monat" ? "KM5" : type === "Jahr" ? "KJ5" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW6" : type === "Monat" ? "KM6" : type === "Jahr" ? "KJ6" : ""}</Text>
                  <Text style={{fontSize:12, fontWeight: "400" , color: "#808080"}}>{type === "Woche" ? "KW7" : type === "Monat" ? "KM7" : type === "Jahr" ? "KJ7" : ""}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ width: "100%", marginBottom: 130 ,  flexDirection: "column", backgroundColor: "white", borderWidth: 1, borderColor: "#E7EBF4", borderRadius: 16, marginTop: 20, paddingVertical: 18, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: "black", fontSize: 18, fontWeight: '600' }}>Kontakte nach</Text>
              <View style={{ width: 146 }}>
                <DropDownPicker
                  open={openBar}
                  value={typeBar}
                  items={barItems}
                  setOpen={setOpenBar}
                  setValue={setTypeBar}
                  setItems={setBarItems}
                  style={{ backgroundColor: "#FDFDFD", borderColor: "#949F99", borderRadius: 9, borderWidth: 1, }}
                  dropDownContainerStyle={{ backgroundColor: "#FDFDFD", borderColor: "#949F99", borderRadius: 9, borderWidth: 1, zIndex: 1000000 }}
                  textStyle={{ fontSize: 15, fontWeight: "500", color: "#1F1F1F" }}
                  arrowIconStyle={{ tintColor: "#4675F7" }}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 20, width: "100%", paddingTop: 40, overflow: 'hidden' , zIndex: -10}}>
              <BarChart
                data={updatedBarData}
                barWidth={13}
                frontColor={'#25546D'}
                roundedTop
                rulesType={"solid"}
                rulesColor={"#E9E9E9"}
                rulesLength={300}
                animationDuration={1000}
                yAxisTextStyle={{ color: "#949F99", fontSize: 12, fontWeight: "500" }}
                isAnimated
                yAxisColor="transparent"
                xAxisColor="transparent"
                initialSpacing={10}
                noOfSections={6}
                spacing={35}
                labelWidth={25}
                disableScroll={true}
              />
            </View>
          </View>
        </ScrollView>

      </View>
    </View>
  );
};

export default Home;

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
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',

  },
  body: {
    paddingHorizontal: 15,
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
