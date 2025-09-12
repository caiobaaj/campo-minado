document.addEventListener('DOMContentLoaded', function() { 
    const grid = document.querySelector('.grid')
    const width = 10
    const bandeirasFaltando = document.querySelector('#bandeiras-faltando')
    let quantiaBombas = 20
    

    function createBoard() {

        bandeirasFaltando.innerHTML = quantiaBombas

        const listaBombas = Array(quantiaBombas).fill('bomba')
        console.log(listaBombas)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.id = i
            grid.appendChild(square)
        }
    }
    createBoard()

})

