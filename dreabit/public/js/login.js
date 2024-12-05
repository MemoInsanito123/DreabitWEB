
//Obtener el formulario de donde se envia la informacion del login
const FORM_LOGIN = document.getElementById('form_login').addEventListener('submit', (event) => {

    //Evitar el envio regular del formulario
    event.preventDefault();

    //Crear el JSON que se le pasara como parametro al body
    let JSON_LOGIN = {
        email : document.getElementById('input_email').value,
        password : document.getElementById('input_password').value
    };
    
    fetch('/sessions/login',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(JSON_LOGIN)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas o error del servidor');
        }
        return response.json();
    })
    .then(data => {
        if(data.status){
            switch(data.role){
                case 1 :
                    localStorage.setItem('user', JSON_LOGIN.email);
                    window.location.href = '/client.html';
                    break;
                case 2:
                    window.location.href = '/admin.html';
                    break;
                case 3:
                    window.location.href = '/super_admin.html';
                    break;
            }
        }
        else{
            alert(data.message);
        }
    })
    .catch(err => {
        console.log(err);
    });

});

//Funcion para verificar si hay una sesion activa
const verifySession = () => {
    if(localStorage.getItem('user')){
        window.location.href = '/client.html'
    }
};

verifySession();
