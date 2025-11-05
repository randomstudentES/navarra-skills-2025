const resetBoton = document.getElementById("reset");
const botonCorazon = document.getElementById("corazon");
const botonCross = document.getElementById("cross");

const botones = [resetBoton, botonCorazon, botonCross];
const tarjetas = document.getElementsByClassName("tarjeta");
const tarjetasWrapper = document.getElementsByClassName("tarjetas")[0];

const contadorWrapper = document.getElementsByClassName("contador")[0];
const textoContador = document.getElementById("contador");
let contador = 0;

// Información de todos los perros -> [Nombre Archivo, Nombre perro, Edad]
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

// Añadimos todas las tarjetas poniendo los datos debidos
perros.forEach(element => {
    const tarjeta = `<div class="tarjeta">
                        <div class=degradado></div>
                        <img src="assets/pets/${element[0]}" alt="">
                        <p><span class="big">${element[1]}</span>, ${element[2]}</p>
                    </div>`;
    tarjetasWrapper.innerHTML += tarjeta;
});

// Hacemos los objetos draggables
for (let index = 0; index < tarjetas.length; index++) {
    dragElement(tarjetas[index]);
}


botonCorazon.onclick = function() {
    // Cogemos la tarjeta que está arriba del todo
    const primeraTarjeta = tarjetas[tarjetas.length -1];

    // Movemos hacia la derecha y la rotamos 20 grados y le bajamos la opacidad a 0
    // La transición se hace con "transition" en la clase .tarjeta
    primeraTarjeta.style.transform = "translateX(50%) rotate(20deg)";
    primeraTarjeta.style.opacity = 0;

    // Sumamos 1 al contador, actualizamos el texto 
    contador += 1;
    textoContador.innerText = contador;
    // Si es la primera vez le ponemos flex para que se muestre
    if (contador == 1)
    {
        contadorWrapper.style.display = "flex";
    }

    // Esperamos a que termine la transición y eliminamos la tarjeta
    setTimeout(() => {
        tarjetasWrapper.removeChild(primeraTarjeta);
    }, 100);

}

botonCross.onclick = function() {
    // Cogemos la tarjeta que está arriba del todo
    const primeraTarjeta = tarjetas[tarjetas.length -1];

    // Movemos hacia la izquierda y la rotamos -20 grados y le bajamos la opacidad a 0
    // La transición se hace con "transition" en la clase .tarjeta
    primeraTarjeta.style.transform = "translateX(-400px) rotate(-20deg)";
    primeraTarjeta.style.opacity = 0;

    // Esperamos a que termine la transición y eliminamos la tarjeta
    setTimeout(() => {
        tarjetasWrapper.removeChild(primeraTarjeta);
    }, 100);
}

// Funcion para hacer el objeto arrastrable
function dragElement(element) {
    // Guardamos la posicón original de la tarjeta para que en caso de no llegar la distancia requerida se resetee la posición
    const posicionOriginal = element.offsetLeft;
    
    // Multiplo para hacer que se mueva más al arrastrar la tarjeta
    const sensibilidadMovmimiento = 20;
    const sensibilidadRotacion = 10;
    let pos1 = 0, pos3 = 0;
    
    // Añadir listener
    element.addEventListener("mousedown", dragMouseDown);

    function dragMouseDown(evento) {

        evento.preventDefault();
        
        // Asignamos la posicion 3 a la posición del ratón
        // Al ser solo la X no recogemos la posición Y
        pos3 = evento.clientX;
        document.onmouseup = function(){
            evento = evento || window.event;
            evento.preventDefault();
            pos1 = (pos3 - evento.clientX) * sensibilidadMovmimiento;
            pos3 = evento.clientX;
            closeDragElement(pos1, pos3);
        };
        
        // Se añade el listener aqui para que haga efecto solo cuando se mueva el ratón
        document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(evento) {
        
        evento.preventDefault();
        pos1 = (pos3 - evento.clientX) * sensibilidadMovmimiento;
        pos3 = evento.clientX;
        element.style.left = (element.offsetLeft - pos1) + "px";
        
    }

    function closeDragElement(pos1, pos3) {
        
        // Eliminamos el mouse up y move para prevenir que se mueva o el usuario haga click durante el proceso de desvanecer la tarjeta
        document.onmouseup = null;
        document.onmousemove = null;
        
        if (Math.abs((element.offsetLeft - pos1) - pos3) < 1000 || Math.abs((pos3 - element.offsetLeft - pos1)) < 1000) {
            element.style.left = `${posicionOriginal}px`
            console.log("test");
            
        } else if (pos3 < pos1){
            element.style.transform = "translateX(50%) rotate(20deg)";
            element.style.opacity = 0;
        } else {
            element.style.transform = "translateX(-400px) rotate(-20deg)";
            element.style.opacity = 0;
        }

    }
}