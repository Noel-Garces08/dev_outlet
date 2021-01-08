import monoogse from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await monoogse.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error ${error.message}`);
    }
};

export default connectDB;
