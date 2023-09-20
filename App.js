import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import Edit from './src/screens/Edit';
import Create from './src/screens/Create';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
// import AuthProvider from './src/contexts/AuthProvider';
import useAuth from './src/hooks/useAuth';
import { AuthProvider } from './src/contexts/AuthContext';

import { auth } from './firebase'

// const firebaseConfig = {
//   apiKey: "AIzaSyDy9XZPyWhfQyZxFvbcdiDAPF2iyYu5ZU8",
//   authDomain: "react-native-note-ee407.firebaseapp.com",
//   projectId: "react-native-note-ee407",
//   storageBucket: "react-native-note-ee407.appspot.com",
//   messagingSenderId: "1079064857674",
//   appId: "1:1079064857674:web:2236fd0c69466913bdeab3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig, {
//   experimentalForceLongPolling: true, // Enable long polling
//   merge: true
// });
// export const auth = getAuth(app);
// export const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const user = useAuth();



  // useEffect(() => {
  //   signOut(auth)
  // }, [])

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
    return authSubscription;
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    )
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              {/* <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} /> */}
              <Stack.Screen name="Edit">
                {(props) => <Edit {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create">
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
        {/* <View style={{ marginTop: 20 }}> */}
        <FlashMessage position="top" />
        {/* </View> */}
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
