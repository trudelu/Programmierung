const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const controlKnob = document.getElementById('control-knob');

let backgroundX = -100;
let backgroundY = -100;
const step = 1;

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            backgroundY += step;
            break;
        case 'ArrowDown':
            backgroundY -= step;
            break;
        case 'ArrowLeft':
            backgroundX += step;
            break;
        case 'ArrowRight':
            backgroundX -= step;
            break;
    }
    updateBackgroundPosition();
});

function updateBackgroundPosition() {
    background.style.left = `${backgroundX}%`;
    background.style.top = `${backgroundY}%`;
}