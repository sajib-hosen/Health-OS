/////////////////////////////////////////////
// Author: Sajib Hosen //////////////////////
// Date: 25.03.2022 /////////////////////////
// Email: sajib.201h@gmail.com //////////////
/////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import firebaseInit from './firebaseConfig/firebase.init';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, getIdToken, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

firebaseInit();
const useFirebase = () => {
    const auth = getAuth();
    // const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const [currentUser, setCurrentUser] = useState({});
    const [idToken, setIdToken] = useState('');
    const [isLoading, setIsLoading]= useState(false);
    const [isVerifyEmailSend, setIsVerifyEmailSend ] = useState(false)
    
    // sign in with google - POPUP ==========================
    const googleSignIn =( navigate )=>{
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
        .then((result)=>{
            const cUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }
            setCurrentUser( cUser )
            navigate('/home')
        })
        .catch((error)=>{
            alert(error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    // sign in with facebook - POPUP =========================
    const facebookSignIn = ( navigate )=>{
        setIsLoading(true)
        signInWithPopup( auth, facebookProvider)
        .then((result)=>{
            const cUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }
            navigate('/home')
            setCurrentUser( cUser )
        })
        .catch((error)=>{
            alert(error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    // git learning

    // registration new user with email and password =======
    const registerUser = (name, email, password, navigate) =>{
        setIsLoading(true)
        createUserWithEmailAndPassword( auth, email, password)
        .then((result) =>{
            const user = result.user;
            // console.log(user)
            verifyEmail( navigate ) // send a Email for email verification
            navigate('/')
        })
        .catch((error)=>{
            alert(error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }



    const verifyEmail = ( navigate )=>{  // verifing email -> used in registerUser function
        setIsLoading(true)
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('Email send for verification')
            setIsVerifyEmailSend(true)
            // navigate('/home')
        })
        .catch((error)=>{
            alert(error.message);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    //login with email and password ========================
    const loginWithPassword= ( email, password, navigate, location)=>{
        setIsLoading(true)
        signInWithEmailAndPassword( auth, email, password)
        .then((result)=>{
            alert('login Success')
            const cUser = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }
            setCurrentUser( cUser )
            // navigate('/home')

            const destination = location.state?.from?.pathname || '/home';
            navigate(destination, {replace: true})
        })
        .catch((error)=>{
            alert( error.message )
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    // logOut user ========================================
    const logOutUser = ( navigate )=>{
        setIsLoading(true)
        signOut(auth)
        .then(()=>{
            alert('User log out success')
            setCurrentUser({});
            navigate('/')

        })
        .catch((error)=>{
            alert(error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    // Reset user password ===============================
    const resetPassword = (email)=>{
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('Email send, Reset password via email');
        })
        .catch((error)=>{
            alert(error.message);
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    //current user observer =========================
    useEffect(()=>{  
        const unsubscribed = onAuthStateChanged(auth ,(user) =>{
            setIsLoading(true)
                if(user?.emailVerified){
                    getIdToken(user)
                    .then((token) =>{
                        setIdToken(token)
                    })
                    const cUser = {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        emailVerified: user.emailVerified,
                    }
                    setCurrentUser( cUser )
                }
                else if(user?.emailVerified === false){
                    alert('User not verified')
                    setCurrentUser({});
                }
                else{
                    console.log('No user avalable')
                }
                setIsLoading(false)
            })
        return () => unsubscribed;
    },[auth])


    console.log( currentUser )

    
    return {
        googleSignIn,
        facebookSignIn,
        registerUser,
        loginWithPassword,
        logOutUser,
        resetPassword,
        currentUser,
        isLoading,
    };
};

export default useFirebase;