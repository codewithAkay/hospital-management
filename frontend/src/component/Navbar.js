import React, { useContext, useState } from 'react'
import {AppBar,Button,Tab,Tabs,Toolbar,Typography,useMediaQuery,useTheme} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import DrawerCom from './Drawer'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import { Store } from './Store';

function Navbar() {
  const {state}=useContext(Store)
  const {UserInfo}=state
  const [value,setValue]=useState(0)
  const theme=useTheme()
  const isMatch=useMediaQuery(theme.breakpoints.down('md'))
  const navigate=useNavigate()
  return (
    <>
      <AppBar position='fixed' sx={{background:"#063970"}}>
        <Toolbar>
             {isMatch ? (
              <>
              <DrawerCom/>
              </>
             ):
             (
              <>
             <Tabs sx={{marginLeft:'auto'}} textColor='inherit' value={value} onChange={(e,value)=> setValue(value)}>
              {UserInfo && UserInfo.isPatient ?<Tab icon={<HomeOutlinedIcon/>} label='Dashboard' component={Link} to='/patDash'/>
              :
              null
            }
              {UserInfo && UserInfo.isDoctor ?<Tab icon={<HomeOutlinedIcon/>} label='Dashboard' component={Link} to='/docDash'/>
              :
                null
}
              {UserInfo && UserInfo.isAdmin ?<Tab icon={<HomeOutlinedIcon/>} label='Dashboard' component={Link} to='/admDash'/>
              :null
            }
            {UserInfo===null ? <Tab icon={<LanOutlinedIcon/>} label='Login' component={Link} to='/login'/>
            :null
            }
             </Tabs>
              </>
             )}    
        </Toolbar>
      </AppBar>
          
    </>
  )
}

export default Navbar
