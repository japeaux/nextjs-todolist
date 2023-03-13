const admin = require("firebase-admin");

export const verifyIdToken =(token)=>{
    if(!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(process.env.NEXT_PUBLIC_SERVICEACCOUNT)
          });
    }
    return admin.auth().verifyIdToken(token).catch(err=>{throw err;})
}

