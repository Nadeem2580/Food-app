import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../Utils/Utility";
const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isRefresh, setIsRefresh] = useState(false)
  const [token, setToken] = useState(false)
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const cookieToken = Cookie.get("token");
    if (cookieToken) {
      setToken(cookieToken);
      fetchVendors(cookieToken);
    } else {
      setUserType("unauthorized");
    }
  }, [isRefresh]);

const fetchVendors = async (jwtToken) => {  // ✅ argument accept karo
  try {
    const res = await axios.get(`${BASE_URL}/api/login.sigleUser`, {
      headers: { Authorization: `Bearer ${jwtToken}` }, // ✅ correct token use
    });
    const user = res.data.data;
    setUserType(user?.type || "unauthorized");
  } catch (err) {
    console.log(err.message, "fetch error"); // debugging
    setUserType("unauthorized");
  }
};

  const value = {
    navigate,
    isRefresh,
    setIsRefresh,
    token,
    setToken,
    userType
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

export const useAppContext = () => {
  return useContext(AppContext)
}