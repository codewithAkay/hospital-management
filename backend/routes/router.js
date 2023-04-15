const express=require('express')
const controller = require('../controller/controller')

const router=express.Router()

router.get('/getData',(req,res)=>{
    res.send("Hey")
})
//should remove
router.get('/addAdmin',controller.createAdmin)

//Admin Routes
router.post('/authAdmin',controller.authAdmin)

router.get('/fetchAll',controller.fetchAll)

router.get('/fetchPat',controller.fetchPat)
router.post('/removePat',controller.removePat)

router.post('/removeDoc',controller.removeDoc)

router.get('/fetchDoc',controller.fetchDoc)

router.post('/addDoc',controller.addDoc)

//Doctor
router.post('/authDoc',controller.authDoctor)
router.post('/approved',controller.approved)
router.post('/cancel',controller.cancel)


//should remove

//Patient Routes
router.post('/patSignUp',controller.signUp)
router.post('/authPat',controller.authPatient)


//Appointment

router.post('/appointment',controller.appointment)

//Fetch Appointment Data
router.get('/fetchAppointment',controller.fetchAppointment)

router.post('/fetchAppointmentPat',controller.fetchAppointmentPat)

router.get('/qrcode', async (req, res) => {
try {
      // Make a GET request to the API URL
      const response = await axios.get('https://raq06bxfrk.execute-api.eu-west-1.amazonaws.com/apiqrcode');
      console.log(response)
      // Insert the response data into the database using Sequelize
      const data = response.data;
      const qrCode = await sequelize.models.QrCode.create({
        code: data.code,
        url: data.url,
        image: data.image
      });
  
      res.send(qrCode);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  
  


module.exports=router