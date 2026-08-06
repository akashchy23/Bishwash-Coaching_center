import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import useAxios from '../hook/useAxios';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const axiosInstance = useAxios()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('')
   
    const registerWithEmailandPass = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginWithEmailAndPass = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const forgetPasswordReset = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
            setUser(currenUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (!user) return;
        axiosInstance.get(`/user/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
            })
    }, [axiosInstance, user, user?.email])

    const authData = {
        registerWithEmailandPass,
        loginWithEmailAndPass,
        forgetPasswordReset,
        role,
        logOut,
        loading,
        setLoading,
        user,
        setUser

    }
    return <AuthContext value={authData} >{children}</AuthContext>
};

export default AuthProvider;