import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Store } from "./Store"


const AdmProtected=({children})=>{
    const {state}=useContext(Store)
    const {UserInfo}=state

    return  UserInfo && UserInfo.isAdmin ?  children : <Navigate to='/login'/>
}

export default AdmProtected