
let fecha2 = new Date();
let diaAct = fecha2.getDate();  // Dia Actual
let mesAct = fecha2.getMonth() + 1; // Mes Actual
let añoAct = fecha2.getFullYear();  // Año Actual

let outputYear = document.querySelector('#output__year');
let outputMonth = document.querySelector('#output__month');
let outputDay = document.querySelector('#output__day');

let submitButton = document.querySelector('.button');
let formElements = document.querySelectorAll('.form__elements');

submitButton.addEventListener('click', () => {
    añoNac = parseInt(document.querySelector('#year').value);   // Año de nacimiento
    mesNac = parseInt(document.querySelector('#month').value); // Mes de nacimiento
    diaNac = parseInt(document.querySelector('#day').value); // Dia de nacimiento

    if(añoNac <= añoAct && (mesNac <= 12 && mesNac > 0) && (diaNac <= 31 && diaNac > 0)) {
        hastaCumpleaños = sumarDias(mesNac, diaNac); 
        hastaDiaActual = sumarDias(mesAct, diaAct); 
        Meses = diferenciaMeses(mesNac, mesAct)
        mostrarDatos();
    }
    else {
        const error = document.createElement("SPAN")
        error.textContent = "Error"
        formElements[0].appendChild(error)
    }
})
function sumarDias(mes, dia) {  // Calcular Dias
    const diasMeses = [31, esBisiesto(añoAct) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dias = 0;
    for(let i = 0; i < mes - 1; i++) {  
        dias += diasMeses[i]; 
    }
    dias += dia; 
    return dias;
}
function diferenciaMeses(inicio, final) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let count = 0;  // Contador de vueltas
    let currentIndex = arr.indexOf(inicio); // Índice inicial de mes en el array
    let found = false;  // Indicador de si se ha encontrado final

    while (true) {
        // Verifica si el valor actual es igual a final
        if (arr[currentIndex] === final) {
            found = true;  // Se ha encontrado final
            break;  // Rompe el bucle
        }

        currentIndex = (currentIndex + 1) % arr.length; // Avanza al siguiente índice circularmente
        count++;  // Incrementa el contador de vueltas

        // Comprueba si se ha completado una vuelta completa en el array sin encontrar final
        if (currentIndex === arr.indexOf(inicio)) {
            break;  // Evita un bucle infinito si final no está en el array
        }
    }

    if (found) {
        return count;
    }
}
function esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || año % 400 === 0;
}
function mostrarDatos() {
    if( hastaDiaActual >= hastaCumpleaños ) {
        outputYear.textContent = añoAct - añoNac;
        outputDay.textContent = hastaDiaActual - hastaCumpleaños;
    } else {
        outputYear.textContent = añoAct - añoNac - 1;
        outputDay.textContent = (hastaDiaActual - hastaCumpleaños) + 365;
    }
    if( diaAct >= diaNac   ) {
        outputMonth.textContent = Meses;
    } else {
        outputMonth.textContent = Meses - 1;
    }
}