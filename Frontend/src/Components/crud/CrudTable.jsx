import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../styles/crutTable.css"
const CrudTable = ({ data, setDataToEdit, deleteData }) => {
    return (
        <div >
            <h3>Tabla de Datos</h3>
            <table >
                <thead className="thead">
                    <tr>
                        <th className="th">Médico</th>
                        <th className="th">Horario</th>
                        <th className="th">Acciones</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {data.length > 0 ? (
                        data.map((el) => (
                            <CrudTableRow
                                key={el.id}
                                el={el}
                                setDataToEdit={setDataToEdit}
                                deleteData={deleteData}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sin datos</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CrudTable;
