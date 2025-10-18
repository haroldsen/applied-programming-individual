
const canvas = document.getElementById('canvas');
const svgCanvas = document.getElementById('svg-canvas');
let draggedElement = '';
let offsetX = 0;
let offsetY = 0;
let lineEnds = [];

document.addEventListener('dragstart', (e)=> {
    draggedElement = e.target;
    offsetX = draggedElement.getBoundingClientRect().left - e.x;
    offsetY = draggedElement.getBoundingClientRect().top - e.y;
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault(); 
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();

    let htmlToAdd = '';
    if (draggedElement.id === 'function') {
        htmlToAdd = `<p style="position: absolute; top: ${e.clientY + offsetY}px; left: ${e.clientX + offsetX}px;" class="function" draggable="true">function</p>`;
    } else if (draggedElement.id === 'control') {
        htmlToAdd = `<p style="position: absolute; top: ${e.clientY + offsetY}px; left: ${e.clientX + offsetX}px;" class="control" draggable="true">control</p>`;
    } else if (draggedElement.className === 'function') {
        draggedElement.outerHTML = `<p style="position: absolute; top: ${e.clientY + offsetY}px; left: ${e.clientX + offsetX}px;" class="function" draggable="true">function</p>`;
    } else if (draggedElement.className === 'control') {
        draggedElement.outerHTML = `<p style="position: absolute; top: ${e.clientY + offsetY}px; left: ${e.clientX + offsetX}px;" class="control" draggable="true">control</p>`;
    }
    canvas.insertAdjacentHTML('beforeend', htmlToAdd);
});

function drawLines(e) {
    if (e.ctrlKey === true) {
        lineEnds.push([e.x, e.y]);
    } else {
        lineEnds = [];
    }
    console.log(e);
    if (lineEnds.length > 1) {
        svgCanvas.insertAdjacentHTML('beforeend', `
            <line 
                x1="${lineEnds[0][0]}" y1="${lineEnds[0][1]}" 
                x2="${lineEnds[1][0]}" y2="${lineEnds[1][1]}" 
                stroke="black" 
                stroke-width="5"
            />
        `);
        lineEnds = [];
    }
}

canvas.addEventListener('click', drawLines);
