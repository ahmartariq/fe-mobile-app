import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Teams from '../Screens/Teams';
import Templates from '../Screens/Templates';
import Releases from '../Screens/Releases';
import BottomStack from './BottomStack';
import { Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator initialRouteName='bottom-tab' screenOptions={{ drawerPosition: 'right', drawerType: "front", }} drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="bottom-tab" component={BottomStack}
        options={{ headerShown: false, drawerLabel: () => null, drawerActiveBackgroundColor: "transparent", swipeEnabled: false, }} 
        />
        <Drawer.Screen
          name="template"
          options={{headerShown: false}}
          component={Templates}
        />
        <Drawer.Screen
          name="release"
          options={{headerShown: false}}
          component={Releases}
        />
        <Drawer.Screen
          name="teams"
          options={{headerShown: false}}
          component={Teams}
        />
    </Drawer.Navigator>
  );
}

export default DrawerStack;

const TemplateIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.4997 7.5V11.25C16.4997 15 14.9997 16.5 11.2497 16.5H6.74969C2.99969 16.5 1.49969 15 1.49969 11.25V6.75C1.49969 3 2.99969 1.5 6.74969 1.5H10.4997" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.4997 7.5H13.4997C11.2497 7.5 10.4997 6.75 10.4997 4.5V1.5L16.4997 7.5Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.25031 9.75H9.75031" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.25031 12.75H8.2503" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const releaseIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.55022 4.74012L11.9177 2.61762C14.7752 1.66512 16.3277 3.22512 15.3827 6.08262L13.2602 12.4501C11.8352 16.7326 9.49522 16.7326 8.07022 12.4501L7.44022 10.5601L5.55022 9.93012C1.26772 8.50512 1.26772 6.17262 5.55022 4.74012Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.58218 10.2374L10.2672 7.54492" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const teamIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 5.37C13.455 5.3625 13.4025 5.3625 13.3575 5.37C12.3225 5.3325 11.4975 4.485 11.4975 3.435C11.4975 2.3625 12.36 1.5 13.4325 1.5C14.505 1.5 15.3675 2.37 15.3675 3.435C15.36 4.485 14.535 5.3325 13.5 5.37Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.7272 10.8301C13.7547 11.0026 14.8872 10.8226 15.6822 10.2901C16.7397 9.58512 16.7397 8.43012 15.6822 7.72512C14.8797 7.19262 13.7322 7.01262 12.7047 7.19262" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.47746 5.37C4.52246 5.3625 4.57495 5.3625 4.61995 5.37C5.65495 5.3325 6.47995 4.485 6.47995 3.435C6.47995 2.3625 5.61746 1.5 4.54496 1.5C3.47246 1.5 2.60995 2.37 2.60995 3.435C2.61745 4.485 3.44246 5.3325 4.47746 5.37Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.24974 10.8301C4.22224 11.0026 3.08974 10.8226 2.29474 10.2901C1.23724 9.58512 1.23724 8.43012 2.29474 7.72512C3.09724 7.19262 4.24474 7.01262 5.27224 7.19262" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99972 10.9725C8.95472 10.965 8.90222 10.965 8.85722 10.9725C7.82222 10.935 6.99722 10.0875 6.99722 9.03754C6.99722 7.96504 7.85972 7.10254 8.93222 7.10254C10.0047 7.10254 10.8672 7.97254 10.8672 9.03754C10.8597 10.0875 10.0347 10.9425 8.99972 10.9725Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.81778 13.3345C5.76028 14.0395 5.76028 15.1945 6.81778 15.8995C8.01778 16.702 9.98278 16.702 11.1828 15.8995C12.2403 15.1945 12.2403 14.0395 11.1828 13.3345C9.99028 12.5395 8.01778 12.5395 6.81778 13.3345Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const AchieveIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2497 6.75C14.2497 7.8375 13.9272 8.83501 13.3722 9.66751C12.5622 10.8675 11.2797 11.715 9.7872 11.9325C9.5322 11.9775 9.2697 12 8.9997 12C8.7297 12 8.4672 11.9775 8.2122 11.9325C6.71969 11.715 5.4372 10.8675 4.62719 9.66751C4.07219 8.83501 3.74969 7.8375 3.74969 6.75C3.74969 3.8475 6.0972 1.5 8.9997 1.5C11.9022 1.5 14.2497 3.8475 14.2497 6.75Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9374 13.8523L14.6999 14.1448C14.4224 14.2123 14.2049 14.4223 14.1449 14.6998L13.8824 15.8023C13.7399 16.4023 12.9749 16.5823 12.5774 16.1098L8.99988 11.9998L5.42238 16.1173C5.02488 16.5898 4.25988 16.4098 4.11738 15.8098L3.85488 14.7073C3.78738 14.4298 3.56988 14.2123 3.29988 14.1523L2.06238 13.8598C1.49238 13.7248 1.28988 13.0123 1.70238 12.5998L4.62738 9.6748C5.43738 10.8748 6.71988 11.7223 8.21238 11.9398C8.46738 11.9848 8.72988 12.0073 8.99988 12.0073C9.26988 12.0073 9.53238 11.9848 9.78738 11.9398C11.2799 11.7223 12.5624 10.8748 13.3724 9.6748L16.2974 12.5998C16.7099 13.0048 16.5074 13.7173 15.9374 13.8523Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.43489 4.485L9.87739 5.36999C9.93739 5.48999 10.0949 5.61 10.2374 5.6325L11.0399 5.76749C11.5499 5.84999 11.6699 6.225 11.3024 6.5925L10.6799 7.21499C10.5749 7.31999 10.5149 7.5225 10.5524 7.6725L10.7324 8.445C10.8749 9.0525 10.5524 9.29249 10.0124 8.96999L9.26239 8.52749C9.12739 8.44499 8.90239 8.44499 8.76739 8.52749L8.01739 8.96999C7.47739 9.28499 7.15489 9.0525 7.29739 8.445L7.47739 7.6725C7.50739 7.53 7.45489 7.31999 7.34989 7.21499L6.72739 6.5925C6.35989 6.225 6.47989 5.85749 6.98989 5.76749L7.79239 5.6325C7.92739 5.61 8.08489 5.48999 8.14489 5.36999L8.58739 4.485C8.80489 4.005 9.19489 4.005 9.43489 4.485Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const serviceIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7497 13.8223H9.74969L6.41219 16.0423C5.91719 16.3723 5.24969 16.0198 5.24969 15.4198V13.8223C2.99969 13.8223 1.49969 12.3223 1.49969 10.0723V5.57227C1.49969 3.32227 2.99969 1.82227 5.24969 1.82227H12.7497C14.9997 1.82227 16.4997 3.32227 16.4997 5.57227V10.0723C16.4997 12.3223 14.9997 13.8223 12.7497 13.8223Z" stroke="#4675F7" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.00035 8.51953V8.36206C9.00035 7.85206 9.31537 7.58205 9.63037 7.36455C9.93787 7.15455 10.2453 6.88456 10.2453 6.38956C10.2453 5.69956 9.69035 5.14453 9.00035 5.14453C8.31035 5.14453 7.75537 5.69956 7.75537 6.38956" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.99693 10.3125H9.00368" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const feedbackIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00005 5.91699L8.19755 7.31199C8.01755 7.61949 8.16755 7.87449 8.52005 7.87449H9.47255C9.83255 7.87449 9.97505 8.12949 9.79505 8.43699L9.00005 9.83199" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.22468 13.5301V12.6601C4.49968 11.6176 3.08218 9.58513 3.08218 7.42513C3.08218 3.71263 6.49468 0.802632 10.3497 1.64263C12.0447 2.01763 13.5297 3.14263 14.3022 4.69513C15.8697 7.84513 14.2197 11.1901 11.7972 12.6526V13.5226C11.7972 13.7401 11.8797 14.2426 11.0772 14.2426H6.94468C6.11968 14.2501 6.22468 13.9276 6.22468 13.5301Z" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.37549 16.5004C8.09299 16.0129 9.90799 16.0129 11.6255 16.5004" stroke="#4675F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const logoutIcon = `<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.72554 4.85121C8.55019 2.81489 7.50375 1.9834 5.2129 1.9834H5.13937C2.61095 1.9834 1.59844 2.9959 1.59844 5.52432V9.21231C1.59844 11.7407 2.61095 12.7532 5.13937 12.7532H5.2129C7.48678 12.7532 8.53322 11.933 8.71988 9.93068" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.27509 7.36328H11.7121" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4506 5.46777L12.3455 7.36268L10.4506 9.25758" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const CustomSidebarMenu = (props: any) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{ flex: 1 , justifyContent: 'space-between'}}>
      {/*Top Large Image */}
      <View style={{ width: "100%", flexDirection: 'column', paddingLeft: 29, paddingRight: 23, paddingTop: 60 }}>
        <TouchableOpacity activeOpacity={0.8}  style={{ width: "100%", height: 72, borderWidth: 1, borderColor: "#C6C6C6", borderRadius: 12, alignItems: 'center', paddingHorizontal: 12, flexDirection: 'row' }}>
          <View
            style={{
              width: 44,
              height: 44,
              overflow: 'hidden',
              borderRadius: 100,
            }}>
            <Image
              source={require('../assets/profile.png')}
              style={{ aspectRatio: 1, width: '100%', height: '100%' }}
            />
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 12 }}>Jane Cooper</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => props.navigation.navigate('template')}
          style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 36 }}>
          <SvgXml xml={TemplateIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Vorlagen</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('release')}
          style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 28 }}>
          <SvgXml xml={releaseIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Freigaben</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 28 }}>
          <SvgXml xml={teamIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>teams </Text>
        </View>
        {/* divider */}
      </View>

      <View style={{ width: "100%", flexDirection: 'column', paddingLeft: 29, paddingRight: 23, paddingBottom: 16}}>

        <View style={{ width: "100%", height: 1, backgroundColor: "#C6C6C6", marginTop: 28 }}></View>
        <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 28 }}>
          <SvgXml xml={AchieveIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Empfehlen</Text>
        </View>
        <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 28 }}>
          <SvgXml xml={serviceIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Hilfe & Service</Text>
        </View>
        <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', marginTop: 28 }}>
          <SvgXml xml={feedbackIcon} />
          <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 12 }}>Ideen & Feedback</Text>
        </View>

        <View style={{ width: 135, height: 40, backgroundColor: "#4675F7", flexDirection: 'row',  marginTop: 42, alignSelf: 'center', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
            <SvgXml xml={logoutIcon} width={18} height={18}/>
            <Text style={{color: 'white', fontSize: 12, fontWeight: "600", marginLeft: 6}}>Log Out</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});