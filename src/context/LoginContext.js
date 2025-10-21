const { createContext, useState, useEffect } = require("react");

export const LoginContext=createContext()

export default function LoginProvider(props)
{
    let [isLogin, setIsLogin]=useState(false)
    let [userId, setUserId]=useState(null)

  //   useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setIsLogin(true);
  //     setUserId(parsedUser.id); // adjust based on your API response structure
  //   }
  // }, []);

    return(
        <LoginContext.Provider value={{isLogin,setIsLogin,userId,setUserId}}>
            {props.children}
        </LoginContext.Provider>
    )
}