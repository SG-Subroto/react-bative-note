import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, value, secureTextEntry, onChangeText, autoCapitalize, multiline }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
})