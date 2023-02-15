import * as React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';


import { useAuth } from '../Auth';
import { useRouter } from 'next/router'


function Index() {
  const router = useRouter()
  const { currentUser } = useAuth()

  useEffect(()=>{
      console.log("user",currentUser)
      if(currentUser){
        router.push('/dashboard')
      }
  },[])




  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      {/* <ProductValues /> */}
      <ProductHowItWorks />
      {/* <ProductCTA /> */}
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);