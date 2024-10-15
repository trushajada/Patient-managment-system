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
import PrescriptionAccess from './components/PrescriptionAccess/PrescriptionAccess';
import Accessdownload from './components/PrescriptionAccess/Accessdownload';
import Chat from './components/Chats/Chat';
import UnpaidBill from './components/Bills/UnpaidBill';
import BillRecipt from './components/Bills/BillRecipt';
import Paytype from './components/Bills/Paytype';
import PayMethod from './components/Bills/PayMethod';
import PayementDetail from './components/Bills/PayementDetail';
import Payment from './components/Bills/Payment';
import PaidBill from './components/Bills/PaidBill';
import AppoinmentManagment from './components/DoctorPannal/AppoinmentManagment';
import PatientRecordAccess from './components/DoctorPannal/PatientRecordAccess/PatientRecordAccess';
import PatientRecordView from './components/DoctorPannal/PatientRecordAccess/PatientRecordView';
import AddRecoard from './components/DoctorPannal/PatientRecordAccess/AddRecoard';
import AllFiles from './components/DoctorPannal/PatientRecordAccess/AllFiles';
import RecoardPrescriptionView from './components/DoctorPannal/PatientRecordAccess/RecoardPrescriptionView';

function App() {
  return (
    <Router>
      <Routes>
        {/* patient Dashboard Routes  */}
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
        <Route path='/records' element={<PrescriptionAccess/>}></Route>
        <Route path='/Accessdownload' element={<Accessdownload/>}></Route>
        <Route path='/chats' element={<Chat/>}></Route>
        <Route path="/bills" element={<UnpaidBill />} />
        <Route path="/billrecipt" element={<BillRecipt />} />
        <Route path='/paytype' element={<Paytype/>}></Route>
        <Route path='/payment-method' element={<PayMethod/>}></Route>
        <Route path='/payment-detail' element={<PayementDetail/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path="/paidbill" element={<PaidBill />} />


        {/* Doctoer Dashboard Routes  */}

        <Route path='/doctorDashboard' element={<AppoinmentManagment/>}></Route>
        <Route path='/patientRecord' element={<PatientRecordAccess/>}></Route>
        <Route path='/patientRecordView' element={<PatientRecordView/>}></Route>
        <Route path='/add-record' element={<AddRecoard/>}></Route>
        <Route path='/all-files' element={<AllFiles/>}></Route>
        <Route path='/RecordPrescription' element={<RecoardPrescriptionView/>}></Route>
        
        </Routes>
    </Router>
  );
}

export default App;
