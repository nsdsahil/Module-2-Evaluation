import React, { useContext } from 'react'
import axios from 'axios'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuDivider,
    MenuButton,
    MenuList,
    Image,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    useToast,
    Stack,
    
} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { AuthContext } from '../context/AuthContextProvider';

/**
* @author
* @function Navbar
**/ 


const Navbar = (props) => {
    const {isLogin,setIsLogin}=useContext(AuthContext)
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const Logout=()=>{
      const handleClick=()=>{
       axios.get("https://addnotesapp2024.cyclic.app/auth/logout")
        .then(()=>{
          toast({
            title: 'Logout',
            description: "You are logged out",
            status: 'success',  
          }) 
          setIsLogin(false)
        }).catch((err)=>{
          toast({
            title: 'Logout failed',
            description: "try again",
            status: 'error',

          })
          console.log(err)
        })

      }
      return(
        <>
        <button onClick={handleClick}>Logout</button>
        </>
      )
    }
  return(
    <>
    <Flex width={"50%"} justifyContent={"space-between"} margin={"auto"}>
      <Link to='/Login'>Login</Link>
      <Link to='/Register'>Register</Link>
      <Link to='/notes'>notes</Link>
    </Flex>
    </>
   )
  }
export default Navbar