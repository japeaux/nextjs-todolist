import { createContext, useContext, useEffect, useState } from "react";
import {getAuth, sendEmailVerification} from 'firebase/auth'
import Loading from './components/Loading';
import Login from './components/Login';
import SignUp from './pages/register';
import nookies from 'nookies'
import { doc, serverTimestamp, setDoc, collection, getDocs, query, where } from "firebase/firestore";

import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"


import {  db, auth } from './firebase';

const AuthContext = createContext({})


export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    async function fetchUser(user){
        const usersRef = collection(db,"users");
        const q = query(usersRef, where("email","==",user.email));
        const querySnapshot = await getDocs(q);
        const aux = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
        if(aux.length>0){
            setCurrentUser(aux[0])
        }
    }

    useEffect(()=>{
        const auth = getAuth()
        return auth.onIdTokenChanged(async(user)=>{
            
            if(!user){
                console.log("no user")
                setCurrentUser(null)
                setLoading(false)
                nookies.set(undefined,"token",token,{})
                return;
            }
            const token = await user.getIdToken();  
            
            // const usersRef = collection(db,"users");
            // const q = query(usersRef, where("email","==",userData?.email));
            // const querySnapshot = await getDocs(q);
            // console.log('querysnapshots', querySnapshot, userData?.email)
            // const aux = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
            // //setCurrentUser(aux[0])
            // console.log("aux",aux[0], )


            // const userData = {
            //     displayName:user.displayName,
            //     email:user.email,
            //     lastSeen:serverTimestamp(),
            //     photoURL:user.photoURL
            // }
            
            // console.log(" auihsihuahduihuhuiahuishduia",user)
            if(user.emailVerified){
                setCurrentUser(user)
                fetchUser(user)
            }else{
                //alert("Verify your email to access your account")
                setCurrentUser(user)
                fetchUser(user)
            }
          

           
            
            setLoading(false)
            nookies.set(undefined,"token",token,{})
        })
    },[])

    
    const signup = (email, password) => {
       return createUserWithEmailAndPassword(auth, email, password)
   }

   const login = (email, password) => {
       return signInWithEmailAndPassword(auth, email, password)
   }

   const setUserFrom = (user) => {
        setCurrentUser(user)
    }

   const logout = async () => {
       setUser(null)
       await signOut(auth)
   }

   const getUserInfos = () => {
        const auth = getAuth()
        const user = auth.currentUser;
        if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            console.log(user)
            return user
        }
            return
        
    }


   const sendEmailForVerification = async () => {
    await sendEmailVerification(auth.currentUser)
        .then(() => {
        // Email verification sent!
        // ...
        return true
        });

       
    }

    const sendEmailToVerify = (curUser) =>{
        var actionCodeSettings = {
            url: 'http://localhost:3000/dashboard?email=' + curUser.email,
            iOS: {
              bundleId: 'com.example.ios'
            },
            android: {
              packageName: 'com.example.android',
              installApp: true,
              minimumVersion: '12'
            },
            handleCodeInApp: true,
            // When multiple custom dynamic link domains are defined, specify which
            // one to use.
            dynamicLinkDomain: "example.page.link"
          };

        //   auth().curUser.sendEmailVerification(actionCodeSettings)
        //     .then(function() {
        //       // Verification email sent.
        //     })
        //     .catch(function(error) {
        //       // Error occurred. Inspect error.code.
        //     });

            const useremail = 'flashpixoficial@gmail.com';
            generateEmailVerificationLink(useremail, actionCodeSettings).then((link) => {
            // Construct email verification template, embed the link and send
            // using custom SMTP server.
                console.log(link)
            return sendCustomVerificationEmail(useremail, displayName, link);
        })
        .catch((error) => {
            // Some error occurred.
        });

    
    }

    // if(loading){
    //     return <Loading type="bubbles" color="yellowgreen"/>
    // }
    // if(!currentUser){
    //     return <SignUp/>
    // }else{
    //     return(
    //         <AuthContext.Provider value={{currentUser}}>
    //             {children}
    //         </AuthContext.Provider>
    //     )
    // }

    return (  
        <AuthContext.Provider value={{ currentUser, login, signup, logout, setUserFrom, sendEmailForVerification, sendEmailToVerify, getUserInfos }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

  
}

export const useAuth = () => useContext(AuthContext)