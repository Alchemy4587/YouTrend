import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser])


    return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}

export default UserProvider;