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
    <Box bg={useColorModeValue('teal.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link to='/'>Home</Link>
            {!isLogin ?<Link to='/login'>Login</Link>:<Logout/>}
            { !isLogin &&<Link to='/register'>signup</Link>}
            <Link to={!isLogin?'/login':'/notes'}>Notes</Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                
              </MenuButton>
              <MenuList>
                <MenuItem><Link to='/login'>Login</Link></MenuItem>
                <MenuItem><Link to='/register'>signup</Link></MenuItem>
                <MenuItem><Link to={isLogin?"/notes":"/login"}>Notes</Link></MenuItem>
                <MenuItem><Logout/></MenuItem>
                <MenuDivider/>
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link to='/'>Home</Link>
            {isLogin ?<Logout/>:<Link to='/login'>Login</Link>}
            {!isLogin &&<Link to='/register'>Signup</Link>}
            <Link to='/notes'>Notes</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}></Box>
    </>
   )
  }
export default Navbar