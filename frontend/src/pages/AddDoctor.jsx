import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Store } from "../component/Store";
import { toast } from "react-toastify"
import axios from "axios";
import { Box } from "@mui/material";

const AddDoctor= ({onClose}) => {
  const {state}=useContext(Store)
  const {UserInfo}=state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => {
    onClose() 
  };

  const handleSave =async(e) => {
    // handle save logic here
    e.preventDefault()
    const actualData={
    name:name,
    email:email,
    password:password
  }
  try {
    const {data} = await axios.post('http://appointmentproject-env.eba-bksebncg.us-east-1.elasticbeanstalk.com/addDoc',actualData)
    toast.success("Doctor added")
    handleClose();
  } catch (error) {
    toast.error("Required All Fields")
  }
};
  return (
    <div style={{padding:50, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, backgroundColor: "#F1F1F1", boxShadow: 24, p: 4 }}>
          <h2>Add Doctors</h2>
          <form onSubmit={handleSave}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <Box style={{marginTop:"40px"}}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
              Add Doctor
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            </Box>
          </form>
        </div>
  );
};

export default AddDoctor
