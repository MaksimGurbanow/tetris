// imports
import { tetrominoes } from "./tetrominoe.js"


//received all needed elements
const newGameButton = document.getElementById("newGameButton")
const playSpace = document.querySelector(".container")
const fixed = document.getElementsByClassName("taken")
const startPauseBtn = document.getElementById("button")
const head = document.getElementById("gameOver")
const scoreHead = document.getElementById("score")
let pixels 
let divs
let tetro
const chooseLevelButtons = document.querySelectorAll(".choose-level-button")
//some needed variables
let positionOfPixels = 1 + Math.floor(Math.random() * 4)
const pixelsNumbers = 200
const width = 10
const level = [1000, 500, 200]
let state = true
let score = 0
//array with tetrominoes and colors
const colors = ["red", "blue", "green", "yellow", "pink", "purple"]
let currentColor = colors[Math.floor(Math.random() * colors.length)]
let currentRotation = 0

let currentLevel
let timerId



chooseLevelButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentLevel = button.getAttribute("level")
        button.parentNode.style.visibility = "hidden"
        createPlaySpace()
        startPauseBtn.style.display = "block"
        scoreHead.innerHTML = `<h3>Score: <span>${score}</span></h3>`
        timerId = setInterval(moveDown, level[currentLevel])
        pixels = Array.from(document.querySelectorAll('.pixel'))
    })
})

//create a playspace
function createPlaySpace() {
    for(let i = 0; i<pixelsNumbers; i++){
    const pixel = document.createElement('div')
    pixel.classList.add("pixel")
    playSpace.append(pixel)
}
//create a mini grid 
for (let i = 0; i < 10; i++) {
    const fixedPixel = document.createElement("div")
    fixedPixel.style.visibility = "hidden"
    fixedPixel.classList.add("taken")
    fixedPixel.classList.add("pixel")
    playSpace.append(fixedPixel)
}
}


let choosenFigure = Math.floor(Math.random() * tetrominoes.length)

function clearAll() {
    const divs = document.querySelectorAll(".downing")
    divs.forEach((div)=> {
            div.classList.remove("downing")
            div.style.backgroundColor = ""
    })

}
function chooseRandomColor() {
    document.querySelectorAll(".downing").forEach(pixel => pixel.style.backgroundColor = currentColor)
}
function draw(array, figure, position) {
    array[figure][currentRotation].forEach((value) => {
        playSpace.children[position + value].classList.add("downing")
    })
    chooseRandomColor()
    divs = document.querySelectorAll(".downing")
}

function moveDown() {
    clearAll()
    positionOfPixels += width
    draw(tetrominoes, choosenFigure, positionOfPixels)
    freeze()
    
}



function pop() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

        if (row.every(index => pixels[index].classList.contains('taken'))) {
            score += 10
            scoreHead.innerHTML = `<h3>Score: <span>${score}</span></h3>`
            row.forEach(index => {
                pixels[index].classList.remove('taken')
                pixels[index].classList.remove('tetromino')
                pixels[index].style.backgroundColor = ''
            })
            const squaresRemoved = pixels.splice(i, width)
            pixels = squaresRemoved.concat(pixels)
            pixels.forEach(cell => playSpace.appendChild(cell))
        }
    }
}

function freeze() {
    pop(pixels)
    pixels.forEach((div, index) => {
        if(div.classList.contains("downing") && pixels[index+width].classList.contains("taken")) {
            divs.forEach((coloredDiv)=>{
                coloredDiv.classList.add("taken")
                coloredDiv.classList.remove("downing")
                coloredDiv.style.backgroundColor = currentColor
            })
            positionOfPixels = 1 + Math.floor(Math.random() * 3)
            choosenFigure = Math.floor(Math.random()*tetrominoes.length) 
            currentColor = colors[Math.floor(Math.random() * colors.length)]
            tetro = tetrominoes[choosenFigure][currentRotation]
            currentRotation = 0
            
            gameOver()
            draw(tetrominoes, choosenFigure, positionOfPixels)
        }
    })
}

// Combine all move functions
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        moveDown()
    }
   else if(event.key === "ArrowRight") {
    moveRight()
   }
   else if(event.key === "ArrowLeft") {
    moveLeft()
   }
   else if(event.key === "ArrowUp") {
    rotate()
    }
    else if (event.key === "Escape") {
        startPause()
    }
})
startPauseBtn.addEventListener("click", () => {
    if (state) {
        clearInterval(timerId)
        state = false
    }
    else {
        timerId = setInterval(moveDown, level[currentLevel])
        state = true
    }
})

function startPause() {
        if (state) {
        clearInterval(timerId)
        state = false
    }
    else {
        timerId = setInterval(moveDown, level[currentLevel])
        state = true
    }
}
function moveLeft() {
    tetro = tetrominoes[choosenFigure][currentRotation]
    if ((positionOfPixels + 1) % width  > 0 &&
    !playSpace.children[positionOfPixels-2].classList.contains("taken")) {
        positionOfPixels --
        clearAll()
        draw(tetrominoes, choosenFigure, positionOfPixels)
    }
}
function moveRight () {
    tetro = tetrominoes[choosenFigure][currentRotation]
    if ((positionOfPixels + tetro[tetro.length - 1]) % width < 9 &&
    !(playSpace.children[tetro[tetro.length - 1] + 1].classList.contains("taken"))) {
        positionOfPixels ++
        clearAll()
        draw(tetrominoes, choosenFigure, positionOfPixels)
    }
}


function isAtRight() {
    return tetro.some(index=> (positionOfPixels + index + 1) % width === 0)  
  }
  
  function isAtLeft() {
    return tetro.some(index=> (positionOfPixels + index) % width === 0)
  }
  
  function checkRotatedPosition(P){
    P = positionOfPixels       
    if ((P+1) % width < 9) {         
      if (isAtRight()){            
        positionOfPixels -= 1    
        checkRotatedPosition(P) 
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        positionOfPixels += 1
      checkRotatedPosition(P)
      }
    }
  }

function rotate() {

    if (currentRotation < 3) {
    currentRotation += 1
    }
    else {
    currentRotation = 0
    }
    checkRotatedPosition()
    tetro = tetrominoes[choosenFigure][currentRotation]
    clearAll()
    draw(tetrominoes, choosenFigure, positionOfPixels)

}


function gameOver() {
    for (let i = 10; i < 20; i++) {
        if (pixels[i].classList.contains("taken")) {
            clearInterval(timerId)

            pixels.forEach(pixel => pixel.style.display = "none")
            startPauseBtn.style.display = "none"
            head.style.display = "flex"
            setTimeout(() => {
                newGameButton.style.display = "inline"
            }, 1000)
            newGameButton.addEventListener("click", () => {
                startNewGame()
            })
        }
    }

}

function startNewGame() {
    score = 0
    newGameButton.style.display = "none"
    head.style.display = "none"
    startPauseBtn.style.display = "block"
    pixels.forEach((pixel) => {
        pixel.classList.remove("downing", "taken")
        pixel.style.display = ""
        pixel.style.backgroundColor = ""
        if (pixel.style.visibility ===  "hidden") {
            pixel.classList.add("taken")
        }
    })
    
    timerId = setInterval(moveDown, level[currentLevel])
}
