// variables
const URL= 'http://localhost:5179/api/usuarios/';

const getUsuario=()=>{
    fetch(URL)
    .then((Response) => Response.json())
    .then((data) => {
        usuarios = data
        validationUser();
    })
}

async function validationUser(){
    const login_btn = document.getElementById('btn_loginUser');
    const user = document.getElementById('input_usuario');
    const password = document.getElementById('input_password');

    login_btn.addEventListener("click", prueba=()=>{
        if(!user.value){
            alert('Ingrese un usuario!')
        }
        if(!password.value){
            alert('Debe ingresar una contraseña!')
        }

        usuarios.forEach((usuario) => {
            if(user.value == usuario.usuario1){
                if(password.value == usuario.contrasena){
                    //localStorage.setItem("idusuario",1);
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

//esconder registro

/*async function mostrar_registro() {
    const register_btn = document.getElementById('btn_registerUser')

    register_btn.addEventListener("click", registration =()=>{
        const div = document.getElementById('box_registro');
        if(div.style.display == 'block'){
            div.style.display = 'none';
        } else {
            div.style.display ='block';
        }
    })
};*/


