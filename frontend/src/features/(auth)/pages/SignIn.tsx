import Logo from '@/components/Logo';
import AuthForm from '@/features/(auth)/components/AuthForm';

const SignIn = () => {
  return (
    <div className="min-h-full flex flex-col justify-center items-center">
      <Logo />
      <AuthForm variant="LOGIN" />
    </div>
  );
};

export default SignIn;
