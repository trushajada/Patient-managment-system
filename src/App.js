import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Forgot from './components/Auth/Forgot';
import './App.css'
import PersonalHealthReacord from './components/PatientDashboard/PersonalHealthReacord';
import EditProfile from './components/PatientDashboard/EditProfile';
import Prescriptions from './components/PatientDashboard/prescriptions';
import DownloadPage from './components/PatientDashboard/DownloadPage';
import TestReport from './components/PatientDashboard/TestReport';
import Reportdownload from './components/PatientDashboard/Reportdownload';
import MedicalHistory from './components/PatientDashboard/MedicalHistory';
import AllAppointments from './components/PatientDashboard/AllAppointments';
import AllDocument from './components/PatientDashboard/AllDocument';
import Allprescription from './components/PatientDashboard/Allprescription';
import AllDiscription from './components/PatientDashboard/AllDiscription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot/>} />
        <Route path='/dashboard' element={<PersonalHealthReacord />}></Route>
        <Route path="/all-Appoinment" element={<AllAppointments />} />
        <Route path='/edit-profile' element={<EditProfile />}></Route>
        <Route path='/prescriptions' element={<Prescriptions />}></Route>
        <Route path="/download" element={<DownloadPage />} />
        <Route path='/report' element={<TestReport />}></Route>
        <Route path='/reportdownload' element={<Reportdownload />}></Route>
        <Route path='/history' element={<MedicalHistory />}></Route>
        <Route path='/documnet' element={<AllDocument/>}></Route>
        <Route path='/allprescription' element={<Allprescription/>}></Route>
        <Route path='/description' element={<AllDiscription/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
