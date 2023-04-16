import { Alert, Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { Link,  useNavigate } from "react-router-dom"
import axios from 'axios'
import { useContext, useState } from "react"
import { Store } from '../../component/Store';
import { toast } from "react-toastify"


function PatLogin() {   
    const [email,setEmail]=useState("")    
    const [password,setPassword]=useState("")    
    const {state,dispatch}=useContext(Store)
    const {UserInfo}=state
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
    e.preventDefault()
    const Formdata=new FormData(e.currentTarget)
    const actualData={
      email:Formdata.get("email"),
      password:Formdata.get("password"),
    }
    try {
      const {data}=await axios.post("http://localhost:4000/authPat",actualData)
      dispatch({
        type:"USER_SIGIN",payload:data
      })
      localStorage.setItem("UserInfo",JSON.stringify(data))
      navigate("/patDash")
      toast.success("Patient Logged In")
      window.location.reload()
    } catch (error) {
      toast.error("Email and Password is Invalid")
    }
   }
  return (
    <>
      <Grid  container spacing={4} justifyContent="center" sx={{width:"100",mt:15}}>
          <Box onSubmit={submitHandler}  border={1} borderColor='divider' sx={{p:3}} textAlign='center' component='form' id='signin_form'>
            <h1>Patient Login</h1>
            <TextField margin="normal" variant='filled' label="Email" required id="email" onChange={(e)=> setEmail(e.target.value)} name="email" fullWidth />
            <TextField margin="normal" variant='filled' label="password" required id="password" name="password" onChange={(e)=> setPassword(e.target.value)} type="password" fullWidth />
          <Box sx={{m:3}} textAlign='center'>
            <Button className="mb-3" type="submit" variant="contained" color='warning'>Sign In</Button><br/>
          </Box>
           New User ?<Link to={`/signup`}> Create Your Account</Link><br/>
          </Box>
      </Grid>

    </>
  )
}

export default PatLogin
