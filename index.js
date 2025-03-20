import Grid from "./Grid.js";
import Player from "./Player.js";
import GridPosition from "./GridPosition.js";
import Game from "./Game.js"; 

document.getElementById("startGame").addEventListener("click", () => {
    const grid = new Grid(6, 7);
    const game = new Game(grid, 4, 10);
    game.play();
});