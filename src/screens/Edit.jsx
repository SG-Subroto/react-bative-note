import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../GlobalStyles'
import Input from '../components/Input';
import RadioButton from '../components/RadioButton';
import Button from '../components/Button';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ['red', 'blue', 'green'];
export default function Edit({ navigation, route, user }) {
    const noteItem = route.params.item;
    console.log('route.params.item', noteItem);
    const [title, setTitle] = useState(noteItem.title);
    const [description, setDescription] = useState(noteItem.description);
    const [color, setColor] = useState(noteItem.color);
    const [loading, setLoading] = useState(false);

    const onPressEdit = async () => {
        setLoading(true);
        try {
            const dbRef = doc(db, "notes", noteItem.id);
            const data = {
                title,
                description,
                color
            }
            await updateDoc(dbRef, data)
            setLoading(false);
            showMessage({
                message: "Note Updated Successfully!",
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
                    value={title}
                />
                <Input
                    placeholder="Description"
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    value={description}
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
                        title="Update"
                        customStyle={{
                            marginTop: 25,
                            width: '100%',
                        }}
                        onPress={onPressEdit}
                    />}
            </View>
        </SafeAreaView>
    )
}