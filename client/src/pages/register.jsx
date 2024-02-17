import React from "react";
import cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import {
	FormControl,
	Box,
	FormLabel,
	Input,
	Heading,
	FormErrorMessage,
    RadioGroup,
    Radio,
    HStack,
	useToast,
	FormHelperText,
} from "@chakra-ui/react";
/**
 * @author
 * @function Register
 **/

const Register = () => {
	const toast=useToast()
	const [userDetails, setUserDetails] = useState({
        name: "",
        gender: "",
        email: "",
        password: "",
    });

	const handlechange = (e) => {
		const { name, value } = e.target;
		setUserDetails({
			...userDetails,
			[name]: value,
		});
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log(userDetails);
		await axios.post("https://smoggy-rose-jacket.cyclic.app/users/register",userDetails,{withCredentials:true}).then((res)=>{
			toast({
				title: 'Registration',
				description: "You are registered",
				status: 'success',
			})
			console.log(res.data);
			
		}).catch((err)=>{
			toast({
				title: 'Registration',
				description: err.message,
				status: 'error',
			})
			console.log(err);
		})
		
	};

	return (
		<Box
		width={"30%"}
		margin={"auto"}
		>
			<div>
				<Heading>Register</Heading>
			</div>
			<FormControl textAlign={"left"}>
				<FormLabel>Name</FormLabel>
				<Input type="text" name="name" onChange={(e) => handlechange(e)} />
				<FormLabel>Gender </FormLabel>
			    <RadioGroup defaultValue="Itachi">
					
						<Radio onChange={(e) => handlechange(e)}  value="male" name="gender">Male</Radio>
						<Radio onChange={(e) => handlechange(e)}  value="female" name="gender">Female</Radio>
					
				</RadioGroup>

                
				<FormLabel>Email</FormLabel>
				<Input type="email" name="email" onChange={(e) => handlechange(e)} />
				
				<FormErrorMessage>Email is required.</FormErrorMessage>
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
					value="Register"
					type="submit"
					onClick={(e) => handleSubmit(e)}
				/>
			</FormControl>
		</Box>
	);
};
export default Register;
