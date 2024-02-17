import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./pages/login";
import { AuthContext } from "./context/AuthContextProvider";
import Notes from "./pages/Notes"
import Register from "./pages/register";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
	const { isLogin, setIsLogin } = useContext(AuthContext);
	
	return (
		<>
    <Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register />} />
				<Route path="/notes" element={<Notes/>} />
			</Routes>
		</>
	);
}

export default App;
