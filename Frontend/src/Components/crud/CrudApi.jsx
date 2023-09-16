//!: jonnathan.monroy741@gmail.com

//  importamos las librerias y componentes necesarios
import React, { useEffect, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp.js";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

// generamos el componente llamado crudApi
const CrudApi = () => {

    // nuestras variables de estado:
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp(); //*usando el helper helpHTTP()
    let url = "http://localhost:5000/citaDoctor";  ////Este es el endPoint la url donde esta alojada la api
    // para que esto funcione tiene que estar levantado el servidor de json.server como el servidor de create reat app

    // TRAEMOS LOS DATOS DEL API USANDO FETCH Y EL METODO GET:
    useEffect(() => {
        setLoading(true);
        helpHttp()
            .get(url)
            .then((res) => { // como helpHttp.js retorna promesas podemos usar then
                //console.log(res);
                if (!res.err) {
                    setDb(res);
                    setError(null);
                } else {
                    setDb(null);
                    setError(res);
                }
                setLoading(false);
            });
    }, [url]);


    // GENERAMOS LOS DATOS NUEVOS CON FETCH POST Y LOS INSERTAMOS EN LA DB
    const createData = (data) => {
        data.id = Date.now(); // Generamos un id usando la funcion date que se renueva constantemente
        //console.log(data);

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.post(url, options).then((res) => {
            //console.log(res);
            if (!res.err) {
                setDb([...db, res]); // Uso  destructuracion para reescribir el objetoDB y actualizar la variable de estado
            } else {
                setError(res);
            }
        });
    };


    // USO FETCH  CON EL METODO PUT PARA ACTUALIZAR LOS DATOS
    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`;
        //console.log(endpoint);

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.put(endpoint, options).then((res) => {
            //console.log(res);
            if (!res.err) {
                let newData = db.map((el) => (el.id === data.id ? data : el));
                setDb(newData);
            } else {
                setError(res);
            }
        });
    };

    // USE FECH Y EL METODO  DEL PARA ELIMINAR LOS DATOS
    const deleteData = (id) => {
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro con el id '${id}'?`
        );  // validacion para estar seguros de eliminar los datos.

        if (isDelete) {
            let endpoint = `${url}/${id}`;
            let options = {
                headers: { "content-type": "application/json" },
            };

            api.del(endpoint, options).then((res) => {
                //console.log(res);
                if (!res.err) {
                    let newData = db.filter((el) => el.id !== id);  // usamos un método de filtrado para eliminar el dato
                    setDb(newData);  // se actualiza la variable de estado del objeto Db
                } else {
                    setError(res);
                }
            });
        } else {
            return;
        }
    };
    //  RENDERIZDO DE LOS COMPONENTES DEL FORM Y LOS COMPONENTES DE LA TABLA
    return (
        <div>
            <h2>Editar citas</h2>
            <article className="grid-1-2">
                <CrudForm
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />
                {loading && <Loader />}
                {error && (
                    <Message
                        msg={`Error ${error.status}: ${error.statusText}`}
                        bgColor="#dc3545"
                    />
                )}
                {db && (
                    <CrudTable
                        data={db}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                    />
                )}
            </article>
        </div>
    );
};

export default CrudApi;
