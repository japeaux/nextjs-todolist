import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useAuth } from '../Auth'

const Message = ({user,message,timestamp}) => {
    const {currentUser} = useAuth()
    const loginMail = currentUser.email
    const MessageType = user === loginMail ? MyMessage : FrdMessage;
  return (
    <Container>
        <MessageType>
            {message}
            <Timestamp>
                {moment(timestamp).format('LT')}
            </Timestamp>
            
        </MessageType>
    </Container>
  )
}

export default Message

const Container = styled.div`
    display:flex;
`

const MessageBubble = styled.div`
    padding:15px;
    padding-bottom:26px;
    text-align:right;
    background-color:white;
    margin-bottom:10px;
    position:relative;
`

const MyMessage = styled(MessageBubble)`
    margin-left:auto;
    background-color:#dcf8c6;
    border-radius:8px 0px 8px 8px
`

const FrdMessage = styled(MessageBubble)`
    text-align:left;
    background-color:white;
    border-radius:0px 8px 8px 8px
`

const Timestamp = styled.span`
    color:gray;
    padding:10px;
    font-size:9px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
`