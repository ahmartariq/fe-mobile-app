import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextInput, View, Platform } from 'react-native';


export interface IOTPInputProps {
    otpCodeChanged: (otpCode: string) => void;
}


const NUMBER_OF_INPUTS = 6;

const OtpField = (props: IOTPInputProps) => {
    const { otpCodeChanged } = props;
    const isFocused = useIsFocused();
    const [values, setValues] = React.useState<string[]>([
        '',
        '',
        '',
        '',
        '',
        '',
    ]);
    const itemsRef = useRef<Array<TextInput | null>>([]);

    const applyOTPCodeToInputs = (code: string) => {
        // split up code and apply it to all inputs
        const codeArray = code.split('');
        codeArray.forEach((char, index) => {
            const input = itemsRef.current[index];
            if (input) {
                input.setNativeProps({
                    text: char,
                });
            }
        });
        // focus on last input as a cherry on top
        const lastInput = itemsRef.current[itemsRef.current.length - 1];
        if (lastInput) {
            lastInput.focus();
            otpCodeChanged(code);
        }
    };

    useTimeout(
        () => {
            // focus on the first input
            const firstInput = itemsRef.current[0];
            if (firstInput) {
                firstInput.focus();
            }
        },
        isFocused ? 1000 : null,
    );
    return (
        <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', marginTop: 48, justifyContent: 'space-evenly' }}>
            {Array.from({ length: NUMBER_OF_INPUTS }, (_, index) => (
                <TextInput
                    style={{ width: 50, height: 50, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#DADDE8", borderRadius: 9, fontSize: 24, fontWeight: "600", color: "#383838", textAlign: 'center' }}
                    ref={(el) => (itemsRef.current[index] = el)}
                    key={index}
                    keyboardType={'numeric'}
                    placeholder={''}
                    value={values[index]}
                    defaultValue=""
                    // first input can have a length of 6 because they paste their code into it
                    maxLength={index === 0 ? 6 : 1}
                    onChange={(event) => {
                        const { text } = event.nativeEvent;
                        // only continue one if we see a text of length 1 or 6
                        if (text.length === 0 || text.length === 1 || text.length === 6) {
                            if (text.length === 6) {
                                applyOTPCodeToInputs(text);
                                return;
                            }
                            // going forward, only if text is not empty
                            if (text.length === 1 && index !== NUMBER_OF_INPUTS - 1) {
                                const nextInput = itemsRef.current[index + 1];
                                if (nextInput) {
                                    nextInput.focus();
                                }
                            }
                        }
                        // determine new value
                        const newValues = [...values];
                        newValues[index] = text;

                        // update state
                        setValues(newValues);
                        // also call callback as a flat string
                        otpCodeChanged(newValues.join(''));
                    }}
                    onKeyPress={(event) => {
                        if (event.nativeEvent.key === 'Backspace') {
                            // going backward:
                            if (index !== 0) {
                                const previousInput = itemsRef.current[index - 1];
                                if (previousInput) {
                                    previousInput.focus();
                                    return;
                                }
                            }
                        }
                    }}
                    textContentType="oneTimeCode"
                />
            ))}
        </View>
    )
}

export default OtpField



type UseTimeoutOptions = {
    cancelOnUnmount?: boolean;
};
const defaultOptions = {
    cancelOnUnmount: true,
};

const useTimeout = <T extends (...args: any[]) => any>(
    fn: T,
    milliseconds: number | null,
    options: UseTimeoutOptions = defaultOptions,
): [boolean, () => void] => {
    const opts = { ...defaultOptions, ...(options || {}) };
    const timeout = useRef<NodeJS.Timeout>();
    const callback = useRef<T>(fn);
    const [isCleared, setIsCleared] = useState<boolean>(false);
    // the clear method
    const clear = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
            setIsCleared(true);
        }
    }, []);
    // if the provided function changes, change its reference
    useEffect(() => {
        if (typeof fn === 'function') {
            callback.current = fn;
        }
    }, [fn]);
    // when the milliseconds change, reset the timeout (if not null)
    // if milliseconds are null, clear the timeout
    useEffect(() => {
        if (milliseconds !== null) {
            timeout.current = setTimeout(() => {
                callback.current();
            }, milliseconds);
        } else {
            clear();
        }
        return clear;
    }, [milliseconds]);
    // when component unmount clear the timeout
    useEffect(
        () => () => {
            if (opts.cancelOnUnmount) {
                clear();
            }
        },
        [],
    );
    return [isCleared, clear];
};
