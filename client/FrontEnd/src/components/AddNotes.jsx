import React from "react";
import {
	Button,
    Flex,
    Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Text,
	useToast,
	Textarea,
} from "@chakra-ui/react";
import axios from "axios";
/**
 * @author
 * @function AddNote
 **/

export const AddNote = (props) => {
	//modal
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const OverlayTwo = () => (
		<ModalOverlay
			bg="none"
			backdropFilter="auto"
			backdropInvert="80%"
			backdropBlur="2px"
		/>
	);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);
	//modal ended
	const toast = useToast();
	const [note, setNote] = React.useState({ email: "", title: "", content: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNote({ ...note, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(note);
		const res = axios
			.post("https://addnotesapp2024.cyclic.app/notes/add", note, {
				withCredentials: true,
			})
			.then((res) => {
				toast({
					title: "Success",
					description: "Note added successfully",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			});
		console.log(res);
	};

	return (
		<>
			<Box textAlign={"center"} >
				<Button
					
					
					onClick={() => {
						setOverlay(<OverlayOne />);
						onOpen();
					}}
				>
					Add a Note
				</Button>
			</Box>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit}>
							<FormLabel>Email:</FormLabel>
							<Input name="email" type="email" onChange={handleChange} />
							<FormLabel>Title</FormLabel>
							<Input name="title" type="text" onChange={handleChange} />
							<FormLabel>Content</FormLabel>
							<Textarea name="content" onChange={handleChange} type="text" />
							<Input backgroundColor={"teal.200"} type="submit" />
						</form>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
