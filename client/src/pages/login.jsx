import React from "react";
import { useState, useContext, } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import {useNavigate} from "react-router-dom"

import axios from "axios";
import cookies from "js-cookie";

import {
	FormControl,
	Box,
	FormLabel,
	Input,
	Heading,
	FormErrorMessage,
	useToast,
	FormHelperText,
} from "@chakra-ui/react";

/**
 * @author
 * @function Login
 **/

const Login = () => {
	const {isLogin,setIsLogin}=useContext(AuthContext)
	const [userDetails, setUserDetails] = useState({});
	const toast=useToast()
	const navigate=useNavigate();

	const handlechange = (e) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails, //email:KXrYk@example.com,password:123
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		console.log(userDetails);
		axios.defaults.withCredentials = true;
		await axios.post("https://smoggy-rose-jacket.cyclic.app/users/login",userDetails,{withCredentials:true}).then((res)=>{
			toast({
				title: 'Login',
				description: "You are logged in",
				status: 'success',
			})
			setIsLogin(true)
			console.log(res.data);	
			//navigate to home
			navigate("/")
			
			
		}).catch((err)=>{
			toast({
				title: 'Login failed',
				description: "try again",
				status: 'error',
			})
			console.log(err);
		})
		// const res=await axios.post("http://localhost:3000/auth/login",userDetails,{withCredentials:true})
			
	};

	return (
		<Box
		width={"30%"}
			margin={"auto"}
			
		>
			<div>
				<Heading>Login</Heading>
			</div>
			<FormControl textAlign={"left"}>
				<FormLabel>Email</FormLabel>
				<Input type="email" name="email" onChange={(e) => handlechange(e)} />
				<FormLabel>Password</FormLabel>
				<Input
					type="password"
					name="password"
					onChange={(e) => handlechange(e)}
				/>
				<Input
					bg={"teal"}
					color="white"
					width
					value="Login"
					type="submit"
					onClick={(e) => handleSubmit(e)}
				/>
			</FormControl>
		</Box>
	);
};
export default Login;
