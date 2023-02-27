import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../../modules/components/AppBar';
import Toolbar from '../../modules/components/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import CustomVerticalMore from '../../../components/CustomVerticalMore'

import { useAuth } from '../../../Auth';
import { useRouter } from 'next/router'


import { Avatar,  IconButton } from '@mui/material'


const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppInsideBar() {
  const {currentUser} = useAuth()
  const router = useRouter()

  const OpenChat = async (e) =>{
    e.stopPropagation();
    router.push(`/Chat`)
}

const OpenHome = async (e) =>{
    e.stopPropagation();
    router.push(`/dashboard`)
  
}

const OpenContract = async (e) =>{
  e.stopPropagation();
  router.push(`/request`)
}



  return (
    <div>
      <AppBar position="fixed" sx={{backgroundColor:"#242424"}}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            href="/dashboard"
            sx={{ fontSize: 24 }}
          >
            {'ExtraPartyMoney'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/profile"
              sx={rightLink}
            >
              {'profile'}
            </Link> */}

           
            <IconButton  onClick={e=>OpenContract(e)}>
              <RequestPageIcon  color="secondary"/>
            </IconButton>

            <IconButton  onClick={e=>OpenChat(e)}>
              <ChatIcon  color="secondary"/>
            </IconButton>
            <IconButton  onClick={e=>OpenHome(e)}>
                <HomeIcon  color="secondary"/>
            </IconButton>

           
              {/* <Avatar src={currentUser.photoURL}/> */}
              <CustomVerticalMore/>
         



            {/* <Link
              variant="h6"
              underline="none"
              href="/signup"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Sign Up'}
            </Link> */}
          </Box>
        </Toolbar>
      </AppBar>
     
    </div>
  );
}

export default AppInsideBar;