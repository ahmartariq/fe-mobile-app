import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';


const add = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.74982 11.4998H21.2498" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5003 21.2499V1.74988" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
const AddButton = () => {

    const handleLog = () => {
        console.log(windowHeight);
        console.log(windowWidth);
    };

    return (
        <>
        <TouchableOpacity activeOpacity={0.5} onPress={handleLog} style={styles.container}>
            <SvgXml xml={add} />
        </TouchableOpacity>


        {/* <View style={styles.popup}>
            
        </View> */}
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
        alignItems: 'center'
    },
    popup: {
        width: windowWidth,
        height: windowHeight,
        bottom: 65,
        backgroundColor: '#567DF4',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1000
    },
});

export default AddButton;