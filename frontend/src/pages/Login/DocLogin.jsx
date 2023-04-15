import {  Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import {   useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"


function DocLogin() {  
    const navigate=useNavigate()
    const submitHandler=async(e)=>{
    e.preventDefault()
    const Formdata=new FormData(e.currentTarget)
    const actualData={
      email:Formdata.get("email"),
      password:Formdata.get("password"),
    }
    try {
      const {data}=await axios.post("http://localhost:4000/authDoc",actualData)
      localStorage.setItem("UserInfo",JSON.stringify(data))
      navigate("/docDash")
      window.location.reload()

    } catch (error) {
      toast.error("Email and Password is Invalid")
    }
   }
  return (
    <>
      <Grid  container spacing={4} justifyContent="center" sx={{width:"100",mt:15}}>
          <Box onSubmit={submitHandler}  border={1} borderColor='divider' sx={{p:3}} textAlign='center' component='form' id='signin_form'>
            <h1>Doctor Login</h1>
            <TextField margin="normal" variant='filled' label="Email" required id="email"  name="email" fullWidth />
            <TextField margin="normal" variant='filled' label="password" required id="password" name="password"  type="password" fullWidth />
          <Box sx={{m:3}} textAlign='center'>
            <Button className="mb-3" type="submit" variant="contained" color='warning'>Sign In</Button><br/>
          </Box>
          </Box>
      </Grid>

    </>
  )
}

export default DocLogin
