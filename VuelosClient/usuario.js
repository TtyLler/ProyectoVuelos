const API_URL = 'http://localhost:5179/api/usuarios/'
let usuarios = []
const modalUsuario = new bootstrap.Modal(document.getElementById('usuarioModal'))
const formUsuario = document.getElementById('usuarioForm')
const nombreUsuario = document.getElementById('nombreUsuario')
const apellido1Usuario = document.getElementById('apellido1Usuario')
const apellido2Usuario = document.getElementById('apellido2Usuario')
const correoUsuario = document.getElementById('correoUsuario')
const userUsuario = document.getElementById('userUsuario')
const contrasenaUsuario = document.getElementById('contrasenaUsuario')
const rolUsuario = document.getElementById('rolUsuario')
let opcion = ''

btnCrearUsuario.addEventListener('click', ()=>{
  nombre.value = ''
  apellido1.value = ''
  apellido2.value = ''
  correo.value = ''
  user.value = ''
  contrasena.value = ''
  rol.value = ''
  opcion = 'crear'
  modalUsuario.show()
})

const getUsuario = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      usuarios = data
      renderUsuario(usuarios)
      console.log(data)
    })
}

const renderUsuario = (usuarios) =>{
  const usuarioTable = document.querySelector('#usuariosBody')
  let usuarioHTML = ''
  usuarios.forEach((usuario) => {
    usuarioHTML += `
      <tr>
        <td>${usuario['idUsuario']}</td>
        <td>${usuario['nombre']}</td>
        <td>${usuario['apellido1']}</td>
        <td>${usuario['apellido2']}</td>
        <td>${usuario['correo']}</td>
        <td>${usuario['usuario1']}</td>
        <td>${usuario['contrasena']}</td>
        <td>${usuario['rol']}</td>
        <td class="text-center"> <a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delete</a> </td>
      </tr>
      `
  })
  usuarioTable.innerHTML = usuarioHTML
}

const on = (element, event, selector, handler) => {
  element.addEventListener(event, e =>{
    if(e.target.closest(selector)){
      handler(e)
    }
  })
}

//Procedimiento Borrar
on(document, 'click', '.btnDelete', e => {
  const fila = e.target.parentNode.parentNode
  const id = fila.children[0].innerHTML
  alertify.confirm("Esta seguro que desea eliminar esta entrada?",
  function(){
      fetch(API_URL+id, {
          method: 'DELETE'
      })
      .then( res => res.json() )
      window.location.reload()
      //alertify.success('Ok')
  },
  function(){
      alertify.error('Cancel')
  })
})

//Procedimiento para Editar
let idform = 0
on(document,'click', '.btnEdit', e =>{
  const fila = e.target.parentNode.parentNode
  idform = fila.children[0].innerHTML
  const nombre= fila.children[1].innerHTML
  const apellido1 = fila.children[2].innerHTML
  const apellido2 = fila.children[3].innerHTML
  const correo = fila.children[4].innerHTML
  const user = fila.children[5].innerHTML
  const contrasena = fila.children[6].innerHTML
  const rol = fila.children[7].innerHTML

  nombreUsuario.value = nombre
  apellido1Usuario.value = apellido1
  apellido2Usuario.value = apellido2
  correoUsuario.value = correo
  userUsuario.value = user
  contrasenaUsuario.value = contrasena
  rolUsuario.value = rol
  opcion = 'editar'
  modalUsuario.show()
})

//Funciones para crear y Editar
formUsuario.addEventListener('submit',(e) => {
  e.preventDefault()
  if(opcion=='crear'){
    fetch(API_URL, {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
          nombre:nombreUsuario.value,
          apellido1:apellido1Usuario.value,
          apellido2:apellido2Usuario.value,
          correo:correoUsuario.value,
          usuario1:userUsuario.value,
          contrasena:contrasenaUsuario.value,
          rol:rolUsuario.value
      })
    })
    .then( response => response.json() )
    .then( data => {
      usuarios.push(data)
      renderUsuario(usuarios)
  })
  }
  if(opcion=='editar'){
    fetch(API_URL+idform, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
          idUsuario: idform,
          nombre:nombreUsuario.value,
          apellido1:apellido1Usuario.value,
          apellido2:apellido2Usuario.value,
          correo:correoUsuario.value,
          usuario1:userUsuario.value,
          contrasena:contrasenaUsuario.value,
          rol:rolUsuario.value
      })
    })
    .then(response => response.json())
  }
  modalUsuario.hide()
})

getUsuario()