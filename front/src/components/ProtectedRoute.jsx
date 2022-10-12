import { Navigate,Outlet } from "react-router-dom"

export const RedirectPanel =({user,children, redirectTo="/panel"})=>{
    if(user){
        return <Navigate to={redirectTo} />
    }
    return children?children:<Outlet />;
}

export const RedirectLogin =({user,children,redirectTo="/login"})=>{
    if(!user){
        return <Navigate to={redirectTo} />
    }
    return <Outlet />;
}

