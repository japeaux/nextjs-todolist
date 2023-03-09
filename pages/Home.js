import * as React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import ProductSmokingHero from '../components/modules/views/ProductSmokingHero';
import AppFooter from '../components/modules/views/AppFooter';
import ProductHero from '../components/modules/views/ProductHero';
import ProductHowItWorks from '../components/modules/views/ProductHowItWorks';
import AppAppBar from '../components/modules/views/AppAppBar';
import withRoot from '../components/modules/withRoot';


import { useAuth } from '../Auth';
import { useRouter } from 'next/router'


function Index() {
  const router = useRouter()
  const { currentUser } = useAuth()

  useEffect(()=>{
      console.log("user",currentUser)
      if(currentUser?.emailVerified){
        if(currentUser.contaVerificada){
          router.push('/dashboard')
        }else{
          router.push('/model/verifyAcc')
        }
      }else{
        console.log("Check your email to verify your account")
      }
  },[])




  return (
    <>
      <AppAppBar />
      <ProductHero />
      <ProductHowItWorks />
      <ProductSmokingHero />
      <AppFooter />
    </>
  );
}

export default withRoot(Index);