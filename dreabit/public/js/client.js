
//Funcion para el boton de cerrar sesion
const buttonLogout = document.getElementById('button_logout')
    .addEventListener('click', () => {
        localStorage.removeItem('user');
        verifySession();
    });

//Funcion para verificar si hay una sesion activa
const verifySession = () => {
    if(!localStorage.getItem('user')){
        window.location.href = '/index.html'
    }
};

verifySession();
