import { Navigate,Outlet } from "react-router-dom"

export const RedirectPanel =({user,access_token,children, redirectTo="/panel"})=>{
    if(user && access_token){
        return <Navigate to={redirectTo} />
    }
    return children?children:<Outlet />;
}

export const RedirectLogin =({user,access_token,children,redirectTo="/login"})=>{
    if(!user  || ! access_token){
        return <Navigate to={redirectTo} />
    }
    return <Outlet />;
}

