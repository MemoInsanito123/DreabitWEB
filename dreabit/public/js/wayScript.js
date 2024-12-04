
//Guardamos las etiquetas en constantes para posteriormente utilizarlas
const modalWay = document.getElementById('modal_way');
const buttonWay = document.getElementById('add_way');
const formWay = document.getElementById('form_way');
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
        email : localStorage.getItem('user') || 'dreabituwu@gmail.com'
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

//Funcion para ejecutar la llamada al fetch de POST
const fetchWaysPOST = () => {
    
 

    fetch('/ways/post', {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(),
    })

};

//Mostrar los caminos cada vez que inicia la pagina
//Se le pasa como atributo un objeto que contenga la informacion
const showWays = (JSON_data) => {

    //Se itera dicho objeto (array) una cantidad de n veces
    JSON_data.forEach(element => {

        console.log(element);

        //Desestructurar el JSON del elemento
        let {id_cycle, name_cycle, description_cycle} = element;

        let divWays = document.createElement('div');
        divWays.className = 'way';
    
        let buttonDelete = document.createElement('button');
        buttonDelete.className = 'delete';
        buttonDelete.innerHTML = 'Eliminar';
        buttonDelete.addEventListener('click',() => {

        });
    
        let pWaysNames = document.createElement('p');
        pWaysNames.innerHTML = name_cycle;
        
        let pWaysDescriptions = document.createElement('p');
        pWaysDescriptions.innerHTML = description_cycle;
    
        divWays.appendChild(pWaysNames);
        divWays.appendChild(pWaysDescriptions);
        divWays.appendChild(buttonDelete);

        divContainer.appendChild(divWays);
    });

};

fetchWaysGET();
