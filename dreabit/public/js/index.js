//Funcion para verificar si hay una sesion activa
const verifySession = () => {
    if(localStorage.getItem('user')){
        window.location.href = '/client.html'
    }
};

verifySession();
