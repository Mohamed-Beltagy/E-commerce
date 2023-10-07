import { createContext, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    let [userToken, setUserToken] = useState(null);
   
    return <AuthContext.Provider value={{ userToken, setUserToken }}>
        {children}
    </AuthContext.Provider>
}