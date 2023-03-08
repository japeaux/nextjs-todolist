import React from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import AppInsideBar from '../components/modules/views/AppInsideBar'

const Chat = () => {

  return (
    <>
         <AppInsideBar />
      <Layout>
        <div style={{width:'50%', textAlign:"center", marginTop:"60px"}}>
   
            <Image src="/post_chat.png" height={250} width={400}/>
            <h2 style={{color:'#727272'}}>My chat box</h2>
            <p style={{color:'#b7b9bb'}}>Check your messages to setup requests</p>
          </div>
      </Layout>
    </>
      
   
  )
}

export default Chat