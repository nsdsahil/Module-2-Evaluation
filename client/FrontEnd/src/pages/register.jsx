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
        dob: "",
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
		await axios.post("https://addnotesapp2024.cyclic.app/auth/register",userDetails,{withCredentials:true}).then((res)=>{
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
			padding={"2%"}
			boxShadow={
				"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
			}
			width={"40%"}
			margin={"auto"}
		>
			<div>
				<Heading>Register</Heading>
			</div>
			<FormControl textAlign={"left"}>
				<FormLabel>Name</FormLabel>
				<Input type="text" name="name" onChange={(e) => handlechange(e)} />
				<FormLabel>Date of Birth</FormLabel>
				<Input type="date" name="dob" onChange={(e) => handlechange(e)} />
				<FormLabel>Gender </FormLabel>
			    <RadioGroup defaultValue="Itachi">
					
						<Radio onChange={(e) => handlechange(e)}  value="male" name="gender">Male</Radio>
						<Radio onChange={(e) => handlechange(e)}  value="female" name="gender">Female</Radio>
					
				</RadioGroup>

                
				<FormLabel>Email</FormLabel>
				<Input type="email" name="email" onChange={(e) => handlechange(e)} />
				<FormHelperText>
					Enter the email you'd like to receive the newsletter on.
				</FormHelperText>
				<FormErrorMessage>Email is required.</FormErrorMessage>
				<FormLabel>Password</FormLabel>
				<Input
					type="password"
					name="password"
					onChange={(e) => handlechange(e)}
				/>
				<FormHelperText>We'll never share your Password</FormHelperText>
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
