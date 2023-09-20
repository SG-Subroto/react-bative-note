import initializeFirebase from '../Firebase/firebase.init';
import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';



const useFirebase = () => {
    console.log('-------use firebase call');
    // initialize firebase app
    const app = initializeFirebase();
    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');


    const registration = async (fullName, email, password, age, gender, navigate) => {
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
            // showMessage({
            //     message: "ERROR!",
            //     type: "danger",
            // })
            console.log("error =>", error)
        } finally {
            setLoading(false)
        }

        //     setLoading(true);
        //     auth.createUserWithEmailAndPassword(email, password)
        //         .then((userCredential) => {
        //             const user = userCredential.user;
        //             console.log('Registered with:', user.email);
        //             setAuthError('');
        //             const newUser = { email, displayName: name };
        //             setUser(newUser);
        //             // save user to the database
        //             saveUser(email, name, 'POST');
        //             // send name to firebase after creation

        //             // user.updateProfile(auth.currentUser, {
        //             //     displayName: name
        //             // }).then(() => {
        //             // }).catch((error) => {
        //             // });
        //             if (user) {
        //                 user.updateProfile({
        //                     displayName: name
        //                 }).then(() => {
        //                 }).catch((error) => {
        //                 });
        //             }
        //             navigate('/login');
        //         })
        //         .catch((error) => {
        //             setAuthError(error.message);
        //             console.log(error);
        //         })
        //         .finally(() => setIsLoading(false));
    }

    const login = (email, password, navigate) => {
        // setIsLoading(true);
        // auth.signInWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         setUser(userCredential.user);
        //         const destination = location?.state?.from?.pathname || '/';
        //         navigate(destination);
        //         setAuthError('');

        //     })
        //     .catch((error) => {
        //         setAuthError(error.message);
        //     })
        //     .finally(() => setIsLoading(false));

        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => setLoading(false))
    }

    const logout = () => {
        signOut(auth)
    }

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

    return {
        user,
        loading,
        authError,
        setAuthError,
        registration,
        login,
        logout,
    }
}

export default useFirebase;