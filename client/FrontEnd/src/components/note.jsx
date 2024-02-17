import React from "react";
import { useState } from "react";
import { Box,Textarea, Button, Input, Heading } from "@chakra-ui/react";
import axios from "axios";

/**
 * @author
 * @function Note
 **/

const Note = ({ item }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editContent, setEditContent] = useState(item.content);

	const handleEdit = () => {
		console.log(isEdit);
		setIsEdit(!isEdit);
	};
	console.log(item._id)
	const handleSave = () => {

		const content={
			"content":editContent
		}
		console.log(content)
	  const res=axios.patch(`https://addnotesapp2024.cyclic.app/notes/patch/${item._id}`,content,{withCredentials:true})
	   console.log(res)}	
	const handleDelete = () => {
		axios.delete(`https://addnotesapp2024.cyclic.app/notes/delete/${item._id}`, {withCredentials:true})
	}

	return (
		<Box
			lineHeight={"60px"}
			width={"50%"}
			padding="2%"
			margin="auto"
			marginTop="5%"
			boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
			
			key={item._id}
		>
			<Heading> Title {item.title}</Heading>
			<Heading size="sm">Email: {item.email}</Heading>
			{isEdit ? (
				<Textarea
                    display={"block"}
                   
					type="text"
					value={editContent}
                    width={"100%"}
                    size='xl'
					onChange={(e) => setEditContent(e.target.value)}
				/>
			) : (
				<p size="sm">{item.content}</p>
			)}
			<Button onClick={handleDelete}>Delete</Button>
			<Button margin={"3%"} onClick={handleEdit}>Edit</Button>
			{isEdit && <Button onClick={handleSave}>Save</Button>}
		</Box>
	)
};
export default Note
