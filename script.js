document.addEventListener('DOMContentLoaded', function() { 
    const grid = document.querySelector('.grid')
    const tamanhoEixo = 10
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando')
    let quantiaBombas = 20
    let quadrados = []

    function createBoard() {

        bandeirasFaltando.innerHTML = quantiaBombas

        const listaBombas = Array(quantiaBombas).fill('bomba')
        console.log(listaBombas)
        const listaValida = Array(tamanhoEixo * tamanhoEixo - quantiaBombas).fill('valido')
        console.log(listaValida)
        const listaJogo = listaValida.concat(listaBombas)
        console.log(listaJogo)
        const listaEmbaralhada = listaJogo.sort(() => Math.random() - 0.5);
        console.log(listaEmbaralhada)

        for (let i = 0; i < tamanhoEixo * tamanhoEixo; i++) {
            const square = document.createElement('div')
            square.id = i
            square.classList.add(listaEmbaralhada[i])
            grid.appendChild(square)
            quadrados.push(square)
        }
    }
    createBoard()

})

