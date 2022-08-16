const API_URL = 'http://localhost:5179/api/puertas/'
let puertas = []
const modalAerolinea = new bootstrap.Modal(document.getElementById('puertaModal'))
const formPuerta = document.getElementById('puertaForm')
const codigoPuerta = document.getElementById('codPuerta')
const numeroPuerta = document.getElementById('numPuerta')
const detallePuerta = document.getElementById('detalle')
let opcion = ''

btnCrearPuerta.addEventListener('click', ()=>{
  codigoPuerta.value = ''
  numeroPuerta.value = ''
  detallePuerta.value = ''
  opcion = 'crear'
  modalArticulo.show()
})

const getPuerta = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      puertas = data
      renderPuerta(puertas)
      console.log(data)
    })
}

const renderPuerta = (puertas) =>{
  const puertaTable = document.querySelector('#puertaBody')
  let puertaHTML = ''
  puertas.forEach((puerta) => {
    puertaHTML += `
      <tr>
        <td>${puerta['codPuerta']}</td>
        <td>${puerta['numPuerta']}</td>
        <td>${puerta['detalle']}</td>
        <td class="text-center"> <a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delete</a> </td>
      </tr>
      `
  })
  puertaTable.innerHTML = puertaHTML
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
  const detalle = fila.children[2].innerHTML

  console.log(detalle)

  codigoPuerta.value = idform
  numeroPuerta.value = nombre
  detallePuerta.value = detalle
  opcion = 'editar'
  modalAerolinea.show()
})

//Funciones para crear y Editar
formPuerta.addEventListener('submit',(e) => {
  e.preventDefault()
  if(opcion=='crear'){
    fetch(API_URL, {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
          codPuerta:codigoPuerta.value,
          numPuerta:numeroPuerta.value,
          detalle:detallePuerta.value
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
          codPuerta:codigoPuerta.value,
          numPuerta:numeroPuerta.value,
          detalle:detallePuerta.value
      })
    })
    .then(response => response.json())
  }
  modalAerolinea.hide()
})

getPuerta()