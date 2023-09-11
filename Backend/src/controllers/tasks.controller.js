import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate("user"); // aqui es donde usamos el id del usuario AUTENTICADO para traer solo sus tareas, El .populate trae la info del usuario tambien
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id, // aqui estamos guardando el id del usuario para poder relacionarlo con sus respectiva tarea.
        });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask)
            return res.status(404).json({ message: "Tarea no encontrada" });
        // res.json(deletedTask);  Esto mostraria la tarea que fue borrada.
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const updateTask = async (req, res) => {
//     const task = await Task.findOneAndUpdate(
//         req.params.id,
//         req.body,
//         { new: true, }
//     );
//     if (!task) return res.status(404).json({ message: "task not found" });
// };
export const updateTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const taskUpdated = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { title, description, date },
            { new: true }
        );
        return res.json(taskUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // .populate('user'); para traer en cada tarea los datos del usuario.
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};