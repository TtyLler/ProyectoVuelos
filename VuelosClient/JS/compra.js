const API_URL = 'http://localhost:5179/api/vuelos/'
let vuelos = []

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
    const monto = document.querySelector('#salidasVuelos')
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
          <td><button class="btn btn-primary" onclick="SeleccionarVuelo(${vuelo['monto']})">Seleccionar</button></td>
        </tr>
        `
    }})
    monto.innerHTML = vueloHTML
  }

  getVueloSalidas()




//metodo para calcular el precio
function CalcularMonto(){
    const valorMonto = parseFloat(document.getElementById('cantidadMonto').value);

    if (valorMonto === 0) {
        alert("Seleccione el vuelo");
        return;
    }
    const valorCantidad = parseFloat(document.getElementById('cantidadHiddenBoleto').value) + 1;
    document.getElementById('cantidadHiddenBoleto').value = valorCantidad.toString();
    document.getElementById('renderCantidadBoletos').innerHTML = valorCantidad.toString() + " Boletos";
    const valor = parseFloat(valorCantidad)*parseFloat(valorMonto);
    document.getElementById('renderMonto').innerHTML = valor.toString();
}

//Seleccionar vuelo

function SeleccionarVuelo(monto){
    //alert(monto)
    document.getElementById('cantidadHiddenBoleto').value = 0;
    document.getElementById('cantidadMonto').value = monto;
}

//Confirmar compra


  