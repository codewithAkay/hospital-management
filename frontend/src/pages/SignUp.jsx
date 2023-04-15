import {  Alert, Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import {  useNavigate } from "react-router-dom"
import axios from 'axios'
import { Store } from '../component/Store';
import { useContext,useState } from "react";
import { toast } from "react-toastify";


export default function SignUp() {
    const [error,setError]=useState({
        status:false,
        msg:"",
        type:""
    })
    const navigate=useNavigate()
    const {state,dispatch}=useContext(Store)
    const {UserInfo}=state
    const signuphandler=async(e)=>{
    e.preventDefault()
const Fdata=new FormData(e.currentTarget)
const actualData={
    name:Fdata.get('name'),
    email:Fdata.get('email'),
    password:Fdata.get('password'),
    confirmPassword:Fdata.get('confirmpassword'),
}
try {
    const {data}=await axios.post("http://localhost:4000/patSignUp",actualData)
    dispatch({
        type:"USER_SIGNUP",payload:data
    })
    localStorage.setItem("UserInfo",JSON.stringify(data))
    toast.success("Registered SuccessFully")
    navigate('/')
} catch (error) {
    setError({status:true,msg:error.message,type:'error'})
  }
 }
  return (
    <>
     
      <Grid container justifyContent='center' >
        <Box padding={3} border={1} borderColor='divider' textAlign='center' maxWidth='650px' onSubmit={signuphandler} component="form" id='signup-form'>
            <h1>Registration Form</h1>
           <TextField variant="filled" label='Name' margin='normal' fullWidth id='name' required name='name'/>
           <TextField variant="filled" label='Email' margin='normal' fullWidth id='email' required name='email'/>
           <TextField variant="filled" label='Password' margin='normal' fullWidth id='password' required name='password'type='password'/>
           <TextField variant="filled" label='ConfirmPassword' margin='normal' fullWidth id='confirmpassword' required name='confirmpassword' type='password'/>
           <Box textAlign='center' sx={{m:3}}>
            <Button color='warning' type='submit' variant='contained'>SignUp</Button>
           </Box>
           {error.status?<Alert severity={error.type}>{error.msg}</Alert>:" "}
        </Box>
      </Grid>
    </>
  )
}
