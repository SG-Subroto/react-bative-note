import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function RadioButton({ label, gender, setGender }) {
    return (
        <Pressable
            onPress={() => setGender(label)}
            style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, width: 100 }}>
            <View
                style={
                    [styles.outerCircle, { flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: 5 }]
                }
            >
                {gender === label && <View style={[styles.innerCircle]}></View>}
            </View>
            <Text>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    outerCircle: {
        height: 22,
        width: 22,
        borderWidth: 2,
        borderColor: "orange",
        borderRadius: 15,
    },
    innerCircle: {
        height: 11,
        width: 11,
        borderWidth: 1,
        borderColor: "orange",
        borderRadius: 15,
        backgroundColor: "orange",
    },
})