import { Button } from '@mui/material'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Typography from '../modules/components/Typography'

const TopModels = () => {

    const [models, setModels] =  useState([ {photoURL:'/assets/16.png'}, 
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'},
                                            {photoURL:'/assets/16.png'} ])
    
    const router = useRouter();
    const checkModel = async (model,e) =>{
        e.stopPropagation();
        router.push(`/tenderzz/${model.id}`)
    }
        
    useEffect(()=>{
        async function fetchModels(){
            const usersRef = collection(db,"users");
            const q = query(usersRef, where("typeOfUser","==",'model'));
            const querySnapshot = await getDocs(q);    
            let aux = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
            setModels(aux)
            console.log(aux[0].photoURL)
          }
          fetchModels()
    },[])
    
    return (
        <div>
            <Typography variant="h4" align="center" component="h2" sx={{ color: 'info.main' , mt:2}}>
                Most required Tenderzz
            </Typography>
           { models? (  
            <div className="gallery">
                {models?.map((model, index)=>(
               
                        <img  key={index} src={model.photoURL} onClick={e=>checkModel(model, e)} />
              
                   
                ))} 

               
                {/* <img src={models[1].photoURL} />
                <img src="https://picsum.photos/id/136/300/300" alt="big rocks with some trees"/>
                <img src="https://picsum.photos/id/1039/300/300" alt="a waterfall, a lot of tree and a great view from the sky"/>
                <img src="https://picsum.photos/id/110/300/300" alt="a cool landscape"/>
                <img src="https://picsum.photos/id/1047/300/300" alt="inside a town between two big buildings"/>
                <img src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain"/>
                <img src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain"/>
                <img src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain"/>
                <img src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain"/> */}

            </div> ):(<></>)}
        </div>
    )
}

export default TopModels


