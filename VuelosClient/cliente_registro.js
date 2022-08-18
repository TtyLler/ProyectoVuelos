const API_URL = 'http://localhost:5179/api/usuarios/'
let usuarios = []

const form_registro = document.getElementById('form_registro')
const input_nombre = document.getElementById('input_nombre')
const input_apellido1 = document.getElementById('input_apellido1')
const input_apellido2 = document.getElementById('input_apellido2')
const input_correo = document.getElementById('input_correo')
const input_usuarioRegistro = document.getElementById('input_usuarioRegistro')
const input_passRegistro = document.getElementById('input_passRegistro')


const getUsuario = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        usuarios = data
        console.log(data)
    })
}
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
      if(e.target.closest(selector)){
        handler(e)
      }
    })
}


form_registro.addEventListener('submit',(e) => {
    e.preventDefault();
    const preformDatos = new FormData(form_registro);
    const formDatos = new URLSearchParams(preformDatos);
      fetch(API_URL, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: formDatos,
        })
      })
      .then( response => response.json())
      .then( data => {
        usuarios.push(data)
});

getUsuario();
  