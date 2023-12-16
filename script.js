let palabra;
let palabraAleatoria;
let intentos = 0;

document.addEventListener("DOMContentLoaded", async function () {
    palabraAleatoria = await obtenerPalabraAleatoria();
    palabraAleatoria = palabraAleatoria.toUpperCase();
    console.log('Palabra aleatoria:', palabraAleatoria);
});

document.getElementById("btn").addEventListener("click", function () {
    palabra = document.getElementById("adivinar").value.toUpperCase();
    if (palabra.length === 5) {
        intentos++;
        jugarWordle();
        document.getElementById("adivinar").value = "";
    } else {
        alert("Ingresa una palabra de 5 letras.");
    }
});

async function obtenerPalabraAleatoria() {
    try {
        const palabras = await (await fetch("https://random-word-api.herokuapp.com/word?lang=es&length=5")).json();
        return palabras[0];
    } catch (error) {
        console.error('Error al obtener la palabra aleatoria:', error);
    }
}

function compararLetras(palabra, palabraAleatoria) {
    let aciertos = 0;
    let fallos = 0;
    let letraEnPosicionEq = 0;
    let letras = new Array(palabra.length).fill('');

    for (let i = 0; i < palabraAleatoria.length; i++) {
        if (palabraAleatoria[i] === palabra[i]) {
            letras[i] = 'green';
            aciertos++;
        } else if (palabraAleatoria.slice(i).includes(palabra[i])) {
            letras[i] = 'yellow';
            letraEnPosicionEq++;
        } else {
            letras[i] = 'gray';
            fallos++;
        }
    }

    return [aciertos, fallos, letraEnPosicionEq, letras];
}

function jugarWordle() {
    let [aciertos, fallos, letraEnPosicionEq, letras] = compararLetras(palabra, palabraAleatoria);
    const caritaTriste = '\u{1F622}';
    const caritaFesteja = '\u{1F389}';
    console.log('comparar Letras', aciertos, fallos, letras);
    document.getElementById("msg").innerHTML = `Letras acertadas: ${aciertos} Letras falladas: ${fallos}`;
  
    if (aciertos === palabra.length) {
      document.getElementById("msg").innerHTML = `¡GANASTE! La palabra era ${palabraAleatoria} ${caritaFesteja}`;
    }
  
    if (intentos === 6) {
      document.getElementById("msg").innerHTML = `PERDISTE! La palabra era ${palabraAleatoria} ${caritaTriste}`;
    } else {
      const contenedor = document.getElementById("intentos");
      contenedor.innerHTML = letras.map((color, index) => `<div class="grid-item ${color}">${palabra[index]}</div>`).join('');
      contenedor.classList.remove('hide');
      contenedor.classList.add('show');
    }
  }
  
