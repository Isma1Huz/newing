import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Components/login/LoginForm';
import SignUpForm from './Components/signup/SignUpForm';
import ForgotPasswordForm from './Components/signup/ForgotPasswordForm';
import Landing from './Components/LandingPage/Landing';
import RegistrationForm from './Components/TravelerForm/RegistrationForm';
import TravelForm from './Components/TravelerForm/TravelForm';

function App(){
  return (
    <>
        <Router>
            <Routes>
              <Route path="/" element={<Landing/>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/registration" element={<RegistrationForm/>} />
              <Route path="/travel" element={<TravelForm/>} />
            </Routes>
        </Router>
    </>
  );
}
export default App;
