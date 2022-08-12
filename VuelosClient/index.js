const API_URL = 'http://localhost:5179/api/'
let paises = []
let puertas = []
let aerolineas = []


const getPais = () => {
  fetch(API_URL+'paises')
    .then((response) => response.json())
    .then((data) => {
      paises = data
      renderPais(paises)
      console.log(data)
    })
}

const renderPais = (paises) =>{
  const consecutivoTable = document.querySelector('#paisBody')
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
  consecutivoTable.innerHTML = paisHTML
}

const getPuerta = () => {
  fetch(API_URL+'puertas')
    .then((response) => response.json())
    .then((data) => {
      puertas = data
      renderPuerta(puertas)
      console.log(data)
    })
}

const renderPuerta = (puertas) =>{
  const consecutivoTable = document.querySelector('#puertaBody')
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
  consecutivoTable.innerHTML = puertaHTML
}

const getAerolinea = () => {
  fetch(API_URL+'aerolineas')
    .then((response) => response.json())
    .then((data) => {
      aerolineas = data
      renderAerolinea(aerolineas)
      console.log(data)
    })
}

const renderAerolinea = (aerolineas) =>{
  const consecutivoTable = document.querySelector('#aerolineasBody')
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
  consecutivoTable.innerHTML = aerolineaHTML
}


getPais()
getPuerta()