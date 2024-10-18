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
import PatientRecordAccess from './components/DoctorPannal/PatientRecordAccess/PatientRecordAccess';
import PatientRecordView from './components/DoctorPannal/PatientRecordAccess/PatientRecordView';
import AddRecoard from './components/DoctorPannal/PatientRecordAccess/AddRecoard';
import AllFiles from './components/DoctorPannal/PatientRecordAccess/AllFiles';
import RecoardPrescriptionView from './components/DoctorPannal/PatientRecordAccess/RecoardPrescriptionView';
import ToolsCreate from './components/DoctorPannal/PrescriptionTools/ToolsCreate';
import PatientDocument from './components/DoctorPannal/PrescriptionTools/PatientDocument';
import PatientPrescription from './components/DoctorPannal/PrescriptionTools/PatientPrescription';
import PatientDescription from './components/DoctorPannal/PrescriptionTools/PatientDescription';
import CreatePrescription from './components/DoctorPannal/PrescriptionTools/CreatePrescription';
import ManageTodayPre from './components/DoctorPannal/PrescriptionTools/ManageTodayPre';
import OlderPrescription from './components/DoctorPannal/PrescriptionTools/OlderPrescription';
import AppointmentManagment from './components/DoctorPannal/AppoinmentManager/AppoinmentManagment';
import AppoinmentTimeSloat from './components/DoctorPannal/AppoinmentManager/AppoinmentTimeSloat';
import EditTime from './components/DoctorPannal/AppoinmentManager/EditTime';
import DeleteTime from './components/DoctorPannal/AppoinmentManager/DeleteTime';
import UpcomingAppoinment from './components/DoctorPannal/AppoinmentManager/UpcomingAppoinment';
import PreviousAppoinment from './components/DoctorPannal/AppoinmentManager/PreviousAppoinment';
import CancleAppoinment from './components/DoctorPannal/AppoinmentManager/CancleAppoinment';
import CanclePage from './components/DoctorPannal/AppoinmentManager/CanclePage';
import PaymentManagment from './components/DoctorPannal/AppoinmentManager/PaymentManagment';
import Paymethoddetail from './components/DoctorPannal/AppoinmentManager/Paymethoddetail';
import PaymentSucc from './components/DoctorPannal/AppoinmentManager/AppoinmentSucc';

function App() {
  return (
    <Router>
      <Routes>
        {/* patient Dashboard Routes  */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path='/dashboard' element={<PersonalHealthReacord />}></Route>
        <Route path="/all-Appoinment" element={<AllAppointments />} />
        <Route path='/edit-profile' element={<EditProfile />}></Route>
        <Route path='/prescriptions' element={<Prescriptions />}></Route>
        <Route path="/download" element={<DownloadPage />} />
        <Route path='/report' element={<TestReport />}></Route>
        <Route path='/reportdownload' element={<Reportdownload />}></Route>
        <Route path='/history' element={<MedicalHistory />}></Route>
        <Route path='/documnet' element={<AllDocument />}></Route>
        <Route path='/allprescription' element={<Allprescription />}></Route>
        <Route path='/description' element={<AllDiscription />}></Route>
        <Route path='/records' element={<PrescriptionAccess />}></Route>
        <Route path='/Accessdownload' element={<Accessdownload />}></Route>
        <Route path='/chats' element={<Chat />}></Route>
        <Route path="/bills" element={<UnpaidBill />} />
        <Route path="/billrecipt" element={<BillRecipt />} />
        <Route path='/paytype' element={<Paytype />}></Route>
        <Route path='/payment-method' element={<PayMethod />}></Route>
        <Route path='/payment-detail' element={<PayementDetail />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path="/paidbill" element={<PaidBill />} />


        {/* Doctoer Dashboard Routes  */}

        <Route path='/doctorDashboard' element={<AppointmentManagment/>}></Route>
        <Route path='/patientRecord' element={<PatientRecordAccess />}></Route>
        <Route path='/patientRecordView' element={<PatientRecordView />}></Route>
        <Route path='/add-record' element={<AddRecoard />}></Route>
        <Route path='/all-files' element={<AllFiles />}></Route>
        <Route path='/RecordPrescription' element={<RecoardPrescriptionView />}></Route>
        <Route path='/create' element={<ToolsCreate />}></Route>
        <Route path='/patientdocument' element={<PatientDocument />}></Route>
        <Route path='/patientprescription' element={<PatientPrescription/>}></Route>
        <Route path='/patientdescription' element={<PatientDescription/>}></Route>
        <Route path="/create-prescription" element={<CreatePrescription />} />
        <Route path='/manage' element={<ManageTodayPre/>}></Route>
        <Route path="/older" element={<OlderPrescription />} />
        <Route path='/appointment-time-slot' element={<AppoinmentTimeSloat/>}></Route>
        <Route path='/edit' element={<EditTime/>}></Route>
        <Route path='/deletedtimeslot' element={<DeleteTime/>}></Route>
        <Route path='upcoming' element={<UpcomingAppoinment/>}></Route>
        <Route path='/Previous' element={<PreviousAppoinment/>}></Route>
        <Route path='/cancle' element={<CancleAppoinment/>}></Route>
        <Route path='/CancleAppoinment' element={<CanclePage/>}></Route>
        <Route path='/paymentmethod' element={<PaymentManagment/>}></Route>
        <Route path='/paymethod-detail' element={<Paymethoddetail/>}></Route>
        <Route path='/Apposucssess' element={<PaymentSucc/>}></Route>
        
      </Routes> 
    </Router>
  );
}

export default App;
