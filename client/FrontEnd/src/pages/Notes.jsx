import React, { useEffect , useContext	} from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import Note from "../components/note";
import { AddNote } from "../components/AddNotes";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContextProvider";

/**
 * @author
 * @function Notes
 **/

const Notes = (props) => {
	
	
	const {isLogin,setIsLogin}=useContext(AuthContext)
	const [notes, setNotes] = React.useState([]);

	const navigate=useNavigate();



	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetch("https://addnotesapp2024.cyclic.app//notes", {
					method: "GET",
					credentials: "include",
				});
				// const res=await fetch("http://localhost:3000/notes",{
				//   method:"GET",
				//     mod:"cors",
				//     credentials:"include"

				// })
				const data = await res.json();
				console.log(data);
				setNotes(data);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, []);
	return (
		<>
			
			<Heading>Notes</Heading>	
			<Box>
				<AddNote/>
			</Box>
			<Box>
				{notes.map((item) => (
					<Note item={item} key={item._id} />
				))}
			</Box>
		</>
	);
};
export default Notes;
