import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';


export const EmailInput = ({ placeholder, value, onChangeText }: { placeholder: string, value: string, onChangeText: (text: string) => void; }) => {
    return (
        <TextInput
            style={{ backgroundColor: '#FFFFFF' }}
            theme={{ roundness: 9 }}
            label=""
            placeholder={placeholder}
            value={value}
            activeOutlineColor='none'
            outlineColor='#E4E7E5'
            mode='outlined'
            right={<TextInput.Icon
                color={"#383838"}
                icon={value !== "" && value.includes("@") && value.includes(".com") ? "check" :  "" }
            />}
            onChangeText={onChangeText}
        />
    )
}

export const PasswordInput = ({ placeholder, value, onChangeText }: { placeholder: string, value: string, onChangeText: (text: string) => void; }) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    return (
        <TextInput
            style={{ backgroundColor: '#ffffff' }}
            theme={{ roundness: 9 }}
            label=""
            placeholder={placeholder}
            value={value}
            activeOutlineColor='none'
            outlineColor='#e4e7e5'
            mode='outlined'
            secureTextEntry={!isPasswordVisible}
            right={
                <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                    forceTextInputFocus={false}
                />
            }
            onChangeText={onChangeText}
        />
    )
}

export const TextField = ({ placeholder, value, onChangeText }: { placeholder: string, value: string, onChangeText: (text: string) => void; }) => {

    return (
        <TextInput
            style={{ backgroundColor: '#ffffff' }}
            theme={{ roundness: 9 }}
            label=""
            placeholder={placeholder}
            value={value}
            activeOutlineColor='none'
            outlineColor='#e4e7e5'
            mode='outlined'
            onChangeText={onChangeText}
        />
    )
}

