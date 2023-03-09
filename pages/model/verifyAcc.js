
import { useEffect, useState } from 'react'

import { useAuth } from '../../Auth';
import {useRouter} from 'next/router'

import withRoot from '../../components/modules/withRoot';
import BeeTenderzForm from '../../components/modules/views/BeeTenderzForm';


function VerifyAcc() {

  const {currentUser} = useAuth()
  const [open,setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title:'',details:''})


  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  const router = useRouter();

  const OpenChat = async (e) =>{
      e.stopPropagation();
      router.push(`/Chat`)
  }


  return (
    <>
       <BeeTenderzForm>
          

      </BeeTenderzForm>
      
    </>
    
    )
}

export default withRoot(VerifyAcc)

