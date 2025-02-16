import { useState } from 'react';
import { useNavigate } from 'react-router';
import Logo from '@/components/Logo';
import AuthForm from '@/features/(auth)/components/AuthForm';
import RoleCard from '@/features/(auth)/components/RoleCard';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';

const SignUp = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleClick = (selectedRole: 'job_seeker' | 'employer') => {
    setRole(selectedRole);
  };

  const handleRegisterSuccess = (email: string) => {
    navigate('/verify-email', { state: { email } });
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      {role ? (
        <>
          <Logo />
          <Button className="mt-2 absolute left-20 top-16" onClick={() => setRole('')}>
            <MoveLeft />
            Chọn lại chức vụ
          </Button>
          <AuthForm variant="REGISTER" role={role} onRegisterSuccess={handleRegisterSuccess} />
        </>
      ) : (
        <div className="flex justify-center space-x-8">
          <RoleCard value="job_seeker" displayName="Người tìm việc" handleClick={handleRoleClick} />
          <RoleCard value="employer" displayName="Nhà tuyển dụng" handleClick={handleRoleClick} />
        </div>
      )}
    </div>
  );
};

export default SignUp;
