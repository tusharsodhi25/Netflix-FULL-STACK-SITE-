
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCjJPvthBOzyz0MsNcuTVr79yt0G34rOlI",
  authDomain: "netflix-clone-7ff57.firebaseapp.com",
  projectId: "netflix-clone-7ff57",
  storageBucket: "netflix-clone-7ff57.appspot.com",
  messagingSenderId: "433282014962",
  appId: "1:433282014962:web:22a604b91506ba5a4cba6b"
};
 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        });
        
    } catch (error) {

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async(email,password)=>{

    try {
         await signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
