const calculadora = document.querySelector('.Calculadora');
const teclas = document.querySelector('.teclas');
const display = document.querySelector('.display');

teclas.addEventListener('click', (evento) => {
    // caso em que se clica fora dos botoes
    if(!evento.target.closest('button')){
        return;
    }

    const tecla = evento.target;
    const valorTecla = tecla.textContent; // conteudo do botao 
    const {tipoTecla} = tecla.dataset; // no HTML so pode usar CamelCase poderia ser const tipoTecla = tecla.dataset.tipoTecla
    const {teclaAnterior, memoria} = calculadora.dataset;
    const valorDisplay = display.textContent;

    //display.textContent = valorTecla;
    // so aparece no visor numeros 
    if(tipoTecla === 'num'){
        // para concatenar os valores das teclas
        if(valorDisplay === '0' || teclaAnterior === 'operador'){
            if(valorTecla === '00'){
                display.textContent = '0';
            } else {
                display.textContent = valorTecla;
            }
        } else {
            // concatenar -> como as variaveis sao caracteres, entao vai concatenar com o +
            display.textContent = valorDisplay + valorTecla;
        }
    }

    // identificando o ultimo operador matematico 
    if(tipoTecla === 'operador'){
        const operadores = teclas.querySelectorAll('[data-tipo-tecla = "operador"]');
        operadores.forEach((operador) => {
            tecla.dataset.estado = '';
        })
        tecla.dataset.estado = 'selecionado';

        // salvar o valor
        calculadora.dataset.primeiroNumero = valorDisplay;
        calculadora.dataset.operador = tecla.dataset.tecla; // tecla atual que recebeu o evento de clique 
    }

    // para saber o segundo numero e realizar a operacao 
    if(tipoTecla === 'igual'){
        const primeiroNumero = parseFloat(calculadora.dataset.primeiroNumero);
        const operador = calculadora.dataset.operador;
        const segundoNumero = parseFloat(valorDisplay);

        let resultado = '';

        if(operador == 'somar'){
            resultado = primeiroNumero + segundoNumero;
        }
        if(operador == 'subtrair'){
            resultado = primeiroNumero - segundoNumero;
        }
        if(operador == 'multiplicar'){
            resultado = primeiroNumero * segundoNumero;
        }
        if(operador == 'dividir'){
            if(segundoNumero == 0){
                resultado = '0';
            } else 
                resultado = primeiroNumero / segundoNumero;
        }

        display.textContent = resultado;
    }

    // para limpar o visor 
    if(tipoTecla === 'limpar'){
        display.textContent = '0';
    }

    if(tipoTecla === 'salvar'){
        calculadora.dataset.memoria = valorDisplay;
    }

    if(tipoTecla === 'recuperar'){
        if(memoria === undefined){
            display.textContent = '0';
        } else 
            display.textContent = memoria;
    }
    calculadora.dataset.teclaAnterior = tipoTecla;
});