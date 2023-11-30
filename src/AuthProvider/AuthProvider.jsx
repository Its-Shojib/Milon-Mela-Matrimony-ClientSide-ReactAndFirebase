import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import auth from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);
    let googleProvider = new GoogleAuthProvider();
    let axiosPublic = useAxiosPublic();

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
            let userInfo = {
                email: currentUser?.email
            }
            if(currentUser){
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])


    let authInfo = {
        user,
        createUser,
        SignInUser,
        Logout,
        googleSignIn,
        loading,
        setUser,
        updateUserProfile,
        setLoading
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