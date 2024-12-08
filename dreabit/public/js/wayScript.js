
//Guardamos las etiquetas en constantes para posteriormente utilizarlas

//Modales de Way
const modalWayCreate = document.getElementById('modal_way_create');
const modalWayEdit = document.getElementById('modal_way_edit');
const modalWayDelete = document.getElementById('modal_way_delete');

//Modales de Task
const modalTaskCreate = document.getElementById('modal_task_create');

//Formularios de Way
const formWayCreate = document.getElementById('form_way_create');
const formWayEdit = document.getElementById('form_way_edit');

//Formularios de Task
const formTaskCreate = document.getElementById('form_task_create');

//Botones de Way
const buttonCreateWay = document.getElementById('add_way');

const buttonCancelWayCrete = document.getElementById('modal_button_cancel_create');
const buttonCancelWayEdit = document.getElementById('modal_button_cancel_edit');
const buttonCancelWayDelete = document.getElementById('no_delete');

//Botones de Task
const buttonCancelTaskCreate = document.getElementById('modal_task_cancel');

const deleteYes = document.getElementById('yes_delete');
//Contenedor general
const divContainer = document.getElementById('container');
//Contenedor para dias
const divContainerFrequency = document.getElementById('container_frequency');

//Select de taks
const selectFrequency = document.getElementById('frequency');
const selectPriority = document.getElementById('priority');

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
});

//Boton para cancelar el modal Edit Way
buttonCancelWayEdit.addEventListener('click', () => {
    modalWayEdit.close();
});

//Boton para cancelar el modal Delete Way
buttonCancelWayDelete.addEventListener('click', () => {
    modalWayDelete.close();
});

//Boton para cancelar el modal de Create Task
buttonCancelTaskCreate.addEventListener('click', () => {
    modalTaskCreate.close();
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
        buttonAddTask.innerHTML = 'Crear Tarea';
        //Funcion para crear Tareas
        buttonAddTask.addEventListener('click', () => {
            
            modalTaskCreate.showModal();

            //Verificar en que opcion se encuentra el selector de frecuencia
            updateDivFrequecy();


            //Funcion para cuando el Selector cambie
            selectFrequency.addEventListener('change', () => {
                //Actualizamos ese div dependiendo de la opcion
                updateDivFrequecy();
            });

            //Cuando el formulario del modal Create task se envia
            formTaskCreate.addEventListener('submit', (event) => {
                event.preventDefault();
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
                    frequency_days: verifyCheckBox().join(','),
                    frequency_months : verifyButtonsMonth().join(','),
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
        h2WaysNames.innerHTML = name_way;
        
        //Crear un parrafo para la descripcion del camino
        let pWaysDescriptions = document.createElement('p');
        pWaysDescriptions.innerHTML = description_way;
    
        //Agregar los elementos al div de Camino
        divWays.appendChild(h2WaysNames);
        divWays.appendChild(pWaysDescriptions);
        divWays.appendChild(buttonDeleteWay);
        divWays.appendChild(buttonEditWay);
        divWays.appendChild(buttonAddTask);

        showTasks(divWays);

        //Agregar el div de camino al Contenedor principal
        divContainer.appendChild(divWays);
    });
};

//Mostrar las tareas en el DOM le pasamos como parametro el divWay para agregarlo al mismo camino
const showTasks = (divWay) => {
    //Obtemos el ID del Usuario mediante el correo electronico almacenado en el LocalStorage
    fetch('/sessions/getID' , {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({email : localStorage.getItem('user') || 'dreabit@gmail.com'})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let idUser;
        //Iteramos el argumento data que forzosamente tiene longitud 1
        data.forEach(element => {
            idUser = element.id_user;
        });

        //Obtener las tareas mediante el ID de usuario
        fetch('/tasks/get', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({id_user : idUser})
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                //Desestruturar la informacion del elemento que iteramos
                let {id_task, task, frequency_days, frequency_months, priority_type} = element;

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
                let frequency_final;

                if(frequency_days !== null){
                    frequency_final = frequency_days.split(',');
                }
                else if(frequency_months !== null){
                    frequency_final = frequency_months.split(',');
                }
                else if(frequency_days === null && frequency_months === null){
                    frequency_final = 'NULL';
                }
                else{
                    frequency_final = 'NULL';
                }

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
                deleteButton.textContent = 'Eliminar Tarea';
                //Agregar al contenedor del boton el boton
                deleteContainer.appendChild(deleteButton);

                // Título de la tarea
                const taskTitle = document.createElement('h2');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = task.name_task;

                // Acciones (botones de editar y agregar subtarea)
                //Contenedor de acciones
                const actions = document.createElement('div');
                actions.classList.add('actions');

                const editButton = document.createElement('button');
                editButton.classList.add('edit-button');
                editButton.textContent = 'Editar Tarea';

                const addButton = document.createElement('button');
                addButton.classList.add('add-button');
                addButton.textContent = 'Agregar Sub-tarea';

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
                    <span>Hora: </span>
                    <span>de</span>
                    <span class="time-start">${task.start_time}</span>
                    <span>hasta</span>
                    <span class="time-end">${task.end_time}</span>
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
                const frequency = document.createElement('div');
                frequency.classList.add('frequency');

                //Contenedor para la informacion de la frecuencia
                const frequencyData = document.createElement('div');
                frequencyData.classList.add('frequency-data');

                //Mediante la frecuencia final
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

                
                if(frequency_days === null && frequency_months !== null){
                    frequency.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Mensual</span>
                    `;    
                }
                else if(frequency_months === null && frequency_days !== null && frequency_days.length === 14){
                    frequency.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Diaria</span>
                    `;    
                }
                else if (frequency_months === null && frequency_days !== null && frequency_days.length < 14){
                    frequency.innerHTML = `
                    <span>Frecuencia: </span>
                    <span class="frequency-value">Semanal</span>
                    `;  
                }

                const priority = document.createElement('div');
                priority.classList.add('priority');
                priority.innerHTML = `
                    <span>Prioridad: </span>
                    <span class="priority-value">${priority_type}</span>
                `;

                taskDetails.appendChild(frequency);
                taskDetails.appendChild(priority);
                taskDetails.appendChild(frequencyData);

                // Agregar todos los elementos al contenedor principal
                taskCard.appendChild(taskHeader);
                taskCard.appendChild(taskTime);
                taskCard.appendChild(taskDescription);
                taskCard.appendChild(taskDetails);

                // Agregar al DOM
                divWay.appendChild(taskCard);

            })
        })
        .catch(err => {
            console.error(err);
        })
    })
    .catch(err => {
        console.error(err);
    })
};

//Agregar los CheckBoxDays al Div
const addDaysCheckBoxDiv = () => {
    let days = ['L','M','MI','J','V','S','D'];
    days.forEach(element => {
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = element;
        checkBox.value = element;

        let label = document.createElement('label');
        label.for = element;
        label.innerHTML = element;

        divContainerFrequency.appendChild(label);
        divContainerFrequency.appendChild(checkBox);
    });
};

//Agrega una tabla que contenga botones con los dias del mes al Div
const addMonthsTableDiv = () => {
    //Creamos un Array de 31 elementos que repesentarian los dias del mes
    let daysMonth = [...Array(31).keys()].map(i => i + 1);

    //Creamos una tabla donde se almacenaran todos los botones de los dias
    let table = document.createElement('table');
    table.id = 'table_days_month';

    divContainerFrequency.appendChild(table);

    //Configurar la tabla con los botones
    daysMonth.forEach(element => {
        let buttonsDaysMonth = document.createElement('button');
        buttonsDaysMonth.innerHTML = element.toString();
        
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
const verifyCheckBox = () => {
    
    let daysActive = [];

    let divThings = divContainerFrequency.querySelectorAll('input');
    
    divThings.forEach(element => {
        if(element.checked){
            daysActive.push(element.value);
        }
    });
    return daysActive;
};

//Verificar que Buttons estan Activos 
const verifyButtonsMonth = () => {
    let daysActive = [];   
    let buttonsOnDiv = divContainerFrequency.querySelectorAll('button');

    buttonsOnDiv.forEach(element => {
        if(element.disabled){
            daysActive.push(element.textContent);
        }
    });

    return daysActive;
}

//Revisa en que seleccion se encuentra el selector de frecuencia y muestra en el divContenedor de Checkboxs lo correspondiente
const updateDivFrequecy = () => {
    if(selectFrequency.value == 'weekly'){
        //Reiniciar el contenido del Div
        divContainerFrequency.innerHTML = '';
        //Agregar los CheckBox de los dias al Div
        addDaysCheckBoxDiv();
    }
    else{
        //Reiniciar el contenido del Div
        divContainerFrequency.innerHTML = '';
        //Agregar la tabla de Botonesal div
        addMonthsTableDiv();

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