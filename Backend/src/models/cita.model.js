import mongoose from "mongoose";

const citaSchema = new mongoose.Schema(
    {
        doctor: {
            type: String,
            required: true,
        },
        hora: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
        },
        user: {
            type: mongoose.Types.ObjectId, // el id en mongodb no  es un string aunque parezca, este id en este caso esta referenciando al modelo de Usuario osea user.model.js
            ref: "User", // esto indica que hace referencia al modelo de usuario osea user.model.js
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Cita", citaSchema);