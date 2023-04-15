import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Apponitment from './pages/Apponitment';
import Navbar from './component/Navbar';
import SignUp from './pages/SignUp';
import Choice from './pages/Choice';
import DocLogin from './pages/Login/DocLogin';
import PatLogin from './pages/Login/PatLogin';
import AdmLogin from './pages/Login/AdmLogin';
import Patient from './pages/Dashboard/Patient';
import Doctor from './pages/Dashboard/Doctor';
import Admin from './pages/Dashboard/Admin';
import PatProtected from './component/PatProtected';
import DocProtected from './component/DocProtected';
import AdmProtected from './component/AdmProtected';
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <>
   <BrowserRouter>
   <header >
   <ToastContainer  
   position='top-center'
   autoClose={5000}
   hideProgressBar={false}
   newestOnTop={false}
   rtl={false}
   pauseOnFocusLoss
   draggable
   limit={1}
   pauseOnHover
   />
   <Navbar/>
   </header>
    <main style={{marginTop:'80px'}}>
   <Routes>
    {/* Login Api  */}
    <Route path='/' element={<Choice/>}/>
    <Route path='/login' element={<Choice/>}/>
    <Route path='/Doclogin' element={<DocLogin/>}/>
    <Route path='/Patlogin' element={<PatLogin/>}/>
    <Route path='/Admlogin' element={<AdmLogin/>}/>

    {/* SignUp */}
    <Route path='/signup' element={<SignUp/>}/>

    {/* DashBoard  */}
    <Route path='/patDash' element={<PatProtected><Patient/></PatProtected>}/>
    <Route path='/docDash' element={<DocProtected><Doctor/></DocProtected>}/>
    <Route path='/admDash' element={<AdmProtected><Admin/></AdmProtected>}/>
   </Routes>
  </main>
   </BrowserRouter>
   </>
  );
}

export default App;
