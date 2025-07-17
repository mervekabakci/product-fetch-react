import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        if (localStorage.loggedInUser) {
        try {
            const savedUser = JSON.parse(localStorage.loggedInUser);
            setUser(savedUser);
        } catch (err) {
            localStorage.removeItem('loggedInUser');
        }
        }
        setLoadingUser(false);
    }, []);

    if (loadingUser) {
        // Kullanıcı bilgisi yüklenene kadar boş sayfa veya loading gösterebilirsin
        return <div>Loading...</div>;
    }

    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}