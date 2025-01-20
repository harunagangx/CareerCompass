import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import connectToDb from '@/config/database';
import authRoute from '@/routes/authRoute';
import userRoute from '@/routes/userRoute';
import categoryRoute from '@/routes/categoryRoute';
import jobRoute from '@/routes/jobRoute';
import applicationRoute from '@/routes/applicationRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(morgan('dev'));

connectToDb();

app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', jobRoute);
app.use('/api/v1', applicationRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
