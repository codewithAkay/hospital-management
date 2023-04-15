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

const Appointment= ({onClose}) => {
  const {state}=useContext(Store)
  const {UserInfo}=state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const handleClose = () => {
    onClose() 
  };

  const handleSave =async(e) => {
    // handle save logic here
    e.preventDefault()
    const actualData={
    name:name,
    email:email,
    phone:phone,
    date:date,
    time:time,
    reason:reason,
    patient_id:UserInfo.id
  }
  try {
    const {data} = await axios.post('http://localhost:4000/appointment',actualData)
    toast.success("Appointment added")
    handleClose();
  } catch (error) {
    toast.error("Required All Fields")
  }
};
  return (
    <div style={{padding:50, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, backgroundColor: "#F1F1F1", boxShadow: 24, p: 4 }}>
          <h2>Book an Appointment</h2>
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
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="time-select-label">Time</InputLabel>
              <Select
                labelId="time-select-label"
                id="time-select"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <MenuItem value="9:00am">9:00</MenuItem>
                <MenuItem value="9:30am">9:30</MenuItem>
                <MenuItem value="10:00am">10:00</MenuItem>
                <MenuItem value="10:30am">10:30</MenuItem>
                <MenuItem value="11:00am">11:00</MenuItem>
                <MenuItem value="11:30am">11:30</MenuItem>
                <MenuItem value="12:00am">12:00</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Reason for visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
              Book Appointment
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </form>
        </div>
  );
};

export default Appointment
