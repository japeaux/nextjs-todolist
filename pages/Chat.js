import React from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

const Chat = () => {

  return (
    <>
    <Layout>
      <div style={{width:'50%', textAlign:"center"}}>
          <Image src="/post_chat.png" height={250} width={400}/>
          <h2 style={{color:'#727272'}}>My chat box</h2>
          <p style={{color:'#b7b9bb'}}>Check your messages to setup requests</p>
        </div>
    </Layout>
     
   
    </>
      
   
  )
}

export default Chat