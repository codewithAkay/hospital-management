import React, { useContext, useState } from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { Store } from './Store'

function DrawerCom() {
  const {state,dispatch}=useContext(Store)
  const {UserInfo}=state
  const [openDrawer,setopenDrawer]=useState(false)
  const PAGES=[]
  UserInfo.isPatient ? PAGES=[{name:"Login",link:'/login'},{name:'DashBoard',link:'/patDash'}]:PAGES=[{name:"Login",link:'/login'}]
  UserInfo.isDoctor ? PAGES=[{name:"Login",link:'/login'},{name:'DashBoard',link:'/docDash'}]:PAGES=[{name:"Login",link:'/login'}]
  UserInfo.isAdmin ? PAGES=[{name:"Login",link:'/login'},{name:'DashBoard',link:'/admDash'}]:PAGES=[{name:"Login",link:'/login'}]
  return (
    <>
      <Drawer open={openDrawer}
      onClose={()=>setopenDrawer(false)}
      >
        {
            PAGES.map((page,index)=>(
          <List key={index} sx={{background:'#063970'}}>
            <ListItemButton component={Link} to={page.link}>
                <ListItemIcon>
                    <ListItemText sx={{color:'white'}}>
                        {page.name}
                    </ListItemText>
                </ListItemIcon>
            </ListItemButton>
          </List>
            ))
        }
      </Drawer>
          <IconButton sx={{marginLeft:'auto'}} onClick={()=> setopenDrawer(!openDrawer)}>
          <MenuIcon/>
          </IconButton>
    </>
  )
}

export default DrawerCom
