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
        localStorage.setItem("user", user.value);
        if(!user.value){
            alert('Ingrese un usuario!')
        }
        if(!password.value){
            alert('Debe ingresar una contraseña!')
        }

        usuarios.forEach((usuario) => {
            if(usuario.rol == 1){
                if(user.value == usuario.usuario1){
                    if(password.value == usuario.contrasena){
                        localStorage.setItem('id', usuario.idUsuario);
                        clear()
                        window.open("./admin/mainPage_Admin.html", "_self")
                    }else{
                        clear()
                        alert('Contraseña o Usuario incorrectos! Intente de nuevo')
                        window.location.reload()
                    }
                }
            }

            if(usuario.rol == 2){
                if(user.value == usuario.usuario1){
                    if(password.value == usuario.contrasena){
                        localStorage.setItem('id', usuario.idUsuario);
                        clear()
                        window.open("./cliente/mainPage_cliente.html", "_self")
                    }else{
                        clear()
                        alert('Contraseña o Usuario incorrectos! Intente de nuevo')
                        window.location.reload()
                    }
                }
            }

        });
    })
}

getUsuario();

function clear(){
    document.getElementById("input_usuario").value = "",
    document.getElementById("input_password").value = ""
}

//esconder registro

async function mostrar_registro() {
    const register_btn = document.getElementById('btn_registerUser')

    register_btn.addEventListener("click", registration =()=>{
        const div = document.getElementById('box_registro');
        const div2 = document.getElementById('vertical');
        if(div.style.display == 'block'){
            div.style.display = 'none';
            div2.style.display = 'none';
        } else {
            div.style.display ='block';
            div2.style.display='block';
        }
    })
};