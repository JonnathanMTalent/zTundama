import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {

        apellidos: {
            type: String,
            required: true,
            trim: true,
        },
        cedula: {
            type: String,
            required: true,
            trim: true,
        },
        celular: {
            type: String,
            required: true,
            trim: true,
        },
        citas: {
            type: Array,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        fecha: {
            type: Date,
            required: true,
            trim: true,
        },
        nombres: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);



