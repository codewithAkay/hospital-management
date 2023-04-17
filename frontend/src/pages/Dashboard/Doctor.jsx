import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, Person } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Store } from "../../component/Store";
import axios from "axios";
import { toast } from "react-toastify";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const reducer=(state,action)=>{
  switch(action.type){
    case "FETCH_REQUEST":
      return {...state,loading:true}
    case "FETCH_SUCCESS":
      return {...state,loading:false,product:action.payload}
    case "FETCH_FAILURE":
      return{...state,loading:false,product:action.payload}  
    default :
    return " "  
  }
  }
  
  
  const initialtState={
    product:[],
    loading:true,
    error:''
  }
  
const Dashboard = () => {
  const {state}=useContext(Store)
  const {UserInfo}=state
  const [{loading,error,product},dispatch]=useReducer(reducer,initialtState)
  console.log(UserInfo)
  const navigate=useNavigate()
  const classes = useStyles();

  const handleLogout = () => {
    // handle logout logic
    localStorage.removeItem("UserInfo")
    navigate('/login')
    window.location.reload()
  };
  
  const handleApproved=async(id)=>{
    const Patid={id:id}
    try {
      const data=await axios.post("http://localhost:4000/approved",Patid)
      window.location.reload()
      toast.success("Approved Patient Request")
    } catch (error) {
      toast.error(error.message)
    }

  }
  const handleCross=async(id)=>{
    const Patid={id:id}
    try {
      const data=await axios.post("http://localhost:000/cancel",Patid)
      window.location.reload()
      toast.success("Approved Patient Request")
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=>{
   const fetchData=async()=>{
    dispatch({type:"FETCH_REQUEST"})
    try {
      const result=await axios.get('http://localhost:4000/fetchAppointment')
      dispatch({type:"FETCH_SUCCESS",payload:result.data})
    } catch (error) {
      dispatch({type:"FETCH_FAILURE",payload:error.message})
    }
   }
   fetchData()
  },[])
  return (
    <div className={classes.root}>
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Doctor"/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Doctor Email" secondary={UserInfo.email} />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Email</TableCell>
                <TableCell> Phone</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Appointment Time</TableCell>
                <TableCell>Appointment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {product.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.email}</TableCell>
                  <TableCell>{prod.phone}</TableCell>
                  <TableCell>{prod.reason}</TableCell>
                  <TableCell>{prod.date}</TableCell>
                  <TableCell>{prod.time}</TableCell>
                  <TableCell> {prod.status === 'pending' ?
  (
    <div>
      <button onClick={()=>{
        handleApproved(prod.id)
      }} style={{backgroundColor:'#19ec67'}}>✔</button>
      <button onClick={()=>{
        handleCross(prod.id)
      }} style={{backgroundColor:'red', marginLeft:'30px'}}>⨉</button>
    </div>
  ) :
  prod.status
}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Dashboard;
