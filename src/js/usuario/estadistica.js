import Chart from "chart.js/auto";
import { Toast } from "../funciones";

const canvasUsuariosPorRol = document.getElementById('chartUsuariosPorRol');
const contextUsuariosPorRol = canvasUsuariosPorRol.getContext('2d');

const chartUsuariosPorRol = new Chart(contextUsuariosPorRol, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Usuarios por Rol',
                data: [],
                backgroundColor: []
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribución de Usuarios por Rol'
            }
        }
    }
});

const getEstadisticasUsuariosPorRol = async () => {
    const url = `/parcial_ramirez/usuario/estadistica`;
    const config = {
        method: 'GET'
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        chartUsuariosPorRol.data.labels = [];
        chartUsuariosPorRol.data.datasets[0].data = [];
        chartUsuariosPorRol.data.datasets[0].backgroundColor = [];

        if (data) {
            data.forEach(registro => {
                chartUsuariosPorRol.data.labels.push(registro.usu_rol);
                chartUsuariosPorRol.data.datasets[0].data.push(1); // Cada usuario es 1 parte
                chartUsuariosPorRol.data.datasets[0].backgroundColor.push(getRandomColor());
            });

            // Actualizar el título para mostrar la cantidad de usuarios por rol
            chartUsuariosPorRol.options.plugins.title.text = `Usuarios por Rol - ${data.length} Usuarios`;
        } else {
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });

            // Restaurar el título si no hay datos
            chartUsuariosPorRol.options.plugins.title.text = 'Distribución de Usuarios por Rol';
        }

        chartUsuariosPorRol.update();
    } catch (error) {
        console.log(error);
    }
};

getEstadisticasUsuariosPorRol();

const canvasUsuariosPorSituacion = document.getElementById('chartUsuariosPorSituacion');
const contextUsuariosPorSituacion = canvasUsuariosPorSituacion.getContext('2d');

const chartUsuariosPorSituacion = new Chart(contextUsuariosPorSituacion, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Usuarios por Situación',
                data: [],
                backgroundColor: []
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribución de Usuarios por Situación'
            }
        }
    }
});

const getEstadisticasUsuariosPorSituacion = async () => {
    const url = `/parcial_ramirez/usuario/estadistica`;
    const config = {
        method: 'GET'
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        chartUsuariosPorSituacion.data.labels = [];
        chartUsuariosPorSituacion.data.datasets[0].data = [];
        chartUsuariosPorSituacion.data.datasets[0].backgroundColor = [];

        if (data) {
            data.forEach(registro => {
                chartUsuariosPorSituacion.data.labels.push(registro.usu_situacion);
                chartUsuariosPorSituacion.data.datasets[0].data.push(1); // Cada usuario es 1 parte
                chartUsuariosPorSituacion.data.datasets[0].backgroundColor.push(getRandomColor());
            });

            // Actualizar el título para mostrar la cantidad de usuarios por situación
            chartUsuariosPorSituacion.options.plugins.title.text = `Usuarios por Situación - ${data.length} Usuarios`;
        } else {
            Toast.fire({
                title: 'No se encontraron registros',
                icon: 'info'
            });

            // Restaurar el título si no hay datos
            chartUsuariosPorSituacion.options.plugins.title.text = 'Distribución de Usuarios por Situación';
        }

        chartUsuariosPorSituacion.update();
    } catch (error) {
        console.log(error);
    }
};

getEstadisticasUsuariosPorSituacion();
