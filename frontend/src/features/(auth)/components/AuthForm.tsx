import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Link, useNavigate } from 'react-router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useUserLoginMutation, useUserRegisterMutation } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/slices/authSlice';
import showToast from '@/utils/showToast';
import Cookies from 'js-cookie';
import { useGetAccountInfoMutation } from '@/services/userService';

interface AuthFormProps {
  variant: 'LOGIN' | 'REGISTER';
  role?: string;
  onRegisterSuccess?: (email: string) => void;
}

const AuthForm = ({ variant, role, onRegisterSuccess }: AuthFormProps) => {
  const [userLogin, { isLoading: isLoginLoading }] = useUserLoginMutation();
  const [userRegister, { isLoading: isRegisterLoading }] = useUserRegisterMutation();
  const [getAccountInfo] = useGetAccountInfoMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === 'LOGIN') {
      try {
        const res = await userLogin({
          email: data.email,
          password: data.password,
        }).unwrap();

        if (res?.success === true) {
          Cookies.set('token', res.token);

          const resAccountInfo = await getAccountInfo({}).unwrap();

          if (resAccountInfo?.success === true) {
            dispatch(setCredentials(resAccountInfo?.user));
            showToast('Đăng nhập thành công');
            navigate('/');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (variant === 'REGISTER') {
      try {
        const res = await userRegister({
          name: data.name,
          email: data.email,
          password: data.password,
          address: 'Hanoi',
          role: role,
        }).unwrap();
        if (res?.success === true) {
          if (onRegisterSuccess) {
            onRegisterSuccess(data.email);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-lg"
    >
      <Card
        className="
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10"
      >
        <CardHeader>
          <CardTitle>{variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === 'REGISTER' && (
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  disabled={isRegisterLoading}
                  {...register('name', {
                    required: 'Name is required',
                    validate: (value) => {
                      if (value.length < 5) {
                        return 'Name must be at least 5 characters';
                      }
                    },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                disabled={isLoginLoading || isRegisterLoading}
                {...register('email', { required: 'Vui lòng nhập email' })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>

              {variant === 'REGISTER' ? (
                <Input
                  type="password"
                  disabled={isLoginLoading || isRegisterLoading}
                  {...register('password', {
                    required: 'Password is required',
                    validate: (value) => {
                      if (value.length < 5) {
                        return 'Password must be at least 5 characters';
                      }
                    },
                  })}
                />
              ) : (
                <Input
                  type="password"
                  disabled={isLoginLoading || isRegisterLoading}
                  {...register('password', {
                    required: 'Vui lòng nhập mật khẩu',
                  })}
                />
              )}

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoginLoading || isRegisterLoading}>
              {variant === 'LOGIN' ? 'Sign in' : 'Sign up'}
            </Button>

            <div className="mt-4 flex justify-center gap-1 text-sm">
              <div>{variant === 'LOGIN' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}</div>
              <Link
                to={variant === 'LOGIN' ? '/sign-up' : '/sign-in'}
                className="underline cursor-pointer underline-offset-4"
              >
                {variant === 'LOGIN' ? 'Đăng nhập' : 'Đăng ký'}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
