const API_URL = 'http://localhost:5179/api/'
let paises = []







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



