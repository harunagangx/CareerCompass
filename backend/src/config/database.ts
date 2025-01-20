import mongoose from 'mongoose';

const connectToDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL as string)
    .then(() => {
      console.log('connected to database...');
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};

export default connectToDb;
