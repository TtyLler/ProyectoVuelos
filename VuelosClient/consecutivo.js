const API_URL = 'http://localhost:5179/api/consecutivos/'
let consecutivos = []
const modalAerolinea = new bootstrap.Modal(document.getElementById('consecutivoModal'))
const formAerolinea = document.getElementById('consecutivoForm')
//Inputs
const idConsecutivo = document.getElementById('idConsecutivo')
const valorConsecutivo = document.getElementById('valorConsecutivo')
const descripcionConsecutivo = document.getElementById('descripcionConsecutivo')
const prefijoConsecutivo = document.getElementById('prefijoConsecutivo')
const riConsecutivo = document.getElementById('riConsecutivo')
const rfConsecutivo = document.getElementById('rfConsecutivo')
let opcion = ''

btnCrearConsecutivo.addEventListener('click', ()=>{
  idConsecutivo.value = ''
  valorConsecutivo.value = ''
  descripcionConsecutivo.value = ''
  prefijoConsecutivo.value = ''
  riConsecutivo.value = ''
  rfConsecutivo.value = ''
  opcion = 'crear'
  modalArticulo.show()
})

const getConsecutivo = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      consecutivos = data
      renderConsecutivo(consecutivos)
      console.log(data)
    })
}

const renderConsecutivo = (consecutivos) =>{
  const consecutivoTable = document.querySelector('#consecutivoBody')
  let consecutivoHTML = ''
  consecutivos.forEach((consecutivos) => {
    consecutivoHTML += `
      <tr>
        <td>${consecutivos['idConsecutivo']}</td>
        <td>${consecutivos['valor']}</td>
        <td>${consecutivos['descripcion']}</td>
        <td>${consecutivos['prefijo']}</td>
        <td>${consecutivos['rangoInicial']}</td>
        <td>${consecutivos['rangoFinal']}</td>
        <td class="text-center"> <a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delete</a> </td>
      </tr>
      `
  })
  consecutivoTable.innerHTML = consecutivoHTML
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
  const valor = fila.children[1].innerHTML
  const descripcion = fila.children[2].innerHTML
  const prefijo = fila.children[3].innerHTML
  const rangoInicial = fila.children[4].innerHTML
  const rangoFinal = fila.children[5].innerHTML


  idConsecutivo.value = idform
  valorConsecutivo.value = valor
  descripcionConsecutivo.value = descripcion
  prefijoConsecutivo.value = prefijo
  riConsecutivo.value = rangoInicial
  rfConsecutivo.value = rangoFinal

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
        valor:valorConsecutivo.value,
        descripcion:descripcionConsecutivo.value,
        prefijo:prefijoConsecutivo.value,
        rangoInicial:riConsecutivo.value,
        rangoFinal:rfConsecutivo.value
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
        idConsecutivo:idConsecutivo.value,
        valor:valorConsecutivo.value,
        descripcion:descripcionConsecutivo.value,
        prefijo:prefijoConsecutivo.value,
        rangoInicial:riConsecutivo.value,
        rangoFinal:rfConsecutivo.value
      })
    })
    .then(response => response.json())
  }
  modalAerolinea.hide()
})

getConsecutivo()