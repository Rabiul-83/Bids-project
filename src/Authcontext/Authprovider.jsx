import React, { useEffect, useState } from 'react';
import { AuthContext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const provider = new GoogleAuthProvider();

const Authprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    const createuser = ({ email, password }) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singingooglee = ({ email, password }) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setloading(true)
        return signOut(auth)
    }


    const popup = () => {
        setloading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentuser) => {
            setuser(currentuser);
            // console.log('currentuser', currentuser)
            // if (currentuser) {
            //     const loggedUser = { email: currentuser.email }
            //     fetch('http://localhost:3000/tokenjwt', {
            //         method: "POst",
            //         headers: {
            //             'content-type': 'application/json'
            //         },
            //         body: JSON.stringify(loggedUser)

            //     }).then(rest => rest.json())
            //         .then(data => {
            //             console.log('token data..', data)
            //             localStorage.setItem('token', data.token)
            //         })

            // }
            //  else{
            //         localStorage.removeItem('token')
            //     }

            setloading(false)
        })
        return () => {
            unsubcribe();
        }

    }, [])

    const authinfo = {
        createuser,
        singingooglee,
        popup, user,
        loading,
        logout
    }

    return (
        <AuthContext value={authinfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default Authprovider;