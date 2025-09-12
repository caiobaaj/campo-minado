document.addEventListener('DOMContentLoaded', function() { 
    const grid = document.querySelector('.grid')

    console.log(grid);

    const width = 10

    function createBoard() {

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
        }
    }
    createBoard()

})

