import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar} from '@mui/material'
import CustomVerticalMore from '../components/CustomVerticalMore'
import SearchIcon from '@mui/icons-material/Search'
import chats from '../data/chat.json'
import Chat from './Chat';

import { auth, db } from '../firebase';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore'
import Friend from './Friend';
import { useAuth } from '../Auth';
import { useRef } from 'react';

const Sidebar = () => {
    const [friends, setFriends] = useState([])
    const [chats, setChats] = useState([])

    const inputAreaRef = useRef(null)

    const {currentUser} = useAuth()

    useEffect(()=>{
        const chatsRef = collection(db,"chats")
        //console.log(currentUser.uid, "doiasiodaijsioj")
        const q = query(chatsRef,where("users", "array-contains", currentUser.id));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            setChats(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
        })
        return unsubscribe
    },[])

    useEffect(()=>{
        async function fetchFriends(){
            const usersRef = collection(db,"users");
            const q = query(usersRef, where("email","!=",currentUser?.email));
            const querySnapshot = await getDocs(q);
            console.log('querysnapshots', querySnapshot, currentUser?.email)
            setFriends(querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id})))
            console.log("friendsssss", friends)
        }
        fetchFriends()
    },[])
    
    const [searchFriends, setSearchFriends] = useState(false)
    useEffect(()=>{
        const checkIfClickedOutside = e =>{
            if(!inputAreaRef.current.contains(e.target)){
                setTimeout(()=>{
                    setSearchFriends(false)
                },3000);
            }else{
                setSearchFriends(true)
            }
        }
        document.addEventListener("mousedown",checkIfClickedOutside)
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside)
        }
    },[])

    const router = useRouter();

    const OpenChat = async (e) =>{
        e.stopPropagation();
        router.push(`/Chat`)
    }

    const OpenHome = async (e) =>{
        e.stopPropagation();
        router.push(`/`)
    }


  return (
    <Container>        
        {/* <IconButton  onClick={e=>OpenChat(e)}>
            <ChatIcon />
        </IconButton>
        <IconButton  onClick={e=>OpenHome(e)}>
            <HomeIcon />
        </IconButton> */}

        {/* <Header>
            <CustomVerticalMore/>
        </Header> */}
        <div style={{marginTop:"60px"}}>
            
        </div>
        <SearchChat>
            <SearchBar>
                <SearchIcon/>
                <SearchInput ref = {inputAreaRef} placeholder="Search or start a new chat"/>
            </SearchBar>
        </SearchChat>
        {searchFriends? <>
            {friends.map(friend=>(
                <Friend
                    key={friend.id}
                    photoURL={friend.photoURL}
                    displayName={friend.displayName}
                    id={friend.id}
                />
            ))} 
        </> : <>
            {chats.map(chat=>(<Chat key={chat.id}
                id = {chat.id}
                lastestMessage = {chat.lastestMessage}
                users = {chat.users}
                timestamp = {chat.timestamp}
            />))}
        </>}
    
       
        
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
    background-color:#FFFFFF;
    min-width:320px;
    max-width:450px;
    height:100%;

`

const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:1px solid whitesmoke;
    width:100%;
`

const UserAvatar = styled(Avatar)`
    cursor:pointer;
    :hover{
        opacity:0.8;
    }
`
const SearchChat = styled.div`

    background-color:#f6f6f6;

    padding:20px;
    border-bottom:1px solid rgba(0,0,0,0.1);
`
const SearchBar = styled.div`
    display:flex;
    background-color:white;

    padding:5px;
    border-bottom:1px solid #ededed;
    border-radius:10px
`

const SearchInput = styled.input`
    width:100%;
    border:none;
`