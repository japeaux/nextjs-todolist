import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../Auth';
import { useRouter } from 'next/router'
import { auth } from '../firebase';
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {currentUser} = useAuth()
  const router = useRouter()



  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e) =>{
    e.stopPropagation();
    setAnchorEl(null);
    //router.push(`/dashboard`)
  }

  const OpenProfile = async (e) =>{
    e.stopPropagation();
    setAnchorEl(null);
    router.push(`/tenderz`)
  }

  const OpenMyrequest = async (e) =>{
    e.stopPropagation();
    setAnchorEl(null);
    router.push(`/myrequest`)
  }

  const OpenPendingJobs = async (e) =>{
    e.stopPropagation();
    setAnchorEl(null);
    router.push(`/pendingJobs`)
  }


  return (
    <>
      <IconButton
        onClick={handleClick}
      >
        <Avatar src={currentUser.photoURL}/>
        {/* <MoreVertIcon/> */}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical:'bottom',
          horizontal:'right',
        }}
        transformOrigin={{
          vertical:'top',
          horizontal:'right',
        }}
      >
        <MenuItem  onClick={e=>OpenProfile(e)}>Profile</MenuItem>
        <MenuItem onClick={e=>OpenMyrequest(e)}>My requests</MenuItem>
        <MenuItem onClick={e=>OpenPendingJobs(e)}>Pending Jobs</MenuItem>
        <MenuItem onClick={()=>auth.signOut()}>Logout</MenuItem>
        
      </Menu>
    </>
  );
}
