// variables
const URL= 'http://localhost:5179/api/usuarios/';

const getUsuario=()=>{
    fetch(URL)
    .then((Response) => Response.json())
    .then((data) => {
        usuarios = data
        validationUser();
        console.log(usuarios)
    })
}

async function validationUser(){
    const login_btn = document.getElementById('btn_loginUser');
    const user = document.getElementById('input_usuario');
    const password = document.getElementById('input_password');
    const usuario = usuarios[2]

    login_btn.addEventListener("click", prueba=()=>{
        if(!user.value){
            alert('Ingrese un usuario!')
        }
        if(!password.value){
            alert('Debe ingresar una contraseña!')
        }

        usuarios.forEach((usuario) => {
            if(user.value == usuario.nombre){
                if(password.value == usuario.contrasena){
                    window.open("./cliente/mainPage_cliente.html", "_self")
                }else{
                    alert('Contraseña o Usuario incorrectos! Intente de nuevo')
                    window.location.reload()
                }
            }
        });
    })
}

getUsuario();