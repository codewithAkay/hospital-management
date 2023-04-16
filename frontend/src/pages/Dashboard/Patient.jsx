import React, { useContext, useEffect, useReducer, useState } from "react";
import {
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
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, Person } from "@material-ui/icons";
import { Box, Button } from "@mui/material";
import Appointment from '../Apponitment'
import { useNavigate } from "react-router-dom";
import { Store } from "../../component/Store";
import axios from "axios";

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
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
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
  useEffect(()=>{
    const patientID={patient_id:UserInfo.id}
   const fetchData=async()=>{
    dispatch({type:"FETCH_REQUEST"})
    try {
      const result=await axios.post('http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/fetchAppointmentPat',patientID)
      dispatch({type:"FETCH_SUCCESS",payload:result.data})
    } catch (error) {
      dispatch({type:"FETCH_FAILURE",payload:error.message})
    }
   }
   const qrcode= async (req, res) => {
    try {
          // Make a GET request to the API URL
          const response = await axios.post('https://raq06bxfrk.execute-api.eu-west-1.amazonaws.com/apiqrcode',{data:"Comment"});
          console.log(response)
          // Insert the response data into the database using Sequelize
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }
      qrcode()
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
            <ListItemText primary="Patient Name" secondary={UserInfo.name} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Patient Email" secondary={UserInfo.email} />
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
        <Box sx={{textAlign:'center',mb:5}}>
      <Button variant="contained" onClick={handleOpen} color="warning">Add Appointment</Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        {<Appointment  onClose={handleClose}/>}
      </Modal>  
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
