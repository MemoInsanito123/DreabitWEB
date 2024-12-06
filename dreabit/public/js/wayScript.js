
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

const deleteYes = document.getElementById('yes_delete');
//Contenedor general
const divContainer = document.getElementById('container');

//Formulario Create Way se envia
formWayCreate.addEventListener('submit', (event) => {
    //Se envia la funcion para conseguir el ID debido a que el fetch trabaja con promesos entonces es necesario hacerlo de esta forma
    getIDUser();
});

//Boton para crear un nuevo way
buttonCreateWay.addEventListener('click', () => {
    modalWayCreate.showModal();
});

//Boton para cancelar el modal Create
buttonCancelWayCrete.addEventListener('click', () => {
    modalWayCreate.close();
});

//Boton para cancelar el modal Edit
buttonCancelWayEdit.addEventListener('click', () => {
    modalWayEdit.close();
});

//Boton para cancelar el modal Delete
buttonCancelWayDelete.addEventListener('click', () => {
    modalWayDelete.close();
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

            formTaskCreate.addEventListener('submit', (event) => {
                event.preventDefault();
                let idWay = id_way;


                

                console.log(idWay);
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