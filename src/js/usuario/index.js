import { Dropdown } from "bootstrap";
import Swal from "sweetalert2";
import Datatable from "datatables.net-bs5";
import { lenguaje  } from "../lenguaje";
import { validarFormulario, Toast, confirmacion } from "../funciones";

const formulario = document.querySelector('form')
const btnBuscar = document.getElementById('btnBuscar');
const btnModificar = document.getElementById('btnModificar');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
//const divTabla = document.getElementById('divTabla');

btnModificar.disabled = true
btnModificar.parentElement.style.display = 'none'
btnCancelar.disabled = true
btnCancelar.parentElement.style.display = 'none'


let contador = 1;
const datatable = new Datatable('#tablaUsuario', {
    language : lenguaje,
    data : null,
    columns: [
        {
            title : 'No.',
            render : () => contador ++
            
        },
        {
            title : 'NOMBRE',
            data: 'usu_nombre'
        },
        {
            title : 'CATALOGO',
            data: 'usu_catalogo',
        },
        {
            title : 'ROL',
            data: 'usu_rol',
        },
        {
            title : 'CONTRASEÑA',
            data: 'usu_password',
        },
        {
            title : 'SITUACION',
            data: 'usu_situacion',
        },
        {
            title : 'MODIFICAR',
            data: 'usu_id',
            searchable : false,
            orderable : false,
            render : (data, type, row, meta) => `<button class="btn btn-warning" data-id='${data}' data-nombre='${row["usu_nombre"]}' data-catalogo='${row["usu_catalogo"]}' data-password='${row["usu_password"]}' data-rol='${row["usu_rol"]}' data-situacion='${row["usu_situacion"]}' >Modificar</button>`
        },
        {
            title : 'DESACTIVAR',
            data: 'usu_id',
            searchable : false,
            orderable : false,
            render : (data, type, row, meta) => `<button class="btn btn-danger" data-id='${data}' >DESACTIVAR</button>`
        },
        
    ]
})

const buscar = async () => {

    let usu_nombre = formulario.usu_nombre.value;
    let usu_catalogo = formulario.usu_catalogo.value;
    const url = `/parcial_ramirez/API/usuario/buscar?usu_nombre=${usu_nombre}&usu_catalogo=${usu_catalogo}`;
    // const url = `/parcial_ramirez/API/usuario/buscar`;
    
    const config = {
        method : 'GET'
    }

    try {
        const respuesta = await fetch(url, config)
        const data = await respuesta.json();

        console.log(data);
        datatable.clear().draw()
        if(data){
            contador = 1;
            datatable.rows.add(data).draw();
            
        }else{
            Toast.fire({
                title : 'No se encontraron registros',
                icon : 'info'
            })
        }
       
    } catch (error) {
        console.log(error);
    }
}
const guardar = async (evento) => {
    evento.preventDefault();
    if (!validarFormulario(formulario, ['usu_id'])) {
        Toast.fire({
            icon: 'info',
            text: 'Debe llenar todos los datos'
        });
        return;
    }

    const body = new FormData(formulario);
    body.delete('usu_id');
    const url = '/parcial_ramirez/API/usuario/guardar';
    const headers = new Headers();
    headers.append("X-Requested-With", "fetch");
    const config = {
        method: 'POST',
        body
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();

        const { codigo, mensaje, detalle } = data;
        let icon = 'info';
        switch (codigo) {
            case 1:
                formulario.reset();
                icon = 'success', 
                        'mensaje';
                buscar();
                break;

            case 0:
                icon = 'error';
                console.log(detalle);
                break;

            default:
                break;
        }
        Toast.fire({
            icon,
            text: mensaje
        });
    } catch (error) {
        console.log(error);
        
        }
}


const traeDatos = (e) => {
    const button = e.target;
    const id = button.dataset.id
    const nombre = button.dataset.nombre
    const catalogo = button.dataset.catalogo
    const password = button.dataset.password
    const rol = button.dataset.rol
    const situacion = button.dataset.situacion

    const dataset = {
        id, 
        nombre, 
        catalogo,
        password,
        rol,
        situacion
};

colocarDatos(dataset);

const body = new FormData(formulario);
body.append('usu_id', id );
body.append('usu_nombre', nombre);
body.append('usu_catalogo', catalogo );
body.append('usu_password', password );
body.append('usu_rol', rol );
body.append('usu_situacion', situacion );

};

const colocarDatos = (dataset) => {
    formulario.usu_nombre.value = dataset.nombre;
    formulario.usu_catalogo.value = dataset.catalogo;
    formulario.usu_password.value = dataset.password;
    formulario.usu_rol.value = dataset.rol;
    formulario.usu_situacion.value = dataset.situacion;
    formulario.usu_id.value = dataset.id;
    
    btnGuardar.disabled = true
    btnGuardar.parentElement.style.display = 'none'
    btnBuscar.disabled = true
    btnBuscar.parentElement.style.display = 'none'
    btnModificar.disabled = false
    btnModificar.parentElement.style.display = ''
    btnCancelar.disabled = false
    btnCancelar.parentElement.style.display = ''
    //divTabla.style.display = 'none'
    
    
}

const modificar = async () => {
    if(!validarFormulario(formulario)){
        Toast.fire({
            icon: 'info',
            text: 'Debe llenar todos los datos'
        });
        return 
    }

    const body = new FormData(formulario)
    const url = '/parcial_ramirez/API/usuario/modificar';
    const config = {
        method : 'POST',
        body
    }

    try {
        // fetch(url, config).then( (respuesta) => respuesta.json() ).then(d => data = d)
        const respuesta = await fetch(url, config)
        const data = await respuesta.json();
        
        const {codigo, mensaje,detalle} = data;
        let icon = 'success'
        switch (codigo) {
            case 1:
                formulario.reset();
                icon = 'success';
                buscar();
                cancelarAccion();
                break;
        
            case 0:
                icon = 'error'
                console.log(detalle)
                break;
        
            default:
                break;
        }

        Toast.fire({
            icon,
            text: mensaje
        })

    } catch (error) {
        console.log(error);
    }
}

const eliminar = async (e) => {
    const button = e.target;
    const id = button.dataset.id;
    // console.log(id);
    if (await confirmacion('warning', 'Desea elminar este registro?')) {
        const body = new FormData()
        body.append('usu_id', id)
        const url = '/parcial_ramirez/API/usuario/eliminar';
        const headers = new Headers();
        headers.append("X-Requested-With","fetch");
        const config = {
            method: 'POST',
            body
        }
        try {
            const respuesta = await fetch(url, config)
            const data = await respuesta.json();
            // console.log(data);
            // return;


            const { codigo, mensaje, detalle } = data;
            let icon = 'info'
            switch (codigo) {
                case 1:
                    // formulario.reset();
                    icon = 'success'
                    buscar();
                    // cancelarAccion();
                    break;

                case 0:
                    icon = 'error'
                    console.log(detalle)
                    break;

                default:
                    break;
            }

            Toast.fire({
                icon,
                text: mensaje
            })




        } catch (error) {
            console.log(error);
        }
    }

}





const cancelarAccion = () => {
    btnGuardar.disabled = false
    btnGuardar.parentElement.style.display = ''
    btnBuscar.disabled = false
    btnBuscar.parentElement.style.display = ''
    btnModificar.disabled = true
    btnModificar.parentElement.style.display = 'none'
    btnCancelar.disabled = true
    btnCancelar.parentElement.style.display = 'none'
    //divTabla.style.display = ''
}


buscar();





formulario.addEventListener('submit', guardar)
btnBuscar.addEventListener('click', buscar)
btnCancelar.addEventListener('click', cancelarAccion)
btnModificar.addEventListener('click', modificar)
//datatable.on('click','.btn-warning', colocarDatos )
datatable.on('click','.btn-warning', traeDatos )
datatable.on('click','.btn-danger', eliminar )


