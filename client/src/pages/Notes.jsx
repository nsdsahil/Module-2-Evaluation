import React, { useEffect , useContext	} from "react";
import { Box, Button, Heading } from "@chakra-ui/react";

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
				const res = await fetch("https://smoggy-rose-jacket.cyclic.app/posts",{
					method: "GET",
					credentials: "include",
				});
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
				{notes.map((item) => (
					<Box>
						<Box>{item.title}</Box>
						<Box>{item.body}</Box>
						<Box>{item.device}</Box>
					</Box>
				))}
			</Box>
		</>
	);
};
export default Notes;
