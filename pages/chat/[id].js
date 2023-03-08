import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import React from 'react'
import styled from 'styled-components'
import ChatContent from '../../components/ChatContent'
import AppInsideBar from '../../components/modules/views/AppInsideBar'
import { db } from '../../firebase'
const ChatBox = ({chat, id, messages}) => {
  return (
    <>
         <div style={{marginTop:"60px"}}>
                <Container>
            
                <ChatContainer>
                    <ChatContent chat={chat} chat_id={id} messagesProps={messages}/>
                </ChatContainer>
            </Container>
        </div>
    </>
   
  )
}

export default ChatBox

export async function getServerSideProps(context){

    const messagesRef = collection(db,"chats",context.query.id,"messages")
    const q = query(messagesRef, orderBy("timestamp","asc"))
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc=>({...doc.data(), 
        id : doc.id, 
        timestamp: doc.data().timestamp?.toDate().getTime()}))
    
    const docRef = doc(db,"chats",context.query.id);
    const docSnap = await getDoc(docRef)
    return {
        props:{
            chat:JSON.stringify(docSnap.data()),
            id:context.query.id,
            messages:JSON.stringify(messages)
        }
    }
}


const Container = styled.div`
    display:flex;
    background-color:"red";
    width:100%;
`

const ChatContainer = styled.div`
    flex:1;
    overflow:scroll;
    max-height:100vh;
    height:80vh;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;
`