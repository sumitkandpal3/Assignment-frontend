import { useState } from "react";
import UserContext from "./userContext";
import API from "../../../utils/API";

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  

  const userLogin = async ({ email, password }) => {
    try {
      const { data } =await API.post("/auth/login", { email, password });
      console.log(data);
      if (data.success) {
        setUser(data.user);
        setisLoggedIn(true);
      }
      return data;
    } catch (e) {
      // toast.error(e?.response?.data?.message);
    }
  };

  const userRegister = async ({
    name,
    email,
    password,
  }) => {
   
    const { data } = await API.post("/auth/register", {
      name,
      email,
      password,
    });
    console.log(data);
    if (data.success) {
      setUser(data.user);
      setisLoggedIn(true);
    }
    return data;
  };

  const logout = async() => {
    localStorage.removeItem("token");
    setisLoggedIn(false);
    setUser(null);
  }


  return (
    <UserContext.Provider
      value={{
        setisLoggedIn,
        isLoggedIn,
        userRegister,
        userLogin,
        logout,
        user
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
