const resetBoton = document.getElementById("reset");
const botonCorazon = document.getElementById("corazon");
const botonCross = document.getElementById("cross");

const botones = [resetBoton, botonCorazon, botonCross];
const tarjeta = document.getElementsByClassName("tarjeta")[0];

botones.forEach(boton => {
    boton.onclick = function() {
        const imagenes = tarjeta.getElementsByTagName("img")
        const image = imagenes[imagenes.length -1]
        tarjeta.removeChild(image);
    }
});

