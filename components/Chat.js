import React from 'react'
import moment from 'moment'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import getFriendData from '../utils/getFriendData'
import { useState } from 'react'


const Chat = ({id, users, timestamp = '', lastestMessage = ''}) => {
    const router = useRouter()
    const enterChat=()=>{
        router.push(`/chat/${id}`)
    }

    const [friend, setFriend] = useState({})
    useEffect(()=>{
        if(users.length > 0){
            getFriendData(users).then(data=>{
                setFriend(data)
                console.log(data, "dataatata")
            })
        }
    },[])


  return (
    <Container onClick={enterChat}>
        <FrdAvatar src={friend.photoURL}/>
        <ChatContainer>
            <div style={{gridArea:'name'}}>{friend.displayName}</div>
            <div style={{gridArea:'lastest_message'}}>{lastestMessage}</div>
            <div style={{gridArea:'time',fontSize:'14px'}}>{timestamp?moment(timestamp?.toDate()).format('LT'):''}</div> 
        </ChatContainer>
        
    </Container>
  )
}

export default Chat



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