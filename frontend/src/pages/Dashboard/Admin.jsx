import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
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
import {toast} from 'react-toastify'
import AddDoctor from "../AddDoctor";


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

    case "FETCH_DOCTOR":
      return {...state,loading:true}
    case "SUCCESS_DOCTOR":
      return {...state,loading:false,doctor:action.payload}
    case "FAILURE_DOCTOR":
      return{...state,loading:false,doctor:action.payload}  

    case "FETCH_PATIENT":
      return {...state,loading:true}
    case "SUCCESS_PATIENT":
      return {...state,loading:false,patient:action.payload}
    case "FAILURE_PATIENT":
      return{...state,loading:false,patient:action.payload}  
    default :
    return " "  
  }
  }
  
  
  const initialtState={
    product:[],
    doctor:[],
    patient:[],
    loading:true,
    error:''
  }

const Dashboard = () => {
  const {state}=useContext(Store)
  const {UserInfo}=state
  const [open,setOpen]=useState(false)
  const [{loading,error,product,doctor,patient},dispatch]=useReducer(reducer,initialtState)
  console.log(UserInfo)
  const navigate=useNavigate()
  const classes = useStyles();

  const handleLogout = () => {
    // handle logout logic
    localStorage.removeItem("UserInfo")
    navigate('/login')
    window.location.reload()
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload()
  };
  const handleDelete=async(id)=>{
    const patient={id:id}
    try {
      const data=await axios.post("http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/removeDoc",patient)
      toast.success("Deleted SuccessFully")
      window.location.reload()
     } catch (error) {
      toast.error(error.message)
     }
  }
  const handleDeletePat=async(id)=>{
    const patient={id:id}
    try {
      const data=await axios.post("http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/removePat",patient)
      toast.success("Deleted SuccessFully")
      window.location.reload()
     } catch (error) {
      toast.error(error.message)
     }
  }
  
  useEffect(()=>{
   const fetchData=async()=>{
    dispatch({type:"FETCH_REQUEST"})
    try {
      const result=await axios.get('http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/fetchAll')
      dispatch({type:"FETCH_SUCCESS",payload:result.data})
    } catch (error) {
      dispatch({type:"FETCH_FAILURE",payload:error.message})
    }
   }
   const fetchDoctor=async()=>{
    dispatch({type:"FETCH_DOCTOR"})
    try {
      const result=await axios.get('http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/fetchDoc')
      dispatch({type:"SUCCESS_DOCTOR",payload:result.data})
    } catch (error) {
      dispatch({type:"FAILURE_DOCTOR",payload:error.message})
    }
   }
   const fetchPatient=async()=>{
    dispatch({type:"FETCH_PATIENT"})
    try {
      const result=await axios.get('http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/fetchPat')
      dispatch({type:"SUCCESS_PATIENT",payload:result.data})
    } catch (error) {
      dispatch({type:"FAILURE_PATIENT",payload:error.message})
    }
   }
   fetchData()
   fetchDoctor()
   fetchPatient()
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
            <ListItemText primary="Admin" secondary="Root"/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Admin Email" secondary={UserInfo.email} />
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
        <div style={{textAlign:"center"}}>
        <h1>Doctors Detail</h1>
        </div>
        <Button onClick={handleOpen} variant="contained" color="primary">ADD DOCTOR</Button>
        <Modal open={open} onClose={handleClose}>
        {<AddDoctor  onClose={handleClose}/>}
      </Modal>  
        <TableContainer style={{marginTop:"50px",marginBottom:"70px"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Email</TableCell>             
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctor.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.email}</TableCell>
                  <TableCell><button onClick={()=>{
                    handleDelete(prod.id)
                  }} style={{backgroundColor:"red"}}>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <h1 style={{textAlign:"center"}}>Patient Detail</h1>
        <TableContainer style={{marginTop:"50px",marginBottom:"70px"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell> Name </TableCell>
                <TableCell> Email</TableCell>          
                <TableCell></TableCell>          
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>{prod.id}</TableCell>
                  <TableCell>{prod.name}</TableCell>
                  <TableCell>{prod.email}</TableCell>
                  <TableCell><button onClick={()=>{
                    handleDeletePat(prod.id)
                  }} style={{backgroundColor:"red"}}>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h1 style={{textAlign:"center"}}>Appointment Schedule</h1>

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
                  <TableCell>{prod.status}</TableCell>
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
