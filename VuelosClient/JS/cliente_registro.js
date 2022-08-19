const API_URL = 'http://localhost:5179/api/usuarios/'
let usuarios = []

const form_registro = document.getElementById('form_registro')
const input_nombre = document.getElementById('input_nombre')
const input_apellido1 = document.getElementById('input_apellido1')
const input_apellido2 = document.getElementById('input_apellido2')
const input_correo = document.getElementById('input_correo')
const input_usuarioRegistro = document.getElementById('input_usuarioRegistro')
const input_passRegistro = document.getElementById('input_passRegistro')


const getRegistro = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        usuarios = data
        document.getElementById('btn_registro_cliente').addEventListener("click", registration)
    })
}
/*const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
      if(e.target.closest(selector)){
        handler(e)
      }
    })
}*/



function registration(e){

  const preformDatos = new FormData(form_registro);
  const formDatos = new URLSearchParams(preformDatos);
  const nombre = document.getElementById("input_nombre").value;
  const apellido1 = document.getElementById("input_apellido1").value;
  const apellido2 = document.getElementById("input_apellido2").value;
  const correo = document.getElementById("input_correo").value;
  const usuario = document.getElementById("input_usuarioRegistro").value;
  const constrasena = document.getElementById("input_passRegistro").value;
  let datos = {
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    correo: correo,
    usuario1: usuario,
    constrasena: constrasena,
    rol: 2,
    rolNavigation: null
  }

  if(!nombre.value || !apellido1.value || !correo.value || !usuario.value || !constrasena.value){
    alert('Llene todos los campos!')
  }else{
    e.preventDefault();
    fetch(API_URL, {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(datos)
    })
  
    .then( response => response.json())
    .then( data => usuarios.push(data))
  }
}

getRegistro();
  