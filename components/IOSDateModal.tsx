import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useRef, useEffect } from 'react'
import { Modal, View, Text, Pressable, PanResponder, StyleSheet, Platform, TouchableOpacity, ScrollView, TextInput, } from 'react-native'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const IOSDateModal = ({ modal, setModal, date, setDate }: { modal: boolean, setModal: (contactModel: boolean) => void, date: Date, setDate: (event: any, selectedDate: any) => void }) => {
    const modalRef = useRef(null);

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

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(!modal)}>
            <View style={styles.centeredView}>

                <View ref={modalRef} style={styles.modalView}>
                    <View style={{ width: '100%', backgroundColor: '#FDFDFD', borderTopLeftRadius: 15, borderTopRightRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#3F3F3F' }}>Select Date</Text>
                        <TouchableOpacity onPress={() => closeModal()}>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#3F3F3F' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="spinner"
                        themeVariant='light'
                        onChange={setDate}
                    />
                </View>

            </View>
        </Modal>
    )
}

export const IOSTimeModal = ({ modal, setModal, date, setDate }: { modal: boolean, setModal: (contactModel: boolean) => void, date: Date, setDate: (event: any, selectedDate: any) => void }) => {
    const modalRef = useRef(null);

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

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(!modal)}>
            <View style={styles.centeredView}>

                <View ref={modalRef} style={styles.modalView}>
                    <View style={{ width: '100%', backgroundColor: '#FDFDFD', borderTopLeftRadius: 15, borderTopRightRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: '#3F3F3F' }}>Select Date</Text>
                        <TouchableOpacity onPress={() => closeModal()}>
                            <Text style={{ fontSize: 16, fontWeight: '400', color: '#3F3F3F' }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="time"
                        display="spinner"
                        themeVariant='light'
                        onChange={setDate}
                    />
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
        backgroundColor: '#FDFDFD',
        borderRadius: 15,
        paddingTop: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingBottom: 30 ,
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

})

export default IOSDateModal
