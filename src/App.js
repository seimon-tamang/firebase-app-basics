import { useState,useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import {db,auth} from "./config/firebase-config";
import { 
  getDocs,
  collection ,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';




function App() {

  const [movieList, setMovieList] = useState([]); 

  //new movie state
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setReleaseDate] = useState(0)
  const [isOscar, setIsOscar] = useState(false)


  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("");
  
  //Reference to our Collection named movies
  const moviesCollectionRef = collection(db,"movies");


  const getMovieList = async()=>{
    //READ THE DATA
    //SET THE MOVIE LIST
    
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc)=>({...doc.data(),id: doc.id}))
      setMovieList(filteredData);
    }
    catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    getMovieList();
  },[movieList]
  )
  

  const onSubmitMovie = async()=>{

    
 

    try{

      await addDoc(moviesCollectionRef, {
        title:newMovieTitle,
        releaseDate:newReleaseDate,
        recievedAnOscar:isOscar ,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    }
    catch(err){
      console.log(err);
    }
    
  }


  const deleteMovie = async(id)=>{
    const movieDoc = doc(db,"movies",id);
    await deleteDoc(movieDoc);
  }


  const updateTitle = async(id)=>{
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc,{title:updatedTitle});
  }

  return (
    <div className="App">
      <Auth/>

      <div>
        <input placeholder='Movie Title:' 
        onChange={(e)=>setNewMovieTitle(e.target.value)}/>

        <input placeholder='Release Date..' 
        type='number'
        onChange={(e)=>(setReleaseDate(e.target.value))}
        />
        <input type="checkbox" 
        checked={isOscar}
        onChange={(e)=>setIsOscar(e.target.checked)}
        />
        <label>Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit MOVIE</button>
      </div>

      <div>
        {
          movieList.map((movie)=>(
            <div>
              <h4 style={{ color: movie.recievedAnOscar? "green":"red"}}>{movie.title}</h4>
              <p>{movie.releaseDate}</p>
              <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
              <input placeholder='new title' onChange={(e)=>setUpdatedTitle(e.target.value)}/>
              <button onClick={()=>updateTitle(movie.id)} >Update </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
