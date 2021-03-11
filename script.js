document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const overlay = document.querySelector('.overlay');
    const infoContainer = document.querySelector('.info-container');
    const againBtn = document.getElementById('again');
    const keepGoingBtn = document.getElementById('keepGoing');
    const resetBtn = document.querySelector('.btn-newGame');
    const scoreElement = document.getElementById('score');

    const width = 4;
    let squares = [];
    let keepGoing = false;
    let score = 0;


    resetBtn.addEventListener('click', resetGame);

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate()
        generate()
        changeBgc()
    }

    createBoard();

    function generate() {
        let randomIndex = Math.floor(Math.random() * squares.length);
        let randomNumber = Math.floor(Math.random() * 10)
        console.log(randomNumber);
        if (squares[randomIndex].innerHTML == 0) {
            randomNumber <= 9 ? squares[randomIndex].innerHTML = 2 : squares[randomIndex].innerHTML = 4;
            checkForGameOver();
        } else {
            generate()
        }
    }

    //swipe right 
    function moveRight() {

        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let fileredRow = row.filter(num => num);
                let missing = width - fileredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(fileredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let fileredRow = row.filter(num => num)

                let missing = width - fileredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = fileredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let fileredColumn = column.filter(column => column)
            let missing = width - fileredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(fileredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width * 2].innerHTML;
            let totalFour = squares[i + width * 3].innerHTML;

            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let fileredColumn = column.filter(column => column)
            let missing = width - fileredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = fileredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width * 2].innerHTML = newColumn[2];
            squares[i + width * 3].innerHTML = newColumn[3];
        }
    }



    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML == squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i + 1].innerHTML = 0;
                squares[i].innerHTML = combinedTotal;
                score += combinedTotal;
                scoreElement.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML == squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i + width].innerHTML = 0;
                squares[i].innerHTML = combinedTotal;
            }
        }
        checkForWin();
    }

    function changeBgc() {
        const squares = [...document.querySelectorAll('.grid div')];

        squares.forEach((square) => {
            const value = parseInt(square.innerHTML);
            if (value > 0) {
                if (value === 2) {
                    square.classList = 'two'
                } else if (value == 4) {
                    square.classList = 'four'
                } else if (value == 8) {
                    square.classList = 'eight'
                } else if (value == 16) {
                    square.classList = 'sixteen'
                } else if (value == 32) {
                    square.classList = 'thirtytwo'
                } else if (value == 64) {
                    square.classList = 'sixtyfour'
                } else if (value == 128) {
                    square.classList = 'oneHundred'
                } else if (value == 256) {
                    square.classList = 'twoHundred'
                } else if (value == 512) {
                    square.classList = 'fiveHundred'
                } else if (value == 1024) {
                    square.classList = 'oneThousand'
                } else if (value == 2048) {
                    square.classList = 'twoThousand'
                } else if (value == 4096) {
                    square.classList = 'fourThousand'
                }

            } else {
                square.innerHTML = ''
                square.classList = ''
            }
        })

    }

    function resetGame() {
        document.querySelector('.grid').innerHTML = '';
        squares = [];
        createBoard();

    }
    //keycodes 

    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        } else if (e.keyCode === 66) {
            resetGame();
        }


    }

    document.addEventListener('keyup', control)

    function keyRight() {

        moveRight();
        combineRow();
        moveRight();
        generate();
        changeBgc();

    }

    function keyLeft() {

        moveLeft();
        combineRow();
        moveLeft();
        generate();
        changeBgc();
    }

    function keyDown() {

        moveDown();
        combineColumn();
        moveDown();
        generate();
        changeBgc();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
        changeBgc();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 1024 && keepGoing == false) {
                overlay.classList.remove('hide');
                infoContainer.classList.remove('hide');
                document.removeEventListener('keyup', control);
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0;
        let canMove = 0;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                zeros++;
            }
        }

        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                canMove++;
            }
        }
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                canMove++;
            }
        }

        if (zeros === 0 && canMove === 0) {
            overlay.classList.remove('hide');
            infoContainer.classList.remove('hide');
            document.querySelector('.info').textContent = "You Lose :(";
            keepGoingBtn.classList.add('hide');
            document.removeEventListener('keyup', control);
        }
    }

    againBtn.addEventListener('click', () => {
        resetGame();
        overlay.classList.add('hide');
        infoContainer.classList.add('hide');
        document.addEventListener('keyup', control)
    });

    keepGoingBtn.addEventListener('click', () => {
        overlay.classList.add('hide');
        infoContainer.classList.add('hide');
        document.addEventListener('keyup', control)
        keepGoing = true;
    })



    module.exports = checkForGameOver;
})