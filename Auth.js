import { createContext, useContext, useEffect, useState } from "react";
import {getAuth} from 'firebase/auth'
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
            
            setCurrentUser(user)
            fetchUser(user)

           
            
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
        <AuthContext.Provider value={{ currentUser, login, signup, logout, setUserFrom }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

  
}

export const useAuth = () => useContext(AuthContext)