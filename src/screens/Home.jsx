import { deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyles from '../../GlobalStyles'
import { Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../../App'

export default function Home({ navigation, route, user }) {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const q = query(collection(db, "notes"), where("uid", "==", user.uid))
        const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setNotes(list);
            setLoading(false);
        });

        return notesListenerSubscription;
    }, [])

    console.log(notes);

    const renderItems = ({ item }) => {
        const { title, description, color } = item;

        return (
            <Pressable style={{
                backgroundColor: color,
                marginBottom: 15,
                borderRadius: 15,
                padding: 15,
            }}
                onPress={() => navigation.navigate("Edit", { item })}
            >
                <Pressable
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 10
                    }}
                    onPress={() => {
                        deleteDoc(doc(db, "notes", item.id))
                    }}
                >
                    <AntDesign name='delete' size={24} color='white' />
                </Pressable>
                <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
                <Text style={{ color: "white", fontSize: 18 }}>{description}</Text>
            </Pressable>
        )
    }

    const onPressCreate = () => {
        navigation.navigate("Create")
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="blue" size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 20,
                }}
            >
                <Text>Home</Text>
                <Pressable onPress={onPressCreate}>
                    <AntDesign name='pluscircleo' size={24} color='black' />
                </Pressable>
            </View>

            <FlatList
                data={notes}
                renderItem={renderItems}
                keyExtractor={(item, index) => index}
                contentContainerStyle={{ padding: 20 }}
            />
        </SafeAreaView>
    )
}