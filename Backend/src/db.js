import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jonnathanmonroybd:VUTPyoPwzGJmNf4f@cluster0.j8kwwty.mongodb.net/?retryWrites=true&w=majority');
        console.log("MongoDB is connected");
    } catch (error) {
        console.error(error);
    }
};