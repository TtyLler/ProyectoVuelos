const API_URL = 'http://localhost:5179/api/usuarios/'
let usuarios = []

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

getUsuario()