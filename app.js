//received all neede elements
const newGameButton = document.getElementById("newGameButton")
const playSpace = document.getElementsByClassName("container")
const fixed = document.getElementsByClassName("taken")
const startPauseBtn = document.getElementById("button")
const head = document.getElementById("gameOver")
const scoreHead = document.getElementById("score")
let pixels 
let divs
const chooseLevelButtons = document.querySelectorAll(".choose-level-button")
//some needed variables
let lineLengths = 2 + Math.floor(Math.random()*3+1)
let positionOfPixels = 1 + Math.floor(Math.random() * 3)
const pixelsNumbers = 200
const width = 10
const level = [1000, 500, 200]
let state = true
let score = 0
//array with tetominoes and colors
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
        pixels = document.querySelectorAll(".pixel")
    })
})

//create a playspace
function createPlaySpace() {
    for(let i = 0; i<pixelsNumbers; i++){
    const pixel = document.createElement('div')
    pixel.classList.add("pixel")
    playSpace[0].append(pixel)
}
//create a mini grid 
for (let i = 0; i < 10; i++) {
    const fixedPixel = document.createElement("div")
    fixedPixel.style.visibility = "hidden"
    fixedPixel.classList.add("taken")
    fixedPixel.classList.add("pixel")
    playSpace[0].append(fixedPixel)
}
}



const L_tetrominoe = [
    [1, 1 + width, 1 + width * 2, 2 + width * 2],
    [1, 1 + width, 2, 3],
    [1, 2, 2 + width, 2 + width * 2],
    [3, 1 + width, 2 + width, 3 + width]
]
const L_right_tetrominoe = [
    [1 + width * 2, 2 + width, 2 + width * 2, 2],
    [1, 1 + width, 2 + width, 3 + width],
    [1, 1 + width, 1 + width * 2, 2],
    [1, 2, 3, 3 + width]
]
const T_tetrominoe = [
    [1, 2, 2 + width, 2 + width * 2, 3],
    [3, 1 + width, 2 + width, 3 + width, 3 + width * 2],
    [2, 2 + width, 1 + width * 2, 2 + width * 2, 3 + width * 2],
    [1, 1 + width, 2 + width, 1 + width * 2, 3 + width]
]
const Line_tetrominoe = [
    [1, 2, 3, 4],
    [1, 1 + width, 1 + width * 2, 1 + width * 3],
    [1, 2, 3, 4],
    [1, 1 + width, 1 + width * 2, 1 + width * 3]
]
const Z_tetrominoe = [
    [1, 2, 2 + width, 3 + width],
    [1 + width * 2, 1 + width, 2 + width, 2],
    [1, 2, 2 + width, 3 + width],
    [1 + width * 2, 1 + width * 1,  2 + width, 2]
]
const angle_tetrominoe = [
    [1, 1 + width, 2 + width],
    [1, 1 + width, 2],
    [1, 2, 2 + width],
    [1 + width, 2 + width, 2]
]
const cube_tetrominoe = [
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width],
    [1, 2, 1 + width, 2 + width]
]
const tetrominoes = [L_tetrominoe, L_right_tetrominoe, T_tetrominoe, Line_tetrominoe, Z_tetrominoe, angle_tetrominoe, cube_tetrominoe]

let choosenFigure = Math.floor(Math.random() * tetrominoes.length)

function clearAll() {
    const divs = document.querySelectorAll(".downing")
    divs.forEach((div)=> {
        if(!div.classList.contains("taken")) {
            div.classList.remove("downing")
            div.style.backgroundColor = ""
        }
    })

}
function chooseRandomColor() {
    document.querySelectorAll(".downing").forEach(pixel => pixel.style.backgroundColor = currentColor)
}
function draw(array, figure, position) {
    array[figure][currentRotation].forEach((value) => {
        playSpace[0].children[position + value].classList.add("downing")
    })
    chooseRandomColor()
    divs = document.querySelectorAll(".downing")
}

function moveDown() {
    clearAll()
    positionOfPixels += width
    draw(tetrominoes, choosenFigure, positionOfPixels)
    freeze()
    gameOver()
}
function freeze() {
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
            score += 5
            scoreHead.innerHTML = `<h3>Score: <span>${score}</span></h3>`
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
    if ((positionOfPixels + 1) % width + 1 > 1 &&
        !pixels[positionOfPixels].classList.contains("taken")) {
        positionOfPixels --
        clearAll()
        draw(tetrominoes, choosenFigure, positionOfPixels)
    }
}
let tetro = tetrominoes[choosenFigure][currentRotation]
function moveRight () {
    if ((positionOfPixels + tetro[tetro.length - 1]) % width < 9 &&
    !pixels[positionOfPixels + tetro[tetro.length - 1] + 1].classList.contains("taken")) {
        positionOfPixels ++
        clearAll()
        draw(tetrominoes, choosenFigure, positionOfPixels)
    }
}
// function of rotation
function rotate() {

    if (currentRotation < 3) {
        currentRotation += 1
        tetro = tetrominoes[choosenFigure][currentRotation]
    }
    else {
        currentRotation = 0
    }
    clearAll()
    draw(tetrominoes, choosenFigure, positionOfPixels)
}

// The end of the ggame
gameOver = function () {
    for (let i = 10; i < 20; i++) {
        if (pixels[i].classList.contains("taken")) {
            clearInterval(timerId)
            pixels.forEach(pixel => pixel.style.display = "none")
            startPauseBtn.style.display = "none"
            head.style.display = "flex"
            setTimeout(() => {
                newGameButton.style.display = "inline"
            }, 1000)
        }
    }
}

function startNewGame() {
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
