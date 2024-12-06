
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

//Mostrar los caminos cada vez que inicia la pagina
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

                console.log(idWay);
                console.log(JSON_task_post);
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

        //Agregar el div de camino al Contenedor principal
        divContainer.appendChild(divWays);
    });

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
        label.id = element;
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