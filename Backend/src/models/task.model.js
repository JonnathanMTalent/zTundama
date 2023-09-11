import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
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

export default mongoose.model("Task", taskSchema);