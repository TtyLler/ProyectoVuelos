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
    const monto = document.querySelector('#salidasVuelosReserva')
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
          <td><button class="btn btn-primary" onclick="SeleccionarVueloReserva(${vuelo['monto']})">Seleccionar</button></td>
        </tr>
        `
    }})
    monto.innerHTML = vueloHTML
  }

  getVueloSalidas()




//metodo para calcular el precio
function CalcularMonto(){
    const valorMonto = parseFloat(document.getElementById('cantidadMontoReserva').value);

    if (valorMonto === 0) {
        alert("Seleccione el vuelo");
        return;
    }
    const valorCantidad = parseFloat(document.getElementById('cantidadHiddenBoletoReserva').value) + 1;
    document.getElementById('cantidadHiddenBoletoReserva').value = valorCantidad.toString();
    document.getElementById('renderCantidadBoletoReserva').innerHTML = valorCantidad.toString() + " Boletos";
    const valor = parseFloat(valorCantidad)*parseFloat(valorMonto);
    document.getElementById('renderMontoReserva').innerHTML = valor.toString();
}

//Seleccionar vuelo

function SeleccionarVueloReserva(monto){
    //alert(monto)
    document.getElementById('cantidadHiddenBoletoReserva').value = 0;
    document.getElementById('cantidadMontoReserva').value = monto;
}


//confirmar reserva