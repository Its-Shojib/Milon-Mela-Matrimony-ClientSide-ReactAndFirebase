import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import auth from "../../Firebase/Firebase.config";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);
    let googleProvider = new GoogleAuthProvider();

    let createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let SignInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    let Logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    let googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    let updateUserProfile  = (name,image)=>{
        return updateProfile(auth.currentUser ,{
            displayName: name , photoURL: image
        });
    }

    useEffect(() => {
        let unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('observing: ', currentUser?.displayName);
            setLoading(false)  
        })
        return () => {
            unSubscribe();
        }
    }, [])


    let authInfo = {
        user,
        createUser,
        SignInUser,
        Logout,
        googleSignIn,
        loading,
        setUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};
AuthProvider.propTypes = {
    children: PropTypes.node,
}
export default AuthProvider;