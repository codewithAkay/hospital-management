import { Box, Button, Grid, TextField } from "@mui/material"
import { Link } from "react-router-dom"

function Choice() {
  return (
    <>
      <Grid  container spacing={4} justifyContent="center" sx={{width:"100",mt:25}}>
          <Box  border={1} borderColor='divider' sx={{p:3}} textAlign='center' component='form' id='signin_form'>
            <h1 style={{fontSize:'50px'}}>AppointMe: Doctor Appointment <br /> Scheduling Application</h1>
            <h1>You Belong To</h1>
            <Link to='/Patlogin'>
            <Button sx={{marginY:'10px' ,width:'100%'}} type="submit" variant="contained" color='warning'>Patient</Button><br/>
            </Link>
            <Link to='/Doclogin'>
            <Button sx={{marginY:'10px',width:'100%'}} type="submit" variant="contained" color='warning'>Doctor</Button><br/>
            </Link>
            <Link to='/Admlogin'>
            <Button sx={{marginY:'10px',width:'100%'}} type="submit" variant="contained" color='warning'>Admin</Button><br/>
            </Link>
          </Box>
      </Grid>
    </>
  )
}

export default Choice
