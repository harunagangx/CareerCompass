import React from 'react';
import SecureEmailImg from '@/assets/secure-email.png';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router';
import { useVerifyEmailMutation } from '@/services/authService';
import showToast from '@/utils/showToast';

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const navigate = useNavigate();

  const [verifyEmail] = useVerifyEmailMutation();

  const [otp, setOtp] = React.useState('');

  const handleVerify = async () => {
    try {
      const res = await verifyEmail({
        email,
        otp,
      }).unwrap();

      if (res?.success === true) {
        showToast("Xác thực thành công");
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center">
      <div className="border border-gray-200 p-8 rounded-lg flex flex-col items-center justify-center gap-5 max-w-[500px]">
        <h1 className="text-xl">Xin chào, {email}</h1>
        <img src={SecureEmailImg} alt="secure email" className="w-28 h-28" />

        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <p className="text-md text-muted-foreground">
          Vui lòng nhập mã xác thực mà chúng tối đã gửi cho bạn qua email. Mã xác thực có giá trị
          trong 1 phút
        </p>
        <Button className="w-full" onClick={handleVerify} disabled={otp.length < 6}>
          Xác thực
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
