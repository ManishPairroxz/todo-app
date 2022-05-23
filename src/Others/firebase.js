import  {   initializeApp   }   from    'firebase/app';
import  {   getAuth }   from    "firebase/auth";
import  {   Firestore, getFirestore    }   from    "firebase/firestore";
import     firebaseConfig     from    "../Config/firebaseConfig";
import  {   getDatabase }   from    "firebase/database";

const   firebaseApp =   initializeApp(firebaseConfig);

const   auth    =   getAuth(firebaseApp);
const   db      =   getFirestore(firebaseApp);

export  {   auth,   db  };