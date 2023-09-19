import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../GlobalStyles'
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ['red', 'blue', 'green'];
export default function Create({ navigation, route, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(noteColorOptions[0]);
    const [loading, setLoading] = useState(false);

    const onPressCreate = async () => {
        setLoading(true);
        try {
            const dbRef = collection(db, "notes");
            const data = {
                title,
                description,
                color,
                uid: user.uid
            }
            await addDoc(dbRef, data)
            setLoading(false);
            showMessage({
                message: "Note Created Successfully!",
                type: "success",
            })
            navigation.goBack();
        } catch (error) {
            console.log('error', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={{ marginHorizontal: 20, flex: 1 }}>
                <Input
                    placeholder="Title"
                    onChangeText={(text) => setTitle(text)}
                />
                <Input
                    placeholder="Description"
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                />

                <View style={{ marginTop: 25, marginBottom: 15 }}>
                    <Text>Select your note color</Text>
                </View>

                {noteColorOptions.map((option) => (
                    <RadioButton
                        key={option}
                        label={option}
                        value={color}
                        setValue={setColor}
                    />
                ))
                }

                {loading ?
                    <ActivityIndicator size="large" />
                    : <Button
                        title="Submit"
                        customStyle={{
                            marginTop: 25,
                            width: '100%',
                        }}
                        onPress={onPressCreate}
                    />}
            </View>
        </SafeAreaView>
    )
}