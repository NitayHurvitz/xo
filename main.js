let turn = "X"
let winner = undefined

const cells = Array.from(document.getElementsByClassName("cell"))
const board = document.getElementById("board")
const clearBtn = document.getElementById("clear")
const turnHeader = document.getElementById("turn-header")

function boardClicked(event) {
    const cell = event.target

    console.log(cell.id + " clicked")

    if (cell.className != "cell" || cell.innerText !== "" || !!winner) {
        return
    }

    cell.innerText = turn
    checkWinner()
    if (!winner) {
        turn = turn == "X" ? "O" : "X";
        turnHeader.innerText = `It's ${turn} turn`
    }
    else {
        turnHeader.innerText = `the winner is ${winner}!`
    }


}

function resetGame() {
    cells.forEach(cell => {
        cell.innerText = ""
        cell.style.background = ""
    })
    turnHeader.innerText = `${turn} starts!`
    winner = undefined
}

function checkWinner() {
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

    winners.forEach(cellTriplet => {
        if (cells[cellTriplet[0]].innerText === "") {
            return
        }
        if (cells[cellTriplet[0]].innerText ===
            cells[cellTriplet[1]].innerText &&
            cells[cellTriplet[1]].innerText ===
            cells[cellTriplet[2]].innerText) {

            cells[cellTriplet[0]].style.background = "green"
            cells[cellTriplet[1]].style.background = "green"
            cells[cellTriplet[2]].style.background = "green"
            winner = cells[cellTriplet[0]].innerText
        }
    })
}


resetGame()
board.addEventListener("click", boardClicked)
clearBtn.addEventListener("click", resetGame)