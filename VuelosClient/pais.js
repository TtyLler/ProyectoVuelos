const API_URL = 'http://localhost:5179/api/paises/'
let aerolineas = []
const modalAerolinea = new bootstrap.Modal(document.getElementById('paisModal'))
const formPais = document.getElementById('paisForm')
const codigoPais = document.getElementById('codPais')
const nombrePais= document.getElementById('nombrePais')
let opcion = ''

btnCrearPais.addEventListener('click', ()=>{
  codigoPais.value = ''
  nombrePais.value = ''
  opcion = 'crear'
  modalArticulo.show()
})

const getPais = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      paises = data
      renderPais(paises)
      console.log(data)
    })
}

const renderPais = (paises) =>{
  const paisTable = document.querySelector('#paisBody')
  let paisHTML = ''
  paises.forEach((pais) => {
    paisHTML += `
      <tr>
        <td>${pais['codPais']}</td>
        <td>${pais['nombre']}</td>
        <td class="text-center"> <a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delete</a> </td>
      </tr>
      `
  })
  paisTable.innerHTML = paisHTML
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
  const nombre = fila.children[1].innerHTML

  codigoPais.value = idform
  nombrePais.value = nombre
  opcion = 'editar'
  modalAerolinea.show()
})

//Funciones para crear y Editar
formPais.addEventListener('submit',(e) => {
  e.preventDefault()
  if(opcion=='crear'){
    fetch(API_URL, {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
          codPais:codigoPais.value,
          nombre:nombrePais.value,
      })
    })
    .then( response => response.json() )
    .then( data => {
      aerolineas.push(data)
      renderAerolinea(aerolineas)
  })
  }
  if(opcion=='editar'){
    fetch(API_URL+idform, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
          codPais:codigoPais.value,
          nombre:nombrePais.value,
      })
    })
    .then(response => response.json())
  }
  modalAerolinea.hide()
})


getPais()