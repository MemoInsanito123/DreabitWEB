
//Obtener el formulario de donde se envia la informacion del login
const FORM_LOGIN = document.getElementById('form_login').addEventListener('submit', (event) => {

    //Evitar el envio regular del formulario
    event.preventDefault();

    var email = document.getElementById('input_email').value;
    var password = document.getElementById('input_password').value;

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

    if (email === '' || password === '') {
        alert('Por favor completa todos los campos')
        return;
    }

    if ( !regexCorreo.test(email) ) {
        alert('Por favor, ingresa un correo válido')
        return;
    }

    if (password.length > 100 ) {
        alert('Por favor ingresa una contraseña válida')
        return;
    }

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
            alert('Email no registrado o Password incorrecta');
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
