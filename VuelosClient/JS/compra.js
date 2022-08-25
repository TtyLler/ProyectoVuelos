const API_URL = 'http://localhost:5179/api/vuelos/'
let vuelos = []
let valor = 0;
let cantidad = 0
const btn_compra = document.getElementById('btn_compra');

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
    let valorFinal = parseFloat(valorCantidad)*parseFloat(valorMonto);
    document.getElementById('renderMonto').innerHTML = valor.toString();
    cantidad = valorCantidad
    valor = valorFinal;
}

//Seleccionar vuelo

function SeleccionarVuelo(monto){
    //alert(monto)
    document.getElementById('cantidadHiddenBoleto').value = 0;
    document.getElementById('cantidadMonto').value = monto;
}

//Tarjeta

const cleaveCC = new Cleave("#cardNumber", {
  creditCard: true,
  delimiter: "-",
  onCreditCardTypeChanged: function (type) {
    const cardBrand = document.getElementById("cardBrand"),
      visa = "fab fa-cc-visa",
      mastercard = "fab fa-cc-mastercard",
      amex = "fab fa-cc-amex"

    switch (type) {
      case "visa":
        cardBrand.setAttribute("class", visa);
        break;
      case "mastercard":
        cardBrand.setAttribute("class", mastercard);
        break;
      case "amex":
        cardBrand.setAttribute("class", amex);
        break;
      default:
        cardBrand.setAttribute("class", "");
        break;
    }
  },
});

const cleaveDate = new Cleave("#cardExpiry", {
  date: true,
  datePattern: ["m", "y"],
});

const cleaveCCV = new Cleave("#cardCcv", {
  blocks: [3],
});

btn_compra.addEventListener('click', prueba=()=>{
  let montoFinal = valor;
  let usuario = localStorage.getItem('user');
  let idUsuario = localStorage.getItem('id')


  fetch('http://localhost:5179/api/compras', {
    method:'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        idUsuario:idUsuario,
        cantidadBoletos:cantidad,
        idVuelo:3,
        monto: montoFinal
    })
  })
  alert('Compra realizada por '+(usuario)+' por un monto total de $'+(montoFinal))
  window.location.reload()
})
