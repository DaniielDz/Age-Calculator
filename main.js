
let fecha2 = new Date();
let diaAct = fecha2.getDate();  // Dia Actual
let mesAct = fecha2.getMonth() + 1; // Mes Actual
let añoAct = fecha2.getFullYear();  // Año Actual

let añoNac = document.querySelector('#year');   // Año de nacimiento
let mesNac = document.querySelector('#month'); // Mes de nacimiento
let diaNac = document.querySelector('#day'); // Dia de nacimiento


let outputYear = document.querySelector('#output__year');
let outputMonth = document.querySelector('#output__month');
let outputDay = document.querySelector('#output__day');

let submitButton = document.querySelector('.button');
let formElements = document.querySelectorAll('.form__elements');
let formInputs = document.querySelectorAll('.form__input');
let formLabels = document.querySelectorAll('.form__label');

submitButton.addEventListener('click', () => {
    añoNacimiento = parseInt(añoNac.value);   // Año de nacimiento
    mesNacimiento = parseInt(mesNac.value);  // Mes de nacimiento
    diaNacimiento = parseInt(diaNac.value);  // Dia de nacimiento
  
    if( !(isNaN(diaNacimiento) && isNaN(mesNacimiento) && isNaN(añoNacimiento)) ) {
        eliminarErrores(0, 'day');
        eliminarErrores(1, 'month');
        eliminarErrores(2, 'year');

        const diasMeses = [31, esBisiesto(añoNacimiento) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if( diaNacimiento > 0 && diaNacimiento <= diasMeses[mesNacimiento - 1] && añoNacimiento <= añoAct) {
            process()
        }
        else {
            eliminarErrores(0, 'day');
            eliminarErrores(1, 'month');
            eliminarErrores(2, 'year');
        }
        if ( diaNacimiento <= 0 || diaNacimiento > 31) {    // verificacion del dia ingresado
            error(0, "Must be a valid day"); 
            console.log(diaNacimiento > diasMeses[mesNacimiento - 1] && ((mesNacimiento === 2 || mesNacimiento === 4 || mesNacimiento === 6 || mesNacimiento === 9 || mesNacimiento === 11))) 
            
        }
        else if(diaNacimiento > diasMeses[mesNacimiento - 1] && ((mesNacimiento === 2 || mesNacimiento === 4 || mesNacimiento === 6 || mesNacimiento === 9 || mesNacimiento === 11))) {
            error(0, "Must be a valid date"); 
            error(1); 
            error(2); 
        }
        if ( mesNacimiento <= 0 || mesNacimiento > 12) {
            error(1, "Must be a valid month"); 
        }
        if ( añoNacimiento <= 0 || añoNacimiento > añoAct) {
            error(2, "Must be a valid year"); 
        }
        
    }
    if(isNaN(diaNacimiento)) {
        error(0, "This field is required");  
    }
    if(isNaN(mesNacimiento)) {
        error(1, "This field is required");  
    }
    if(isNaN(añoNacimiento)) {
        error(2, "This field is required");  
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
        outputYear.textContent = añoAct - añoNacimiento;
        outputDay.textContent = hastaDiaActual - hastaCumpleaños;
    } else {
        outputYear.textContent = añoAct - añoNacimiento - 1;
        outputDay.textContent = (hastaDiaActual - hastaCumpleaños) + 365;
    }
    if( diaAct >= diaNacimiento   ) {
        outputMonth.textContent = Meses;
    } else {
        outputMonth.textContent = Meses - 1;
    }
}
function process() {
    hastaCumpleaños = sumarDias(mesNacimiento, diaNacimiento);
    hastaDiaActual = sumarDias(mesAct, diaAct);
    Meses = diferenciaMeses(mesNacimiento, mesAct)
    mostrarDatos();
}

function error(index, error) {
    const mensajeError = document.createElement("span");
    mensajeError.classList.add("form__error", "error");
    mensajeError.textContent = error;
    // Intenta eliminar cualquier error existente
    const existingError = formElements[index].querySelector(".form__error");
    if (existingError) {
        existingError.remove();
    }
    // Agrega el nuevo elemento de error al formulario
    formElements[index].appendChild(mensajeError);
    formInputs[index].classList.add("error");
    formLabels[index].classList.add('error');
}
function eliminarErrores(index, selector) {
    const existingError = [
        formElements[index].querySelector(".form__error"),
        formElements[index].querySelector(`.${selector}`),
        formElements[index].querySelector(`#${selector}`)
    ]
    if(existingError[1].classList.contains('error')){
        existingError[0].remove();
        existingError[1].classList.remove("error");
        existingError[2].classList.remove('error');
    }
}