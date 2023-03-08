// // import type { NextPage } from 'next'
// // import Head from 'next/head'
// import Image from 'next/image'
// // import Link from 'next/link'
// // import { useRouter } from 'next/router'
// import { useState } from 'react'
// import { useEffect, useRef } from 'react'
// // import Modal from '../components/Modal'
// // import cloudinary from '../utils/cloudinary'
// // import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
// // import type { ImageProps } from '../utils/types'
// // import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
// import { verifyIdToken } from '../../../firebaseAdmin';
// import { collection, getDocs,  orderBy, query, where, onSnapshot  } from 'firebase/firestore';
// import nookies from 'nookies'
// import { db } from '../../../firebase';

// function Gallery({imageProps, id}) {

//   // const router = useRouter()
//   // const { photoId } = router.query
//   // const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
//   const [images, setImages] = useState(imageProps)
//   // const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

//   useEffect(() => {
//     // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
//     // if (lastViewedPhoto && !photoId) {
//     //   lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
//     //   setLastViewedPhoto(null)
//     // }
    
//     console.log("imageProps", imageProps)
//   }, [])
  
//   useEffect(()=>{
//     console.log("ID", id)
//     const collectionRef2 = collection(db, "album")
//     const conditions = [orderBy("timestamp", "desc")]


//     // conditions.push(where("idTodo","==",id));
            

//             // conditions.push(where("status","==",'esperando']));
            

//     const q = query(collectionRef2, ...conditions);
//     const unsubscribe = onSnapshot(q,(querySnapshot)=>{
//       setImages(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
//     })
//     console.log(images, "412")
//     return unsubscribe;
// },[])
//   return (
//     <>
  
//       <main className="mx-auto max-w-[1960px] p-4">
//         {/* {photoId && (
//           <Modal
//             images={images}
//             onClose={() => {
//               setLastViewedPhoto(photoId)
//             }}
//           />
//         )} */}
//         <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
//           <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
//             <div className="absolute inset-0 flex items-center justify-center opacity-20">
//               <span className="flex max-h-full max-w-full items-center justify-center">
               
//               </span>
//               <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
//             </div>
         
//             <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
//               2022 Event Photos
//             </h1>
//             <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
//               Our incredible Next.js community got together in San Francisco for
//               our first ever in-person conference!
//             </p>
//             <a
//               className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
//               href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
//               target="_blank"
//               rel="noreferrer"
//             >
//               Clone and Deploy
//             </a>
//           </div>
//           {images?.map(({ id, public_id, format, picURL }) => (
//             // <Link
//             //   key={id}
//             //   href={`/?photoId=${id}`}
//             //   as={`/p/${id}`}
//             //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
//             //   shallow
//             //   className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
//             // >
//               <Image
//                 alt="Next.js Conf photo"
//                 className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
//                 style={{ transform: 'translate3d(0, 0, 0)' }}
//                 // placeholder="blur"
                
//                 src={picURL}
//                 width={720}
//                 height={480}
//                 sizes="(max-width: 640px) 100vw,
//                   (max-width: 1280px) 50vw,
//                   (max-width: 1536px) 33vw,
//                   25vw"
//               />
//             // </Link>
//           ))}
//         </div>
//       </main>
      
//     </>
//   )
// }

// export default Gallery

// // export const getStaticPaths = async () => {
// //     const snapshot = await getDocs(collection(db,'album'));
// //     const paths = snapshot.docs.map(doc=>{
// //         return {
// //             params:{ id:doc.id.toString() }
// //         }
// //     })

// //     return {
// //         paths,
// //         fallback:false
// //     }
// // }

// // export const getStaticProps = async (context) =>{

// //     const id = context.params.id;

// //     const docRef = doc(db,'album',id)
// //     const docSnap = await getDoc(docRef)

// //     return {
// //         props : { imageProps: JSON.stringify(docSnap.data()), id:id || null}
// //     }
// // }



// export async function getServerSideProps(context){
//   try{
//     const cookies = nookies.get(context)
//     const token = await verifyIdToken(cookies.token)
//     const { id } = token;
//     const collectionRef = collection(db, "album")
//     const q = query(collectionRef,orderBy("timestamp", "desc"));
//     const querySnapshot = await getDocs(q)
//     let images = []
//     querySnapshot.forEach((doc)=>{
//       images.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
//     })
//     return {
//       props: {
//         imageProps: JSON.stringify(images) || [],
//       }
//     }
//   } catch(error){
//     return { props:{}}
//   }
// }


import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import ButtonUploadAlbum from '../../../components/storage/ButtonUploadAlbum'
import Typography from "../../../components/modules/components/Typography";

export default function PhotoAlbum({imagesProps}) {
  // console.log(photos)
  // console.log(imagesProps)
  const mapper = JSON.parse(imagesProps)
  console.log(mapper)
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

  return (
    <div>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
       <ButtonUploadAlbum />
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







