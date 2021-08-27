import Game from "./Game";

const canvas = <HTMLCanvasElement> document.querySelector("#canvas");

const game = new Game(canvas);

canvas.addEventListener("click", () => game.start());

