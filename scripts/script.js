const gridContainer = document.querySelector("#gridContainer");
const clearButton = document.querySelector("#clear");
const resetButton = document.querySelector("#reset");
const rainbowButton = document.querySelector("#rainbow");
const bwButton = document.querySelector("#bw");
let size = 16;
let mode = "black";
let active = false;
gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;


function drawGrid(size) {    
    for (let i = 0; i < size * size; i++){
        const gridSquare = document.createElement("div"); 
        gridSquare.classList = "gridSquare";  
        gridSquare.addEventListener("mouseover", fillSquare); 
        gridContainer.appendChild(gridSquare);
    }
}

function fillSquare(e) {
    if (!active) return;
    if (mode == "rainbow") {
        const red = Math.floor(Math.random() * 256);
        const grn = Math.floor(Math.random() * 256);
        const blu = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${grn}, ${blu})`;
    } else {
        e.target.style.backgroundColor = "#000";
    }
    
}

function clearGrid() {
    const oldGrid = Array.from(gridContainer.childNodes);
    oldGrid.forEach((element) => {
        gridContainer.removeChild(element);
    });
}

function clear() {
    clearGrid();
    drawGrid(size);
}


function reset() {
    
    let newSize = prompt("New Size");
    console.log(newSize % 1 == 0);
    if (newSize % 1 == 0) {
        newSize = parseInt(newSize);
    }
    else {
        return;
    }

    if (newSize < 1 || newSize > 64) {
        alert("Please enter a number between 1 and 64");
        reset();
    }
    clearGrid();
    gridContainer.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
    drawGrid(newSize);
    size = newSize;
}

function rainbow() {
    mode = "rainbow";
}

function bw() {
    mode = "bw";
}

drawGrid(size);
clearButton.addEventListener("click", clear);
resetButton.addEventListener("click", reset);
rainbowButton.addEventListener("click", rainbow);
bwButton.addEventListener("click", bw);
document.addEventListener('mousedown', () => active = true);
document.addEventListener('mouseup', () => active = false);
