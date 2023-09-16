import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../GlobalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';

import { auth, db } from "../../App";

import { createUserWithEmailAndPassword } from "firebase/auth"
import {
    setDoc,
    addDoc,
    collection,
    getDocs,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore"

export default function Signup() {
    const { navigate } = useNavigation();

    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");

    const handleSignup = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)

            const dbRef = collection(db, "users");
            const data = {
                name: fullName,
                email: email,
                age: age,
                gender: gender,
                uid: result.user.uid,
            }
            console.log('data =>', data);

            await addDoc(dbRef, data)
        } catch (error) {
            console.log("error =>", error)
        }


    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
                Never forget your notes
            </Text>

            <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>

                <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Full Name" onChangeText={(text) => setFullName(text)} />
                <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

                <View style={{ marginTop: 20 }}>
                    <RadioButton label={"Male"} gender={gender} setGender={setGender} />
                    <RadioButton label={"Female"} gender={gender} setGender={setGender} />
                </View>
            </View>


            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingBottom: 10
                }}
            >
                <Button
                    onPress={handleSignup}
                    title="Registration"
                    customStyle={{ alignSelf: "center", marginBottom: 60 }}
                />
                <Pressable
                    onPress={() => navigate('Signin')}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ marginRight: 5 }}>Already have an account?</Text>
                        <Text style={{ color: "blue" }}>
                            Sign in
                        </Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}