const resetBoton = document.getElementById("reset");
const botonCorazon = document.getElementById("corazon");
const botonCross = document.getElementById("cross");

const botones = [resetBoton, botonCorazon, botonCross];
const tarjetas = document.getElementsByClassName("tarjeta");
const tarjetasWrapper = document.getElementsByClassName("tarjetas")[0];

const contadorWrapper = document.getElementsByClassName("contador")[0];
const textoContador = document.getElementById("contador");
let contador = 0;

const perros = [
    ["euri.webp", "Euri", "2 años"], 
    ["ion.webp", "Ion", "2 años"], 
    ["lili.webp", "Lili", "2 años"], 
    ["luna.webp", "Luna", "2 años"], 
    ["rita.webp", "Rita", "2 años"], 
    ["shiva.webp", "Shiva", "2 años"], 
    ["thai.webp", "Thai", "2 años"], 
    ["thor.webp", "Thor", "2 años"], 
    ["txisto.webp", "Txisto", "2 años"], 
]

perros.forEach(element => {
    const tarjeta = `<div class="tarjeta">
                        <div class=degradado></div>
                        <img src="assets/pets/${element[0]}" alt="">
                        <p><span class="big">${element[1]}</span>, ${element[2]}</p>
                    </div>`;
    tarjetasWrapper.innerHTML += tarjeta;
});

botones.forEach(boton => {
    boton.onclick = function() {
        const tarjeta = tarjetas[tarjetas.length -1]
        tarjetasWrapper.removeChild(tarjeta);
        if (boton == botonCorazon){
            contador += 1;
            textoContador.innerText = contador;
            contadorWrapper.style.display = "flex";
        }
    }
});

