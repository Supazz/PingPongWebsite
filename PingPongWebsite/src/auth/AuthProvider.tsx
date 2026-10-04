import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { CurrentUser } from "./login.model";
import { getCurrentUser } from "./login.service";
import { getErrorMessage } from "../api";
import { AuthContext } from "./auth.context";

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshUser = useCallback(async (): Promise<CurrentUser | null> =>{
       setLoading(true);
       setError(null);
       
       try{
        const account = await getCurrentUser();
        setUser(account);
        return account;
       } catch (error){
        setUser(null);
        setError(getErrorMessage(error));
        throw error;
       } finally{
        setLoading(false);
       }
    }, []);

    useEffect(() =>{
        void refreshUser().catch(()=> {});
    }, [refreshUser])

    const clearUser = () =>{
        setUser(null);
        setError(null);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{user, loading, error, refreshUser, clearUser}}>{children}</AuthContext.Provider>
    )
}