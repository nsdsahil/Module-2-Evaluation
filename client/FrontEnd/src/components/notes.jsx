import React, { useEffect } from 'react'
import {Box, Button, Heading } from '@chakra-ui/react'
import Note from './note'

/**
* @author
* @function Notes
**/

const Notes = (props) => {
  const [notes,setNotes]=React.useState([])


  useEffect(()=>{
    const getData=async()=>{
      try{
        const res=await fetch("https://addnotesapp2024.cyclic.app//notes",{
          method:"GET",
          credentials:"include"
        })
        // const res=await fetch("http://localhost:3000/notes",{
        //   method:"GET",
        //     mod:"cors",
        //     credentials:"include"
          
        // })
        const data= await res.json();
        console.log(data);
        setNotes(data)
      }
      catch(err){
        console.log(err);
      }
    }
    getData();
  },[])
  return(
    <>
    <Box>
     

    </Box>
    <Box > 
    
    {
    notes.map((item)=>(
        
        <Note item={item} key={item._id}/>
    
      ))}
    </Box>
    </>
   )
  }
export default Notes;