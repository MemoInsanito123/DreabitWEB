
//Guardamos las etiquetas en constantes para posteriormente utilizarlas

//Modales de Way
const modalWayCreate = document.getElementById('modal_way_create');
const modalWayEdit = document.getElementById('modal_way_edit');
const modalWayDelete = document.getElementById('modal_way_delete');

//Modales de Task
const modalTaskCreate = document.getElementById('modal_task_create');
const modalTaskEdit = document.getElementById('modal_task_edit');
const modalTaskDelete = document.getElementById('modal_task_delete');

//Modales de SubTask
const modalSubTaskCreate = document.getElementById('modal_sub_task_create');
const modalSubTaskEdit = document.getElementById('modal_sub_task_edit');
const modalSubTaskDelete = document.getElementById('modal_sub_task_delete');

//Formularios de Way
const formWayCreate = document.getElementById('form_way_create');
const formWayEdit = document.getElementById('form_way_edit');

//Formularios de Task
const formTaskCreate = document.getElementById('form_task_create');
const formTaskEdit = document.getElementById('form_task_edit');

//Formularios de SubTask
const formSubTaskCreate = document.getElementById('form_sub_task_create');
const formSubTaskEdit = document.getElementById('form_sub_task_edit');

//Botones de Way
const buttonCreateWay = document.getElementById('add_way');

const buttonCancelWayCrete = document.getElementById('modal_button_cancel_create');
const buttonCancelWayEdit = document.getElementById('modal_button_cancel_edit');
const buttonCancelWayDelete = document.getElementById('no_delete');

//Botones de Task
const buttonCancelTaskCreate = document.getElementById('modal_task_cancel');
const buttonCancelTaskEdit = document.getElementById('modal_task_cancel_edit');
const buttonCancelTaskDelete = document.getElementById('no_delete_task');

//Botones de SubTask
const buttonCancelSubTaskCreate = document.getElementById('modal_sub_task_cancel_create');
const buttonCancelSubTaskEdit = document.getElementById('modal_sub_task_cancel_edit');
const buttonCancelSubTaskDelete = document.getElementById('no_delete_sub_task');

//Eliminar Way
const deleteYes = document.getElementById('yes_delete');
//Eliminar Task
const deleteYesTask = document.getElementById('yes_delete_task');
//Eliminar SubTask
const deleteYesSubTask = document.getElementById('yes_delete_sub_task');

//Contenedor general
const divContainer = document.getElementById('container');
//Contenedor para dias
const divContainerFrequency = document.getElementById('container_frequency_create');
const divContainerFrequencyEdit = document.getElementById('container_frequency_edit');


//Select de task Create
const selectFrequency = document.getElementById('frequency');
const selectPriority = document.getElementById('priority');

//Select de task Edit
const selectFrequencyEdit = document.getElementById('frequency_edit');
const selectPriorityEdit = document.getElementById('priority_edit');

//Formulario Create Way se envia
formWayCreate.addEventListener('submit', (event) => {
    //Se envia la funcion para conseguir el ID debido a que el fetch trabaja con promesos entonces es necesario hacerlo de esta forma
    getIDUser();
});

//Boton para crear un nuevo way
buttonCreateWay.addEventListener('click', () => {
    modalWayCreate.showModal();
});

//Boton para cancelar el modal Create Way
buttonCancelWayCrete.addEventListener('click', () => {
    modalWayCreate.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal Edit Way
buttonCancelWayEdit.addEventListener('click', () => {
    modalWayEdit.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal Delete Way
buttonCancelWayDelete.addEventListener('click', () => {
    modalWayDelete.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Create Task
buttonCancelTaskCreate.addEventListener('click', () => {
    modalTaskCreate.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Edit Task
buttonCancelTaskEdit.addEventListener('click', () => {
    modalTaskEdit.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Delete Task
buttonCancelTaskDelete.addEventListener('click', () => {
    modalTaskDelete.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Create SubTask
buttonCancelSubTaskCreate.addEventListener('click', () => {
    modalSubTaskCreate.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Edit SubTask
buttonCancelSubTaskEdit.addEventListener('click', () => {
    modalSubTaskEdit.close();
    //Recargar la pagina
    location.reload();
});

//Boton para cancelar el modal de Delete SubTask
buttonCancelSubTaskDelete.addEventListener('click', () => {
    modalSubTaskDelete.close();
    //Recargar la pagina
    location.reload();
});

//Funcion para ejecutar la llamada al fetch de GET que retorna en la data los caminos dependiendo de la sesion del usuario
const fetchWaysGET = () => {
    const JSON_EMAIL = {
        email : localStorage.getItem('user') || 'dreabit@gmail.com'
    }
    fetch('/ways/get', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(JSON_EMAIL),
    })
    .then(response => response.json())
    .then(data => {
        showWays(data);
    })
    .catch(err => {
        console.log(err);
    })
};

//Funcion para obtener el ID del usuario mediante su correo electronico
const getIDUser = () => {
    const JSON_EMAIL = {
        email : localStorage.getItem('user') || 'dreabit@gmail.com'
    }
    fetch('/sessions/getID', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(JSON_EMAIL),
    })
    .then(response => response.json())
    .then(data => {
        addWays(data);
    })
    .catch(err => {
        console.log(err);
    })
};

//Funcion para ejecutar la llamada al fetch de POST para agregar ways
const addWays = (id) => {

    let JSON_WAY;

    //Iteramos el elemento del parametro ID que forzosamente es de longitud 1
    id.forEach(element => {
        //JSON para agregar un camino
        JSON_WAY = {
            id_user : element.id_user,
            name_cycle : document.getElementById('input_name_way_create').value ,
            description_cycle : document.getElementById('input_description_way_create').value
        };

    });

    //Fetch para hacer la peticion a los metodos de la base de datos
    fetch('/ways/post', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(JSON_WAY),
    })
    .then(response => response.json())
    .then(data => {

    })
    .catch(err => {
        console.log(err)
    })

};

//Mostrar los caminos cada vez que inicia la pagina, incluye los botones para crear una tarea
//Se le pasa como atributo un objeto que contenga la informacion
const showWays = (JSON_data) => {
    //Se itera dicho objeto (array) una cantidad de n veces
    JSON_data.forEach(element => {

        console.log(element);

        //Desestructurar el JSON del elemento
        let {id_way, name_way, description_way} = element;

        //Div para el camino
        let divWays = document.createElement('div');
        divWays.className = 'way';

        //Agregar un identificador para ubicar el divWay para posteriormente agregar las tareas en el div correspondiente
        divWays.id = id_way.toString();
    
        //------BOTONES WAY------
        //Boton para eliminar el camino
        let buttonDeleteWay = document.createElement('button');
        buttonDeleteWay.className = 'deleteWay';
        buttonDeleteWay.innerHTML = 'Eliminar';
        //Funcion para eliminar el Camino
        buttonDeleteWay.addEventListener('click',() => {
            //Mostramos el modal eliminar
            modalWayDelete.showModal();

            //Guardamos el ID del Camino
            let idWay = id_way;

            //Asignamos un metodo para cuando confirmes las eliminacion del camino
            deleteYes.addEventListener('click', () => {
                fetch('/ways/delete', {
                    method:'DELETE',
                    headers:{'Content-Type' : 'application/json'},
                    body: JSON.stringify({id_way_db : idWay}),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Camino eliminado con exito');
                })
                .catch(err => {
                    console.log(err);
                });

                //Recargamos la pagina
                location.reload();
            });
        });
        
        //Boton para editar el camino
        let buttonEditWay = document.createElement('button');
        buttonEditWay.className = 'editWay';
        buttonEditWay.innerHTML = 'Editar'
        
        //Funcion para editar los caminos
        buttonEditWay.addEventListener('click', () => {
            //Mostrar el modal Edit
            modalWayEdit.showModal();
            //Guarda el id del camino para su posterior uso
            let idWay = id_way;

            //Agregamos un evento submit para el formulario
            formWayEdit.addEventListener('submit', () => { 
                //Guardamos un ojetos para usarlo posteriormente en el metodo
                let JSON_edit_way = {
                    id_way_db : idWay,
                    name_way : document.getElementById('input_name_way_edit').value,
                    description_way : document.getElementById('input_description_way_edit').value
                }
                fetch('/ways/put', {
                    method:'PUT',
                    headers:{'Content-Type' : 'application/json'},
                    body: JSON.stringify(JSON_edit_way),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Camino actualizado con exito')
                })
                .catch(err => {
                    console.log(err);
                });
            });
        });
    
        //-----TAREAS------
        //Boton para crear una Tarea
        let buttonAddTask = document.createElement('button');
        buttonAddTask.className = 'addTask'
        buttonAddTask.innerHTML = 'Crear Tarea';
        //Funcion para crear Tareas
        buttonAddTask.addEventListener('click', () => {
            
            modalTaskCreate.showModal();

            //Verificar en que opcion se encuentra el selector de frecuencia
            updateDivFrequecy(divContainerFrequency, selectFrequency);


            //Funcion para cuando el Selector cambie
            selectFrequency.addEventListener('change', () => {
                //Actualizamos ese div dependiendo de la opcion
                updateDivFrequecy(divContainerFrequency, selectFrequency);
            });

            //Cuando el formulario del modal Create task se envia
            formTaskCreate.addEventListener('submit', (event) => {
                //event.preventDefault();
                //Guardar el Id del camino
                let idWay = id_way;

                //Crear un JSON para guardar la informacion de la tarea para la tabla TASK
                let JSON_task = {
                    name_task : document.getElementById('task_name_create').value,
                    description_task : document.getElementById('task_description_create').value,
                    start_time : document.getElementById('task_start_time_create').value,
                    end_time : document.getElementById('task_end_time_create').value,
                }

                //Json para enviar a la ruta del metodo Post
                let JSON_task_post = {
                    id_way_db : idWay,
                    task : JSON_task,
                    priority : selectPriority.value,
                    frequency: verifyCheckBox(divContainerFrequency).join(',') || verifyButtonsMonth(divContainerFrequency).join(',') ,
                }

                //Ejercutar el Fetch para enviar la infromacion a la base de datos
                fetch('/tasks/post', {
                    method:'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body : JSON.stringify(JSON_task_post),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Tarea Registrada con exito');
                })
                .catch(err => {
                    console.err(err);
                })

                //Mostrar la info
                console.log('ID Camino: ' + idWay);
                console.log('Tarea para el POST' + JSON_task_post);
            });
        });
        
        //Crear un encabezado para el nombre del camino
        let h2WaysNames = document.createElement('h2');
        h2WaysNames.innerHTML = name_way.toUpperCase();
        
        //Crear un parrafo para la descripcion del camino
        let pWaysDescriptions = document.createElement('p');
        pWaysDescriptions.innerHTML = description_way;
    
        //Agregar los elementos al div de Camino
        divWays.appendChild(buttonDeleteWay);
        divWays.appendChild(buttonEditWay);
        divWays.appendChild(buttonAddTask);
        divWays.appendChild(h2WaysNames);
        divWays.appendChild(pWaysDescriptions);

        //Agregar las Tareas al contenedor div y pasamos su identificador 
        showTasks(divWays, id_way);

        //Agregar el div de camino al Contenedor principal
        divContainer.appendChild(divWays);
    });
};

//Mostrar las tareas en el DOM le pasamos como parametro el divWay y el IDWay para agregarlo al mismo camino
const showTasks = (divWay, IDWay) => {
    //Obtemos el ID del Usuario mediante el correo electronico almacenado en el LocalStorage
    // fetch('/sessions/getID' , {
    //     method : 'POST',
    //     headers : {'Content-Type' : 'application/json'},
    //     body : JSON.stringify({email : localStorage.getItem('user') || 'dreabit@gmail.com'})
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     let idUser;
    //     //Iteramos el argumento data que forzosamente tiene longitud 1
    //     data.forEach(element => {
    //         idUser = element.id_user;
    //     });

        //ANTES LO HACIAMOS DE ESTA FORMA, pero era inecesaria: Obtener las tareas mediante el ID de usuario
        //AHORA LO HACEMOS mediante el ID del camino
        fetch('/tasks/getIDWay', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({id_way_db : IDWay})
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                //Desestruturar la informacion del elemento que iteramos
                let {id_way, id_task, task, frequency, priority_type} = element;

                //Cambiar la prioridad
                switch(priority_type){
                    case 'high':
                        priority_type = 'ALTA';
                        break;
                    case 'medium':
                        priority_type = 'MEDIA';
                        break;
                    case 'low':
                        priority_type = 'BAJA';
                        break;
                    default:
                        priority_type = 'NULL';
                        break;
                }

                //Frecuencia Final
                let frequency_final = frequency.split(',') || 'NULL';

                //Crear los elementos
                // Crear el contenedor principal para la tarea
                const taskCard = document.createElement('div');
                taskCard.classList.add('task-card');

                // Crear el div la cabecera 
                const taskHeader = document.createElement('div');
                taskHeader.classList.add('task-header');

                // Botón de eliminar
                //Contenedor para el boton de eliminar
                const deleteContainer = document.createElement('div');
                deleteContainer.classList.add('delete-container-task');

                //Boton de eliminar
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                
                //Imagen del boton eliminar
                const imgDeleteButton = document.createElement('img');
                imgDeleteButton.classList.add('icon');
                imgDeleteButton.src = '../img/delete.png';
                imgDeleteButton.alt = 'Eliminar Task';

                //Agregar la imagen al boton
                deleteButton.appendChild(imgDeleteButton);

                //Funcion para eliminar la tarea
                deleteButton.addEventListener('click', () => {
                    
                    //Mostrar el modal eliminar
                    modalTaskDelete.showModal();

                    //Guardar el id de la tarea
                    let IDTask = id_task;
                    
                    //Aceptar eliminar la Tarea
                    deleteYesTask.addEventListener('click', () => {  
                        fetch('/tasks/delete', {
                            method : 'DELETE',
                            headers : {'Content-Type' : 'application/json'},
                            body : JSON.stringify({id_task_db : IDTask})
                        })
                        .then(response => response.json())
                        .then(data => console.log('Tarea Eliminada con exito'))
                        .catch(err => console.error(err));

                        location.reload();
                    });

                }); 

                //Agregar al contenedor del boton el boton
                deleteContainer.appendChild(deleteButton);

                // Título de la tarea
                const taskTitle = document.createElement('h2');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = task.name_task.toUpperCase();

                // Acciones (botones de editar y agregar subtarea)
                //Contenedor de acciones
                const actions = document.createElement('div');
                actions.classList.add('actions');

                const editButton = document.createElement('button');
                editButton.classList.add('edit-button');
                
                //Imagen del boton editar
                const imgEditButton = document.createElement('img');
                imgEditButton.classList.add('icon');
                imgEditButton.src = '../img/edit.png';
                imgEditButton.alt = 'Editar Task';

                //Agregar la imagen al boton
                editButton.appendChild(imgEditButton);

                //Funcion de Boton para Editar la tarea
                editButton.addEventListener('click', () => {
                    modalTaskEdit.showModal();

                    //Actualizar el DIV de frecuencia de los dias
                    updateDivFrequecy(divContainerFrequencyEdit, selectFrequencyEdit);

                    //Cuando se cambie el selector Actualizar el Div
                    selectFrequencyEdit.addEventListener('change', () => {
                        updateDivFrequecy(divContainerFrequencyEdit, selectFrequencyEdit);
                    })

                    formTaskEdit.addEventListener('submit', (event) => {
                        
                        //event.preventDefault();

                        let IDTask = id_task;

                        let JSON_task_edit = {
                            name_task : document.getElementById('task_name_edit').value,
                            description_task : document.getElementById('task_description_edit').value,
                            start_time : document.getElementById('task_start_time_edit').value,
                            end_time : document.getElementById('task_end_time_edit').value,
                        }

                        let JSON_task_put = {
                            id_task_db : IDTask,
                            task :  JSON_task_edit,
                            priority : document.getElementById('priority_edit').value,
                            frequency : verifyCheckBox(divContainerFrequencyEdit).join(',') || verifyButtonsMonth(divContainerFrequencyEdit).join(',')
                        }

                        console.log(JSON_task_put.frequency);

                        fetch('/tasks/put', {
                            method : 'PUT',
                            headers : {'Content-Type' : 'application/json'},
                            body : JSON.stringify(JSON_task_put),
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Tarea Actulizada con exito')
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    });

                });

                //Boton para crear una SUBTAREA
                const addButton = document.createElement('button');
                addButton.classList.add('add-button');

                //Agregar un funcion al boton para crear una Subtarea
                addButton.addEventListener('click', () => {
                    //Mostrar el modal de crear SubTarea
                    modalSubTaskCreate.showModal();

                    //Evento para cuando el formulario de Subtarea se envia
                    formSubTaskCreate.addEventListener('submit', (event) => {

                        //Evitar que el formulario recargue la pagina (TEST)
                        //event.preventDefault();

                        let JSON_SUBTASK = {
                            id_task_db : id_task,
                            name_sub_task : document.getElementById('name_sub_task_create').value,
                            description_sub_task : document.getElementById('description_task_create').value
                        };

                        //Llamamos al fetch para hacer la insercion en la BD
                        fetch('/tasks/post/subtask', {
                            method : 'POST',
                            headers : {'Content-Type' : 'application/json'},
                            body : JSON.stringify(JSON_SUBTASK)
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('SubTarea registrada con exito');
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    });

                });

                //Imagen del boton editar
                const imgAddButton = document.createElement('img');
                imgAddButton.classList.add('icon');
                imgAddButton.src = '../img/add.png';
                imgAddButton.alt = 'Agregar SubTask';
                //Agregar la imagen al boton
                addButton.appendChild(imgAddButton);

                actions.appendChild(editButton);
                actions.appendChild(addButton);

                // Agregar todo a la cabecera
                taskHeader.appendChild(deleteContainer);
                taskHeader.appendChild(taskTitle);
                taskHeader.appendChild(actions);

                // Sección de tiempo
                // Contenedor para el tiempo
                const taskTime = document.createElement('div');
                taskTime.classList.add('task-time');
                //Agregamos la informacion de la hora
                taskTime.innerHTML = `
                    <p>Hora:</p>
                    <span>de</span>
                    <div class="time-start">${task.start_time}</div>
                    <span>hasta</span>
                    <div class="time-end">${task.end_time}</div>
                `;

                // Sección de descripción
                //Contenedor de descripcion
                const taskDescription = document.createElement('div');
                taskDescription.classList.add('task-description');

                //Agregamos la informacion de la descripcion
                taskDescription.innerHTML = `
                    <span>Descripcion: </span>
                    <span class="description">${task.description_task}</span>
                `;

                // Detalles de la tarea
                // Contenedor para los detalles de la tarea
                const taskDetails = document.createElement('div');
                taskDetails.classList.add('task-details');

                //Contenedor para la frecuencia
                const frequencyDIV = document.createElement('div');
                frequencyDIV.classList.add('frequency');

                //Contenedor para la informacion de la frecuencia
                const frequencyData = document.createElement('div');
                frequencyData.classList.add('frequency-data');

                //Mediante la frecuencia final modificar su contenido para que sea mas explicito
                frequency_final.forEach(element => {
                    let spanData = document.createElement('span');
                    switch(element) {
                        case 'L':
                            element = 'Lunes';
                            break;
                        case 'M':
                            element = 'Martes';
                            break;
                        case 'MI':
                            element = 'Miércoles';
                            break;
                        case 'J':
                            element = 'Jueves';
                            break;
                        case 'V':
                            element = 'Viernes';
                            break;
                        case 'S':
                            element = 'Sábado';
                            break;
                        case 'D':
                            element = 'Domingo';
                            break;
                    }
                    spanData.textContent = element;

                    frequencyData.appendChild(spanData);
                });

                //Esto es para verificar mediante una expresion regular que es lo que contiene el campo frequency, ya sea unicamente numeros o letras. En caso de ser solo letras y que su longitud sea igual a 14 es diariamente 
                if(/^[a-zA-Z,]+$/.test(frequency) && frequency.length === 14){
                    frequencyDIV.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Diariamente</span>
                    `;    
                }
                else if(/^[0-9,]+$/.test(frequency)){
                    frequencyDIV.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Mensualmente</span>
                    `;    
                }
                else if(/^[a-zA-Z,]+$/.test(frequency) && frequency.length < 14){
                    frequencyDIV.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Semanalmente</span>
                    `;  
                }

                //Contenedor para la prioridad
                const priority = document.createElement('div');
                priority.classList.add('priority');
                priority.innerHTML = `
                    <span>Prioridad: </span>
                    <span class="priority-value">${priority_type}</span>
                `;
                //Agregar todos los contenedores al contenedor de TaskDetails
                taskDetails.appendChild(frequencyDIV);
                taskDetails.appendChild(frequencyData);
                taskDetails.appendChild(priority);

                //Crear un contenedor para las Subtareas
                const subTaskContainer = document.createElement('div');

                //LLamamos la funcion que imprime las subTareas si es que hay
                showSubTask(subTaskContainer, id_task);


                // Agregar todos los elementos al contenedor principal
                taskCard.appendChild(taskHeader);
                taskCard.appendChild(taskTime);
                taskCard.appendChild(taskDescription);
                taskCard.appendChild(taskDetails);
                taskCard.appendChild(subTaskContainer);

                // Agregar al DOM
                //Solo si el ID_way que obtenemos con el metodo POST y que le corresponde a la tarea es igual con el ID del Div al que se esta agregando 
                if(id_way === IDWay){
                    divWay.appendChild(taskCard);
                }
            })
        })
        .catch(err => {
            console.error(err);
        })
//    }
//     )
//     .catch(err => {
//         console.error(err);
//     })
};

//Mostrar las Sub-Tareas en el DOM le pasamos como parametro el divSubTask y el IDTask para agregarlo a la misma Tarea
const showSubTask = (divSubTask, IDTask) => {

    //Obtener la informacion mediante las Sub Tareas
    fetch('tasks/get/subtask', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({id_task_db : IDTask}),
    })
    .then(response => response.json())
    .then(data => {
        //Iteramos las SubTareas que se almacenan en un array
        data.forEach(element => {
            //Desestructuramos el Array que esta contenido en element
            let {id_task, id_sub_task, name_sub_task, description_sub_task} = element;

            // Crear el contenedor de subtareas
            const subtasksDiv = document.createElement('div');
            subtasksDiv.classList.add('subtasks');

            // Crear el encabezado de la subtarea
            const subtaskHeaderDiv = document.createElement('div');
            subtaskHeaderDiv.classList.add('subtask-header');

            // Crear el contenedor para el botón de eliminación
            const deleteContainerDiv = document.createElement('div');
            deleteContainerDiv.classList.add('delete-container-task');

            // Crear el botón de eliminación
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');

            // Agregar el ícono al botón de eliminación
            const deleteIcon = document.createElement('img');
            deleteIcon.src = '../img/delete.png';
            deleteIcon.classList.add('icon');
            deleteButton.appendChild(deleteIcon);

            // Agregar el botón de eliminación al contenedor
            deleteContainerDiv.appendChild(deleteButton);

            // Crear el título de la subtarea
            const subtaskTitle = document.createElement('h3');
            subtaskTitle.textContent = name_sub_task;

            // Crear el contenedor de acciones
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('actions');

            // Crear el botón de edición
            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');

            //Agregamos el evento para editar la SubTarea
            editButton.addEventListener('click', () => {
                modalSubTaskEdit.showModal();
            });

            // Agregar el ícono al botón de edición
            const editIcon = document.createElement('img');
            editIcon.src = '../img/edit.png';
            editIcon.classList.add('icon');
            editButton.appendChild(editIcon);

            // Agregar los botones al contenedor de acciones
            actionsDiv.appendChild(editButton);

            // Agregar los elementos al encabezado de la subtarea
            subtaskHeaderDiv.appendChild(deleteContainerDiv);
            subtaskHeaderDiv.appendChild(subtaskTitle);
            subtaskHeaderDiv.appendChild(actionsDiv);

            // Crear la descripción de la subtarea
            const subtaskDescriptionDiv = document.createElement('div');
            subtaskDescriptionDiv.classList.add('subtask-description');

            // Crear el párrafo de descripción
            const subtaskDescriptionText = document.createElement('p');
            subtaskDescriptionText.textContent = description_sub_task;

            // Agregar el texto de descripción al contenedor
            subtaskDescriptionDiv.appendChild(subtaskDescriptionText);

            // Agregar el encabezado y la descripción al contenedor principal de subtareas
            subtasksDiv.appendChild(subtaskHeaderDiv);
            subtasksDiv.appendChild(subtaskDescriptionDiv);

            //Verificar el ID de la Subtarea que se desestruturo de la respuesta del metodo de la BD sea igual al ID de referencia del Div de la tarea 
            if(id_task === IDTask){
                // Agregar el contenedor de subtareas al documento
                divSubTask.appendChild(subtasksDiv);
            }
        });
    })
};

//Agregar los CheckBoxDays al Div
const addDaysCheckBoxDiv = (div) => {
    let days = ['L','M','MI','J','V','S','D'];
    days.forEach(element => {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = element;
        checkBox.value = element;

        let label = document.createElement('label');
        label.for = element;
        label.innerHTML = element;

        div.appendChild(label);
        div.appendChild(checkBox);
    });
};

//Agrega una tabla que contenga botones con los dias del mes al Div
const addMonthsTableDiv = (div) => {
    //Creamos un Array de 31 elementos que repesentarian los dias del mes
    let daysMonth = [...Array(31).keys()].map(i => i + 1);

    //Creamos una tabla donde se almacenaran todos los botones de los dias
    let table = document.createElement('table');
    table.id = 'table_days_month';

    div.appendChild(table);

    //Configurar la tabla con los botones
    daysMonth.forEach(element => {
        let buttonsDaysMonth = document.createElement('button');
        buttonsDaysMonth.innerHTML = element.toString();
        buttonsDaysMonth.className = 'DaysMonth';
        
        //Evento para los botones cuando son precionados
        buttonsDaysMonth.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(buttonsDaysMonth.textContent);
            buttonsDaysMonth.disabled = true;
        });

        if(element > 0 && element <= 7){
            if(element === 1){
                let trTable = document.createElement('tr');
                trTable.id = 'tr1';

                let tdTable = document.createElement('td');

                tdTable.appendChild(buttonsDaysMonth);
                trTable.appendChild(tdTable);

                table.appendChild(trTable);
                
            }
            
            let trTable = document.getElementById('tr1');
            let tdTable = document.createElement('td');


            tdTable.appendChild(buttonsDaysMonth);
            trTable.appendChild(tdTable);

        }
        else if(element > 7 && element <= 14){
            if(element == 8){
                let trTable = document.createElement('tr');
                trTable.id = 'tr2'

                let tdTable = document.createElement('td');

                tdTable.appendChild(buttonsDaysMonth);
                trTable.appendChild(tdTable);

                table.appendChild(trTable);
            }

            let trTable = document.getElementById('tr2');
            let tdTable = document.createElement('td');

            tdTable.appendChild(buttonsDaysMonth);
            trTable.appendChild(tdTable);
        }
        else if(element > 14 && element <= 21){
            if(element == 15){
                let trTable = document.createElement('tr');
                trTable.id = 'tr3'

                let tdTable = document.createElement('td');

                tdTable.appendChild(buttonsDaysMonth);
                trTable.appendChild(tdTable);

                table.appendChild(trTable);
            }

            let trTable = document.getElementById('tr3');
            let tdTable = document.createElement('td');

            tdTable.appendChild(buttonsDaysMonth);
            trTable.appendChild(tdTable);
        }
        else if(element > 21 && element <= 28){
            if(element == 22){
                let trTable = document.createElement('tr');
                trTable.id = 'tr4'

                let tdTable = document.createElement('td');

                tdTable.appendChild(buttonsDaysMonth);
                trTable.appendChild(tdTable);

                table.appendChild(trTable);
            }

            let trTable = document.getElementById('tr4');
            let tdTable = document.createElement('td');

            tdTable.appendChild(buttonsDaysMonth);
            trTable.appendChild(tdTable);
        }
        else{
            if(element == 29){
                let trTable = document.createElement('tr');
                trTable.id = 'tr5'

                let tdTable = document.createElement('td');

                tdTable.appendChild(buttonsDaysMonth);
                trTable.appendChild(tdTable);

                table.appendChild(trTable);
            }

            let trTable = document.getElementById('tr5');
            let tdTable = document.createElement('td');

            tdTable.appendChild(buttonsDaysMonth);
            trTable.appendChild(tdTable);
        }

    });
    
};

//Verificar que CheckBox estan Activos
const verifyCheckBox = (div) => {
    
    let daysActive = [];

    let divThings = div.querySelectorAll('input');
    
    divThings.forEach(element => {
        if(element.checked){
            daysActive.push(element.value);
        }
    });

    return daysActive;
};

//Verificar que Buttons estan Activos 
const verifyButtonsMonth = (div) => {
    let daysActive = [];   
    let buttonsOnDiv = div.querySelectorAll('button');

    buttonsOnDiv.forEach(element => {
        if(element.disabled){
            daysActive.push(element.textContent);
        }
    });


    return daysActive;
}

//Revisa en que seleccion se encuentra el selector de frecuencia y muestra en el divContenedor de Checkboxs lo correspondiente
const updateDivFrequecy = (div, select) => {
    if(select.value == 'weekly'){
        //Reiniciar el contenido del Div
        div.innerHTML = '';
        //Agregar los CheckBox de los dias al Div
        addDaysCheckBoxDiv(div);
    }
    else if(select.value == 'monthly'){
        //Reiniciar el contenido del Div
        div.innerHTML = '';
        //Agregar la tabla de Botonesal div
        addMonthsTableDiv(div);
    }
};

//Funcion para verificar si hay una sesion activa
const verifySession = () => {
    if(!localStorage.getItem('user')){
        window.location.href = '/index.html'
    }
};

//Verificar si existe una sesion activa, de lo contrario enviar al index
verifySession();
//Funcion para mostrar por pantalla los registros que hay de caminos en la base de datos
fetchWaysGET();

//Test Functions
//showTasks();