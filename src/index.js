import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const canvas2 = document.getElementById("game-canvas2");
    const game = new Game(canvas, canvas2);
    // game.restart();
    // game.draw();
})




