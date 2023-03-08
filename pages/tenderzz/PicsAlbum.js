import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Typography from "../../components/modules/components/Typography";

import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import { useEffect } from "react";
import { db } from "../../firebase";

export default function PicsAlbum({id}) {
  // console.log(photos)
  //const mapper = JSON.parse(imagesProps)
  //console.log(mapper)
  const [mapper, setMapper] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    console.log(index)
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

        
    async function fetchUser(){
        const usersRef = collection(db,"album");
        const q = query(usersRef, where("user_id","==",id));
        const querySnapshot = await getDocs(q);
        const aux = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
        setMapper(aux)
    }

    useEffect(()=>{
        fetchUser()
    },[])


  return (
    <div>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Gallery photos={mapper} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={mapper.map(x => ({
                ...x,
                srcset: x.srcSet,
                // caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}



// export const getStaticPaths = async () => {
//     const snapshot = await getDocs(collection(db,'album'));
//     const paths = snapshot.docs.map(doc=>{
//         return {
//             params:{ id:doc.id.toString() }
//         }
//     })

//     return {
//         paths,
//         fallback:false
//     }
// }

// export const getStaticProps = async (context) =>{
//     const id = context.params.id;

//     const docRef = doc(db,'album',id)
//     const docSnap = await getDoc(docRef)

//     return {
//         props : { imagesProps: JSON.stringify(docSnap.data()), id:id || null}
//     }
// }


// export async function getServerSideProps(context){
//   try{
//     const id = context.params.id;
//     const collectionRef = collection(db, "album")
//     const q = query(collectionRef, where("user_id","==",id), orderBy("timestamp", "desc"));
//     const querySnapshot = await getDocs(q)
//     //let images = []
//     // querySnapshot.forEach((doc)=>{
//     //   images.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
//     // })
//     let images = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
//     return {
//       props: {
//         imageProps: JSON.stringify(images) || [],
//       }
//     }
//   } catch(error){
//     return { props:{}}
//   }
// }



