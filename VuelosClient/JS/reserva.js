const API_URL = 'http://localhost:5179/api/vuelos/'
let vuelos = []
let valor = 0;
let cantidad = 0
const btn_regis = document.getElementById('btn_reserva');


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
          <td><button class="btn btn-primary btn-block" onclick="SeleccionarVueloReserva(${vuelo['monto']})">Seleccionar</button></td>
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
    let valorFinal = parseFloat(valorCantidad)*parseFloat(valorMonto);
    document.getElementById('renderMontoReserva').innerHTML = valorFinal
    cantidad = valorCantidad
    valor = valorFinal;
}

//Seleccionar vuelo

function SeleccionarVueloReserva(monto){
    //alert(monto)
    document.getElementById('cantidadHiddenBoletoReserva').value = 0;
    document.getElementById('cantidadMontoReserva').value = monto;
}

//confirmar reserva
  btn_regis.addEventListener('click', prueba=()=>{
    let montoFinal = valor;
    let usuario = localStorage.getItem('user');
    let idUsuario = localStorage.getItem('id')

    function generateNumReservacion() {
      var length = 8,
          charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
    }

    fetch('http://localhost:5179/api/reservaciones', {
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify({
          numReservacion:generateNumReservacion(),
          idUsuario:idUsuario,
          cantidadBoletos:cantidad,
          idVuelo:1,
          monto: montoFinal
      })
    })
    alert('Reserva realizada por '+(usuario)+' por un monto total de $'+(montoFinal))
    window.location.reload()
  })


