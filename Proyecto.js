const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json());

// Bases de datos Proyectos
let proyectos = [
    {
        id: 1,
        nombre: "Proyecto de Desarrollo Web",
        descripcion: "Desarrollo de un sitio web interactivo",
        fechaInicio: "2023-01-15",
        fechaFinalizacion: "2023-04-15"
    },
    {
        id: 2,
        nombre: "Proyecto de Marketing Digital",
        descripcion: "Campaña de marketing en redes sociales",
        fechaInicio: "2023-02-10",
        fechaFinalizacion: "2023-05-20"
    },
    {
        id: 3,
        nombre: "Proyecto de Investigación",
        descripcion: "Investigación en inteligencia artificial",
        fechaInicio: "2023-03-05",
        fechaFinalizacion: "2023-06-30"
    },
    {
        id: 4,
        nombre: "Proyecto de Construcción",
        descripcion: "Construcción de un edificio de oficinas",
        fechaInicio: "2023-04-20",
        fechaFinalizacion: "2023-08-10"
    },
    {
        id: 5,
        nombre: "Proyecto de Diseño Gráfico",
        descripcion: "Creación de logotipos y materiales gráficos",
        fechaInicio: "2023-05-10",
        fechaFinalizacion: "2023-09-25"
    },
    {
        id: 6,
        nombre: "Proyecto de Capacitación",
        descripcion: "Capacitación en desarrollo personal",
        fechaInicio: "2023-06-15",
        fechaFinalizacion: "2023-10-05"
    },
    {
        id: 7,
        nombre: "Proyecto de Producción de Video",
        descripcion: "Producción de un cortometraje",
        fechaInicio: "2023-07-01",
        fechaFinalizacion: "2023-11-15"
    },
    {
        id: 8,
        nombre: "Proyecto de Consultoría Empresarial",
        descripcion: "Asesoramiento a empresas en estrategia",
        fechaInicio: "2023-08-10",
        fechaFinalizacion: "2023-12-20"
    },
    {
        id: 9,
        nombre: "Proyecto de Desarrollo de Software",
        descripcion: "Desarrollo de una aplicación móvil",
        fechaInicio: "2023-09-05",
        fechaFinalizacion: "2024-01-10"
    },
    {
        id: 10,
        nombre: "Proyecto de Evento Corporativo",
        descripcion: "Organización de una conferencia",
        fechaInicio: "2023-10-20",
        fechaFinalizacion: "2024-02-28"
    }
];


// Bases de datos Tareas
let tareas = [
    {
        id: 1,
        idProyecto: 1,
        nombre: "Diseñar la interfaz de usuario",
        descripcion: "Crear diseños de pantalla para el sitio web",
        fechaAsignacion: "2023-01-20",
        estado: "En Progreso"
    },
    {
        id: 2,
        idProyecto: 2,
        nombre: "Desarrollar la funcionalidad principal",
        descripcion: "Implementar las características principales del sitio web",
        fechaAsignacion: "2023-02-05",
        estado: "Pendiente"
    },
    {
        id: 3,
        idProyecto: 3,
        nombre: "Crear contenido para redes sociales",
        descripcion: "Generar publicaciones en redes sociales",
        fechaAsignacion: "2023-02-12",
        estado: "Completada"
    },
    {
        id: 4,
        idProyecto: 3,
        nombre: "Realizar análisis de métricas",
        descripcion: "Evaluar el rendimiento de la campaña de marketing",
        fechaAsignacion: "2023-02-28",
        estado: "Pendiente"
    },
    {
        id: 5,
        idProyecto: 5,
        nombre: "Recopilar datos de investigación",
        descripcion: "Recolectar datos para el estudio de inteligencia artificial",
        fechaAsignacion: "2023-03-10",
        estado: "En Progreso"
    },
    {
        id: 6,
        idProyecto: 6,
        nombre: "Analizar resultados",
        descripcion: "Realizar análisis estadísticos de los datos",
        fechaAsignacion: "2023-03-20",
        estado: "Pendiente"
    },
    {
        id: 7,
        idProyecto: 8,
        nombre: "Inicio de la construcción",
        descripcion: "Comenzar la construcción del edificio",
        fechaAsignacion: "2023-04-05",
        estado: "En Progreso"
    },
    {
        id: 8,
        idProyecto: 9,
        nombre: "Gestión de recursos",
        descripcion: "Planificar y gestionar los recursos de la construcción",
        fechaAsignacion: "2023-04-15",
        estado: "Pendiente"
    },
    {
        id: 9,
        idProyecto: 10,
        nombre: "Diseñar logotipos",
        descripcion: "Crear logotipos para clientes",
        fechaAsignacion: "2023-05-01",
        estado: "Pendiente"
    },
];


/// Rutas para operaciones relacionadas con Tareas

// Obtener la lista de todas las tareas (GET)
app.get('/socios/v1/tareas', (req, res) => {
    if (tareas.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Existen tareas",
            tareas: tareas
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas",
            tareas: []
        });
    }
});

// Obtener una tarea por su ID (GET)
app.get('/socios/v1/tareas/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const tareaEncontrada = tareas.find(tarea => tarea.id === taskId);

    if (tareaEncontrada) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tarea encontrada",
            tarea: tareaEncontrada
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Tarea no encontrada",
            tarea: null
        });
    }
});

// Agregar una nueva tarea (POST)
app.post('/socios/v1/tareas', (req, res) => {
    const nuevaTarea = req.body;
    nuevaTarea.id = tareas.length + 1;
    tareas.push(nuevaTarea);

    res.status(201).json({
        estado: 1,
        mensaje: "Tarea creada",
        tarea: nuevaTarea
    });
});

// Actualizar una tarea por su ID (PUT)
app.put('/socios/v1/tareas/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const tareaActualizada = req.body;

    const indiceTarea = tareas.findIndex(tarea => tarea.id === taskId);

    if (indiceTarea !== -1) {
        tareas[indiceTarea] = { ...tareas[indiceTarea], ...tareaActualizada };
        res.status(200).json({
            estado: 1,
            mensaje: "Tarea actualizada",
            tarea: tareas[indiceTarea]
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Tarea no encontrada",
            tarea: null
        });
    }
});

// Eliminar una tarea por su ID (DELETE)
app.delete('/socios/v1/tareas/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const indiceTarea = tareas.findIndex(tarea => tarea.id === taskId);

    if (indiceTarea !== -1) {
        tareas.splice(indiceTarea, 1);
        res.status(200).json({
            estado: 1,
            mensaje: "Tarea eliminada con éxito"
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Tarea no encontrada"
        });
    }
});

// Rutas para operaciones relacionadas con Proyectos

// Obtener la lista de todos los proyectos (GET)
app.get('/socios/v1/proyectos', (req, res) => {
    if (proyectos.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Existen proyectos",
            proyectos: proyectos
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron proyectos",
            proyectos: []
        });
    }
});

// Obtener un proyecto por su ID (GET)
app.get('/socios/v1/proyectos/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const proyectoEncontrado = proyectos.find(proyecto => proyecto.id === projectId);

    if (proyectoEncontrado) {
        res.status(200).json({
            estado: 1,
            mensaje: "Proyecto encontrado",
            proyecto: proyectoEncontrado
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado",
            proyecto: null
        });
    }
});

// Agregar un proyecto por su ID (POST)
app.post('/socios/v1/proyectos/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const nuevoProyecto = req.body;

    // Verificar si el proyecto ya existe por su ID
    const proyectoExistente = proyectos.find(proyecto => proyecto.id === projectId);

    if (proyectoExistente) {
        res.status(400).json({
            estado: 0,
            mensaje: "El proyecto con el ID especificado ya existe"
        });
    } else {
        // Asignar el ID al nuevo proyecto y agregarlo a la base de datos
        nuevoProyecto.id = projectId;
        proyectos.push(nuevoProyecto);

        res.status(201).json({
            estado: 1,
            mensaje: "Proyecto agregado con éxito",
            proyecto: nuevoProyecto
        });
    }
});

// Actualizar un proyecto por su ID (PUT)
app.put('/socios/v1/proyectos/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const proyectoActualizado = req.body;

    const indiceProyecto = proyectos.findIndex(proyecto => proyecto.id === projectId);

    if (indiceProyecto !== -1) {
        proyectos[indiceProyecto] = { ...proyectos[indiceProyecto], ...proyectoActualizado };
        res.status(200).json({
            estado: 1,
            mensaje: "Proyecto actualizado",
            proyecto: proyectos[indiceProyecto]
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado",
            proyecto: null
        });
    }
});

// Eliminar un proyecto por su ID (DELETE)
app.delete('/socios/v1/proyectos/:id', (req, res) => {
    const projectId = parseInt(req.params.id);

    const indiceProyecto = proyectos.findIndex(proyecto => proyecto.id === projectId);

    if (indiceProyecto !== -1) {
        proyectos.splice(indiceProyecto, 1);
        res.status(200).json({
            estado: 1,
            mensaje: "Proyecto eliminado con éxito"
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Proyecto no encontrado"
        });
    }
});
//____________________________________________________________________________________________________________________________

// Obtener todas las tareas de un proyecto por su ID (GET)
app.get('/socios/v1/proyectos/:id/tareas', (req, res) => {
    const projectId = parseInt(req.params.id);
    const tareasProyecto = tareas.filter(tarea => tarea.idProyecto === projectId);

    if (tareasProyecto.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: tareasProyecto
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas para el proyecto especificado",
            tareas: []
        });
    }
});



// Obtener una tarea específica de un proyecto por su ID (GET)
app.get('/socios/v1/proyectos/:projectId/tareas/:tareaId', (req, res) => {
    const projectId = parseInt(req.params.projectId);
    const tareaId = parseInt(req.params.tareaId);

    const tareaEncontrada = tareas.find(tarea => tarea.id === tareaId && tarea.idProyecto === projectId);

    if (tareaEncontrada) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tarea encontrada",
            tarea: tareaEncontrada
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "Tarea no encontrada en el proyecto especificado",
            tarea: null
        });
    }
});



// Obtener tareas de un proyecto por estado (GET)
app.get('/socios/v1/proyectos/:id/tareasPorEstado', (req, res) => {
    const projectId = parseInt(req.params.id);
    const estado = req.query.estatus;

    const tareasProyectoPorEstado = tareas.filter(tarea => tarea.idProyecto === projectId && tarea.estado === estado);

    if (tareasProyectoPorEstado.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: tareasProyectoPorEstado
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas con el estado especificado para el proyecto",
            tareas: []
        });
    }
});



// Obtener tareas de un proyecto paginadas (GET)
app.get('/socios/v1/proyectos/:id/tareasPaginadas', (req, res) => {
    const projectId = parseInt(req.params.id);
    const pagina = parseInt(req.query.pagina) || 1;
    const registrosPorPagina = parseInt(req.query.registrosPorPagina) || 10;

    const inicio = (pagina - 1) * registrosPorPagina;
    const fin = inicio + registrosPorPagina;

    const tareasProyectoPaginadas = tareas
        .filter(tarea => tarea.idProyecto === projectId)
        .slice(inicio, fin);

    if (tareasProyectoPaginadas.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: tareasProyectoPaginadas
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas para el proyecto especificado o la página está fuera de rango",
            tareas: []
        });
    }
});


// Obtener tareas de un proyecto por fecha de inicio (GET)
app.get('/socios/v1/proyectos/:id/tareasPorFechaInicio', (req, res) => {
    const projectId = parseInt(req.params.id);
    const fechaInicio = req.query.fechaInicio;

    const tareasProyectoPorFechaInicio = tareas.filter(
        tarea => tarea.idProyecto === projectId && tarea.fechaAsignacion === fechaInicio
    );

    if (tareasProyectoPorFechaInicio.length > 0) {
        res.status(200).json({
            estado: 1,
            mensaje: "Tareas encontradas",
            tareas: tareasProyectoPorFechaInicio
        });
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "No se encontraron tareas con la fecha de inicio especificada para el proyecto",
            tareas: []
        });
    }
});

//____________________________________________________________________________________________________________________________
// Iniciar el servidor
app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto:', puerto);
});
