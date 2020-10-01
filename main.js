let turn = "X"
let turnCounter = 0;

const cells = Array.from(document.getElementsByClassName("cell"))
const board = document.getElementById("board")
const clearBtn = document.getElementById("clear-btn")
const turnHeader = document.getElementById("turn-header")

function boardClicked(event) {
    const cell = event.target

    console.log(cell.id + " clicked")

    if (cell.className != "cell" || cell.innerText !== "") {
        return
    }

    cell.innerText = turn
    turnCounter++;

    const winner = checkWinner()

    if (!winner && turnCounter < 9) {
        turn = turn == "X" ? "O" : "X";
        turnHeader.innerText = `It's ${turn} turn`
    }
    else if (!!winner) {
        turnHeader.innerText = `The winner is ${winner}!`
        board.removeEventListener("click", boardClicked)
    }
    else {
        turnHeader.innerText = `It's a tie!`
        cells.forEach(cell => cell.style.background = "green")
    }
}

function resetGame() {
    board.addEventListener("click", boardClicked)
    cells.forEach(cell => {
        cell.innerText = ""
        cell.style.background = ""
    })
    turnHeader.innerText = `${turn} starts!`
    winner = undefined
    turnCounter = 0;
}

function checkWinner() {
    let winner = undefined
    const winners = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [6, 4, 2]
    ]
    cellsText = cells.map(cell => cell.innerText)

    winners.forEach(cellTriplet => {
        if (cellsText[cellTriplet[0]] === "") {
            return
        }
        if (cellsText[cellTriplet[0]] ===
            cellsText[cellTriplet[1]] &&
            cellsText[cellTriplet[1]] ===
            cellsText[cellTriplet[2]]) {

            cells[cellTriplet[0]].style.background = "green"
            cells[cellTriplet[1]].style.background = "green"
            cells[cellTriplet[2]].style.background = "green"
            winner = cellsText[cellTriplet[0]]
        }
    })

    return winner
}


clearBtn.addEventListener("click", resetGame)

resetGame()