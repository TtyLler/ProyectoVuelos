const API_URL = 'http://localhost:5179/api/vuelos/'
let vuelos = []
const searchInputSalidas = document.getElementById('searchInputSalidas')

btnSearchSalidas.addEventListener('click', ()=>{
  searchSalidas()
})

btnResetSalidas.addEventListener('click', ()=>{
  getVueloSalidas()
  searchInputSalidas.value = ''
})

const searchSalidas = () => {
  const monto = document.querySelector('#salidasVuelosBody')
  let vueloHTML = ''
  vuelos.forEach(vuelo => {
    if(vuelo['estado'] != 'Arrivando' && vuelo['vuelo1'] == searchInputSalidas.value) {
      vueloHTML += `
      <tr>
        <td>${vuelo['vuelo1']}</td>
        <td>${vuelo['codAerolinea']}</td>
        <td>${vuelo['procedencia']}</td>
        <td>${vuelo['fecha']}</td>
        <td>${vuelo['hora']}</td>
        <td>${vuelo['estado']}</td>
        <td>${vuelo['codPuerta']}</td>
        <td>${vuelo['monto']}</td>
      </tr>
      `
    }
  })
  monto.innerHTML = vueloHTML
}


const getVueloSalidas = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      vuelos = data
      renderVueloSalidas(vuelos)
      console.log(data)
    })
}

const renderVueloSalidas = (vuelos) =>{
  const monto = document.querySelector('#salidasVuelosBody')
  let vueloHTML = ''
  vuelos.forEach(vuelo => {if(vuelo['estado'] !== 'Arrivando'){
    vueloHTML += `
      <tr>
        <td>${vuelo['vuelo1']}</td>
        <td>${vuelo['codAerolinea']}</td>
        <td>${vuelo['procedencia']}</td>
        <td>${vuelo['fecha']}</td>
        <td>${vuelo['hora']}</td>
        <td>${vuelo['estado']}</td>
        <td>${vuelo['codPuerta']}</td>
        <td>${vuelo['monto']}</td>
      </tr>
      `
  }})
  monto.innerHTML = vueloHTML
}

getVueloSalidas()