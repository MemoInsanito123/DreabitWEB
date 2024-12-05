
//Guardamos las etiquetas en constantes para posteriormente utilizarlas
//Modales --PEDIENTE
const modalWay = document.getElementById('modal_way_create');
const madalWayEdit = document.getElementById('modal_way_edit');
const formWay = document.getElementById('form_way');

const buttonWay = document.getElementById('add_way');
const buttonCancel = document.getElementById('modal_button_cancel');

const divContainer = document.getElementById('container');

//Cuando el formulario se mande
formWay.addEventListener('submit', (event) => {


});

//Boton para crear un nuevo way
buttonWay.addEventListener('click', () => {
    modalWay.showModal();
});

//Boton para cancelar el modal
buttonCancel.addEventListener('click', () => {
    modalWay.close();
});

//Funcion para ejecutar la llamada al fetch de GET
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

//Funcion para ejecutar la llamada al fetch de POST para agregar ways
//--PENDIENTE
const fetchWaysPOST = () => {
    
    //JSON para el email
    const JSON_EMAIL = {
        email : localStorage.getItem('user') || 'dreabit@gmail.com'
    };

    //Fetch para hacer la peticion a los metodos de la base de datos
    fetch('/ways/post', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(JSON_EMAIL),
    })
    .then(response => response.json())
    .then(data => {

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

        //Div para el camino=
        let divWays = document.createElement('div');
        divWays.className = 'way';
    
        //Boton para eliminar el camino
        let buttonDeleteWay = document.createElement('button');
        buttonDeleteWay.className = 'deleteWay';
        buttonDeleteWay.innerHTML = 'Eliminar';
        //Funcion ara eliminar el Camino
        buttonDeleteWay.addEventListener('click',() => {

        });

        //Boton para editar el camino
        let buttonEditWay = document.createElement('button');
        buttonEditWay.className = 'editWay';
        buttonEditWay.innerHTML = 'Editar'
        //Funcion para editar los caminos
        buttonEditWay.addEventListener('click', () => {

        });
    
        //Crear un encabezado para el nombre del camino
        let pWaysNames = document.createElement('h2');
        pWaysNames.innerHTML = name_way;
        
        //Crear un parrafo para la descripcion del camino
        let pWaysDescriptions = document.createElement('p');
        pWaysDescriptions.innerHTML = description_way;
    
        //Agregar los elementos al div de Camino
        divWays.appendChild(pWaysNames);
        divWays.appendChild(pWaysDescriptions);
        divWays.appendChild(buttonDeleteWay);
        divWays.appendChild(buttonEditWay);

        //Agregar el div de camino al Contenedor principal
        divContainer.appendChild(divWays);
    });

};

fetchWaysGET();
