import Game from "./Game";

const canvas = <HTMLCanvasElement> document.querySelector("#canvas");

const game = new Game(canvas);

game.start();

canvas.addEventListener("keydown", e => game.onKeyDown(e));
canvas.addEventListener("click", () => game.start());
