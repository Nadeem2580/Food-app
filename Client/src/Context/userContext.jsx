import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isRefresh, setIsRefresh] = useState(false)
    const value = {
        navigate,
        isRefresh,
        setIsRefresh,
    };


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

export const useAppContext = () => {
  return  useContext(AppContext)
}