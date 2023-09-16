import React from "react";
import "../styles/crutTableRow.css"
const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
    let { name, horario, id } = el;

    return (
        <div className="linea">
            <hr className="division" />
            <tr >
                <td className="td">{name}</td>
                <td className="td">{horario}</td>
                <td className="td">
                    <button className="btn btn-outline-dark" onClick={() => setDataToEdit(el)}>Editar</button>
                    <button className="btn btn-outline-dark" onClick={() => deleteData(id)}>Eliminar</button>
                </td>
            </tr>
        </div>
    );
};

export default CrudTableRow;
