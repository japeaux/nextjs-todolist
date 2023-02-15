import * as React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import ProductCategories from '../components/modules/views/ProductCategories';
import ProductSmokingHero from '../components/modules/views/ProductSmokingHero';
import AppFooter from '../components/modules/views/AppFooter';
import ProductHero from '../components/modules/views/ProductHero';
import ProductValues from '../components/modules/views/ProductValues';
import ProductHowItWorks from '../components/modules/views/ProductHowItWorks';
import ProductCTA from '../components/modules/views/ProductCTA';
import AppAppBar from '../components/modules/views/AppAppBar';
import withRoot from '../components/modules/withRoot';


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