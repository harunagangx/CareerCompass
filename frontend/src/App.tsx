import { Routes, Route } from 'react-router';
import AuthLayout from '@/layouts/AuthLayout';
import ClientsLayout from '@/layouts/ClientsLayout';
import SignIn from '@/features/(auth)/pages/SignIn';
import SignUp from '@/features/(auth)/pages/SignUp';
import Home from '@/features/(jobSeeker)/pages/Home';
import VerifyEmail from '@/features/(auth)/pages/VerifyEmail';
import ResumeDashboard from '@/features/(resume)/pages/ResumeDashboard';
import Jobs from '@/features/(jobSeeker)/pages/Jobs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>

      <Route path="/" element={<ClientsLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="resume-dashboard" element={<ResumeDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
