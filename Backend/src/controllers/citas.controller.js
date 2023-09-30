import Cita from "../models/cita.model.js";


export const getCitas = async (req, res) => {
    try {
        const citas = await Cita.find({ user: req.user.id }).populate("user"); // aqui es donde usamos el id del usuario AUTENTICADO para traer solo sus tareas, El .populate trae la info del usuario tambien
        res.json(citas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCita = async (req, res) => {
    try {
        const { doctor, hora, fecha } = req.body;
        const newCita = new Cita({
            doctor,
            hora,
            fecha,
            user: req.user.id, // aqui estamos guardando el id del usuario para poder relacionarlo con sus respectiva tarea.
        });
        await newCita.save();
        res.json(newCita);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteCita = async (req, res) => {
    try {
        const deletedCita = await Cita.findByIdAndDelete(req.params.id);
        if (!deletedCita)
            return res.status(404).json({ message: "Cita no encontrada" });
        // res.json(deletedCita);  Esto mostraria la tarea que fue borrada.
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const updateCita = async (req, res) => {
//     const cita = await Cita.findOneAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true, }
//     );
//     if (!cita) return res.status(404).json({ message: "cita not found" });
// };
export const updateCita = async (req, res) => {
    try {
        const { doctor, hora, fecha } = req.body;
        const citaUpdated = await Cita.findOneAndUpdate(
            { _id: req.params.id },
            { doctor, hora, fecha },
            { new: true }
        );
        return res.json(citaUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCita = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id); // .populate('user'); para traer en cada tarea los datos del usuario.
        if (!cita) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.json(cita);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};