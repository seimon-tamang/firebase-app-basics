import React,{useState} from 'react'
import {auth} from "../config/firebase-config"
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth';
import { googleProvider } from '../config/firebase-config';

function Auth() {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  console.log(auth?.currentUser?.email);

  const signIn = async()=>{

    try{
      await createUserWithEmailAndPassword(auth,email,password);
      
    }
    catch(error){
      console.error(error);
    }
      
  };


  const signInWithGoogle = async()=>{
      try{
        await signInWithPopup(auth,googleProvider);
      }
      catch(error){
        console.log(error);
      }
  }


  const logOut = async()=>{
      try{
        signOut(auth);
        console.log("LOGGED OUT")
      }
      catch(error){
        console.error(error);
      }
  }

  return (
    <div>
        <input placeholder='Email' onChange={
          (e) => setEmail(e.target.value)
        }/>
        <input placeholder='Password' 
        type="password"
        onChange={(e)=>setPassword(e.target.value)}/>
  
        <button onClick={signIn}>Sign In</button>
        
        <button onClick={signInWithGoogle}>Sign In with Google</button>

        <button onClick = {logOut}>LOGOUT</button>
    </div>
  )
}

export default Auth;