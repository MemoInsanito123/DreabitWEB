
//Obtener el formulario de donde se envia la informacion del login
const FORM_LOGIN = document.getElementById('form_signup').addEventListener('submit', (event) => {

    //Evitar el envio regular del formulario
    event.preventDefault();

    //Crear las variables para guardar los datos de los inputs
    let form_email = document.getElementById('input_email').value;
    let form_password = document.getElementById('input_password').value;
    let form_confirm_password = document.getElementById('input_confirm_password').value;

    //Verificar si la password coincide con la confirmacion
    if(form_password === form_confirm_password){
        //Crear el JSON que se le pasara como parametro al body
        let JSON_USER = {
            type : 1,
            email : form_email,
            password : form_password
        };

        createNewUser(JSON_USER);
    }
    else{
        alert('Verifica la password');
    }
});

function createNewUser(JSON_data){
    fetch('/sessions/signup',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(JSON_data)
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Credenciales incorrectas o error del servidor');
        }
    })
    .then(data => {
        console.log('Usuario Registrado');
    })
    .catch(err => {
        console.log(err);
    })
}