import React from "react";
import { createContext, useState, useEffect } from "react";


/**
 * @author
 * @function AuthContexProvider
 **/
export const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
const [isLogin, setIsLogin] = useState(() => {
  return localStorage.getItem('isLogin')==='true' 
});
useEffect(() => {
  localStorage.setItem('isLogin', isLogin);
}, [isLogin]);
 

	return (
		<AuthContext.Provider value={{ isLogin, setIsLogin }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthContextProvider