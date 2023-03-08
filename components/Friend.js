import React from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'

import { auth, db } from '../firebase';
import { collection, onSnapshot, getDocs, query, where, addDoc } from 'firebase/firestore'
import { useAuth } from '../Auth';


const Friend = ({photoURL, displayName, id}) => {
    const {currentUser} = useAuth()
    const createChat = async (id) =>{
        const chatsRef = collection(db,"chats")
        console.log(currentUser)
        const q = query(chatsRef, where("users","array-contains", currentUser.id))
        const querySnapshot = await getDocs(q);
        const chatAlreadyExist = (friend_id) => !!querySnapshot?.docs.find(chat => chat.data().users.find(user=>user===friend_id)?.length>0)
        console.log("create chat")
        if(!chatAlreadyExist(id)){
            addDoc(chatsRef,{users:[currentUser.id, id]})
        }else{
            console.log("chat already exists")
        }
    }


  return (
    <Container onClick={()=>createChat(id)}>
        <FrdAvatar src={photoURL}/>
        <ChatContainer>
            <div style={{gridArea:'name'}}>{displayName}</div>

        </ChatContainer>
        
    </Container>
  )
}

export default Friend

const Container = styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
    min-width:67px;
    padding-left:15px;
    word-break:break-word;
    :hover{
        background-color:#f5f5f5;
    }
`
const FrdAvatar = styled(Avatar)`
    margin:5px;
    margin-top:15px;
`

const ChatContainer = styled.div`
    display:grid;
    padding:10px;
    width:100%;
    grid-template-columns:repeat(3,1fr);
    borderbottom:1px solid #ededed;
    gap:10px;
    grid-template-areas:
    "name name time"
    "lastest_message lastest_message.";
`