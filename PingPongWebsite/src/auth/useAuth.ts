import { useContext } from "react";
import { AuthContext } from "./auth.context";

export function useAuth(){
    const auth = useContext(AuthContext);
    
    if(auth == undefined){
        throw new Error("useAuth must be used inside AuthProvider.")
    }

    return auth;
}