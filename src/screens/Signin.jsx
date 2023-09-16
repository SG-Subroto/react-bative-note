import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react';

import GlobalStyles from '../../GlobalStyles';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Signin() {
    const { navigate } = useNavigation();
    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <Image
                source={require('../../assets/login_img.png')}
                style={{ alignSelf: 'center' }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
                Never forget your notes
            </Text>

            <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>

                <Input placeholder="Email" />
                <Input placeholder="Password" secureTextEntry={true} />
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

                    title="Login"
                    customStyle={{ alignSelf: "center", marginBottom: 60 }}
                />
                <Pressable
                    onPress={() => navigate('Signup')}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ marginRight: 5 }}>Don't have an account?</Text>
                        <Text style={{ color: "blue" }}>
                            Sign up
                        </Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

