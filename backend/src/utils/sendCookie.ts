import { HttpStatusCode } from '@/constants/httpCodeStatus';
import { iUser } from '@/types/index';
import { Response } from 'express';

const sendCookie = (
  user: iUser,
  statusCode: HttpStatusCode,
  res: Response
) => {
  const token = user.generateToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE as any) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).send({
    success: true,
    token,
    user,
  });
};

export default sendCookie;
