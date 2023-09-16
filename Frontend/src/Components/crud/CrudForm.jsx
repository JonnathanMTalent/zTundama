import React, { useState, useEffect } from "react";

const initailForm = {
    name: "",
    horario: "",
    id: null,
};

// aqui estamos destructurando en las propiedades
const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initailForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initailForm);
        }
    }, [dataToEdit]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.horario) { // aqui se esta cambiando directamente la variable de estado, no el formulario, por eso no se usa el .value
            alert("Datos incompletos");
            return; // asi detenemos el resto de la ejecucion si los datos estan incompletos
        }

        if (form.id === null) { // si el id es null es porque queremos generar la informacion, si ya tenia id es para actulizarla.
            createData(form);
        } else {
            updateData(form);
        }

        handleReset(); // luego se limpia el formulario
    };

    const handleReset = (e) => {
        setForm(initailForm);
        setDataToEdit(null);
    };

    return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Médico"
                    onChange={handleChange}
                    value={form.name}
                />
                <input
                    type="text"
                    name="horario"
                    placeholder="Horario"
                    onChange={handleChange}
                    value={form.horario}
                />
                <input className="btn btn-success" type="submit" value="Enviar" />
                <input className="btn btn-outline-info" type="reset" value="Limpiar" onClick={handleReset} />
            </form>

            <button
                className="volver"
                type="button"
                // style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
                onClick={() => window.history.back()}
            >
                Volver
            </button>


        </div>
    );
};

export default CrudForm;
