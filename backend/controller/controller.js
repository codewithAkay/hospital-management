const db = require("../models/connection")
const bcrypt=require('bcrypt')
const Patient=db.patient
const Admin =db.admin
const Doctor =db.doctor
const Appointment=db.appointment
class controller{

    // Patient Logics 

    static signUp=async(req,res)=>{
        const {name,email,password,confirmPassword}=req.body
        if(name,email,password,confirmPassword){
            
            if(password==confirmPassword)
            {
                const hashPassword=await bcrypt.hash(password,10)
                const user=await Patient.create({
                    name:name,
                    email:email,
                    password:hashPassword
                }) 
                res.status(200).send("Account Created SuccessFully")

            }else{
                res.status(401).send("Passowrd  does not match")
            }
            }else{
            res.status(404).send("Fill all Required Fields")
        }
    }

    static authPatient=async (req, res) => {
        try {
          const { email, password } = req.body;
          
          // Retrieve admin from database
          const patient = await Patient.findOne({ where: { email } });
          // Check if admin exists
          if (!patient) {
            return res.status(404).send({ message: 'User Not Found' });
          }
      
          // Check if password is correct
          const isPasswordValid = await bcrypt.compare(password, patient.password);
      
          if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email and  password' });
          }      
          res.status(200).send(patient);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
    }
    
  

    //Admin Logics  

    static createAdmin=async(req,res)=>{
        const hash=await bcrypt.hash("123454321",10)
        const data =await Admin.create({
            email:'root@gmail.com',
            password:hash
        })
        res.status(200).send("Created Successfully")
    }


    static authAdmin=async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Retrieve admin from database
          const admin = await Admin.findOne({ where: { email } });
          // Check if admin exists
          if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // Check if password is correct
          const isPasswordValid = await bcrypt.compare(password, admin.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid  password' });
          }      
          res.status(200).send(admin);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
    }
     
    static fetchPat=async(req,res)=>{
      const data=await Patient.findAll({})
      res.status(200).send(data)
    }

    static fetchDoc=async(req,res)=>{
      const data =await Doctor.findAll({})
      res.status(200).send(data)
  }
   
  static removePat=async(req,res)=>{
    const {id}=req.body
    const data=await Patient.destroy({where:{id:id}})
    res.status(200).send("Deleted Successfully")
  }
  
  static removeDoc=async(req,res)=>{
    const {id}=req.body
    const data=await Doctor.destroy({where:{id:id}})
    res.status(200).send("Deleted Successfully")
  }

  static addDoc=async(req,res)=>{
    const {name,email,password}=req.body
    if(name && email && password){

      const hash=await bcrypt.hash(password,10)
      const data =await Doctor.create({
        name:name,  
        email:email,
        password:hash
      })
      res.status(200).send("Created Successfully")
    }else{
      res.status(401).send("Required All Fields")
    }
  }
  
  //Dcotor
    static authDoctor=async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Retrieve admin from database
          const doctor = await Doctor.findOne({ where: { email } });
          // Check if admin exists
          if (!doctor) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // Check if password is correct
          const isPasswordValid = await bcrypt.compare(password, doctor.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid  password' });
          }      
          res.status(200).send(doctor);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
    }

   


    static approved=async(req,res)=>{
      const {id}=req.body
      const data=await Appointment.update({status:"Approved"},{where:{id:id}})
      res.status(200).send("Updated SuccessFully")
    }
   
    static cancel=async(req,res)=>{
      const {id}=req.body
      const data=await Appointment.update({status:"Cancel"},{where:{id:id}})
      res.status(200).send("Updated SuccessFully")
    }

    //Appointments 
    static appointment = async (req, res) => {
      const { name, email, phone, date, time, reason, patient_id } = req.body;
      if(name && email && phone && date && time && reason  && patient_id)
      {      
        const data = await Appointment.create({
          name: name,
          email: email,
          phone: phone,
          date: date,
          time: time,
          reason: reason,
          patient_id: patient_id
        });
        res.status(200).send("Appointment Scheduled Successfully. Please wait for a response.");
      }else{
        res.status(401).send("Required All Fields")
      }
      }

      static fetchAll=async(req,res)=>{
         const data=await Appointment.findAll({where:{status:"Approved"}})
         res.status(200).send(data)
      }

      static fetchAppointment=async(req,res)=>{
        const data=await Appointment.findAll({})
        res.status(200).send(data)
      }
      static fetchAppointmentPat=async(req,res)=>{
        const {patient_id}=req.body
        const data=await Appointment.findAll({where:{patient_id:patient_id}})
        res.status(200).send(data)
      }
      
    }


module.exports=controller