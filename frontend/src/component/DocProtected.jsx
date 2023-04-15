import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Store } from "./Store"


const DocProtected=({children})=>{
    const {state}=useContext(Store)
    const {UserInfo}=state
    return  UserInfo &&  UserInfo.isDoctor ?  children : <Navigate to='/login'/> 
}

export default DocProtected