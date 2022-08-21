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
  const name = document.getElementById("input_nombre").value;
  const last_name1 = document.getElementById("input_apellido1").value;
  const last_name2 = document.getElementById("input_apellido2").value;
  const email = document.getElementById("input_correo").value;
  const user = document.getElementById("input_usuarioRegistro").value;
  const password = document.getElementById("input_passRegistro").value;
  let datos = {
    nombre: name,
    apellido1: last_name1,
    apellido2: last_name2,
    correo: email,
    usuario1: user,
    constrasena: password,
    rol: 2
  }

  if(!name || !last_name1 || !email || !user || !password ){
    alert('Ingrese todos los datos necesarios!')
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
    .then(
      alert('Usuario registrado correctamente!'),
      clear()
    )
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}


function clear(){
  document.getElementById("input_nombre").value = "",
  document.getElementById("input_apellido1").value = "",
  document.getElementById("input_apellido2").value = "",
  document.getElementById("input_correo").value = "",
  document.getElementById("input_usuarioRegistro").value = "",
  document.getElementById("input_passRegistro").value = ""
}

getRegistro();
  