const API_URL = 'http://localhost:5179/api/aerolineas/'
let aerolineas = []
const modalAerolinea = new bootstrap.Modal(document.getElementById('aerolineaModal'))
const formAerolinea = document.getElementById('aerolineaForm')
const codigoAerolinea = document.getElementById('codAerolinea')
const nombreAerolinea = document.getElementById('nombreAerolinea')
let opcion = ''

btnCrearAerolinea.addEventListener('click', ()=>{
  codigoAerolinea.value = ''
  nombreAerolinea.value = ''
  opcion = 'crear'
  modalAerolinea.show()
})

const getAerolinea = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      aerolineas = data
      renderAerolinea(aerolineas)
      console.log(data)
    })
}

const renderAerolinea = (aerolineas) =>{
  const aerolineaTable = document.querySelector('#aerolineasBody')
  let aerolineaHTML = ''
  aerolineas.forEach((aerolinea) => {
    aerolineaHTML += `
      <tr>
        <td>${aerolinea['codAerolinea']}</td>
        <td>${aerolinea['nombre']}</td>
        <td class="text-center"> <a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delete</a> </td>
      </tr>
      `
  })
  aerolineaTable.innerHTML = aerolineaHTML
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

  codigoAerolinea.value = idform
  nombreAerolinea.value = nombre
  opcion = 'editar'
  modalAerolinea.show()
})

//Funciones para crear y Editar
formAerolinea.addEventListener('submit',(e) => {
  e.preventDefault()
  if(opcion=='crear'){
    fetch(API_URL, {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
          codAerolinea:codigoAerolinea.value,
          nombre:nombreAerolinea.value,
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
        codAerolinea:codigoAerolinea.value,
        nombre:nombreAerolinea.value,
      })
    })
    .then(response => response.json())
  }
  modalAerolinea.hide()
})


getAerolinea()